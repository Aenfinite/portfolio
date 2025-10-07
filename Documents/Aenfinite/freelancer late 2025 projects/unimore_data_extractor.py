#!/usr/bin/env python3
"""
University of Modena Course Data Extractor
Extracts course information from multiple sources and creates structured data
"""

import requests
from bs4 import BeautifulSoup
import pandas as pd
import re
import time
import urllib.parse
from typing import Dict, List, Optional, Tuple
import json

class UnimoreDataExtractor:
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        })
        
        # Base URLs
        self.rubrica_url = "https://www.unimore.it/it/rubrica"
        self.libreria_url = "https://www.libreriauniversitaria.it"
        self.course_catalogue_base = "https://unimore.coursecatalogue.cineca.it"
        
        # Department URLs
        self.dept_urls = {
            'economia': 'https://www.orariolezioni.unimore.it/Orario/Dipartimento_di_Economia_Marco_Biagi/2025-2026/2270/ttHtml.html',
            'giurisprudenza': 'https://www.orariolezioni.unimore.it/Orario/Dipartimento_di_Giurisprudenza/2025-2026/2273/ttHtml.html',
            'ingegneria': 'https://www.orariolezioni.unimore.it/Orario/Dipartimento_di_Ingegneria_Enzo_Ferrari/2025-2026/2249/ttHtml.html'
        }
        
        self.results = []
        
    def fetch_page(self, url: str) -> Optional[BeautifulSoup]:
        """Fetch a webpage and return BeautifulSoup object"""
        try:
            print(f"Fetching: {url}")
            response = self.session.get(url, timeout=30)
            response.raise_for_status()
            return BeautifulSoup(response.content, 'html.parser')
        except Exception as e:
            print(f"Error fetching {url}: {e}")
            return None
    
    def extract_schedule_data(self, dept_name: str, start_record: int = 11) -> List[Dict]:
        """Extract course schedule data from department timetable"""
        url = self.dept_urls.get(dept_name.lower())
        if not url:
            print(f"Unknown department: {dept_name}")
            return []
            
        soup = self.fetch_page(url)
        if not soup:
            return []
            
        courses = []
        
        # Find the main table with course data
        tables = soup.find_all('table')
        main_table = None
        
        for table in tables:
            # Look for table with course schedule data
            if table.find('td'):  # Has data cells
                main_table = table
                break
        
        if not main_table:
            print("Could not find course schedule table")
            return []
            
        rows = main_table.find_all('tr')
        
        for row in rows:
            cells = row.find_all(['td', 'th'])
            if len(cells) < 6:  # Need at least 6 columns based on the structure
                continue
                
            # Extract row number from first cell
            try:
                row_num = int(cells[0].get_text(strip=True))
                if row_num < start_record:
                    continue
            except (ValueError, IndexError):
                continue
                
            # Extract course information
            course_name = cells[1].get_text(strip=True) if len(cells) > 1 else ""
            course_details = cells[2].get_text(strip=True) if len(cells) > 2 else ""  # "vedi" link
            credits = cells[3].get_text(strip=True) if len(cells) > 3 else ""
            professor = cells[4].get_text(strip=True) if len(cells) > 4 else ""
            schedule = cells[5].get_text(strip=True) if len(cells) > 5 else ""
            
            # Look for "vedi" link to get course catalogue URL
            course_link = ""
            if len(cells) > 2:
                vedi_links = cells[2].find_all('a', href=True)
                for link in vedi_links:
                    if 'coursecatalogue.cineca.it' in link.get('href', ''):
                        course_link = link['href']
                        break
            
            course_info = {
                'row_number': row_num,
                'facolta': dept_name.capitalize(),
                'course_name': course_name,
                'course_details': course_details,
                'credits': credits,
                'professor': professor,
                'schedule': schedule,
                'course_link': course_link
            }
            
            if course_name:  # Only add if we have a course name
                courses.append(course_info)
                print(f"Extracted: Row {row_num} - {course_name} - {professor}")
                
                # Limit for initial testing
                if len(courses) >= 10:
                    break
                    
        return courses
    
    def find_professor_email(self, professor_name: str) -> Optional[str]:
        """Search for professor email in the rubrica"""
        if not professor_name:
            return None
            
        try:
            # Handle multiple professors (separated by /)
            professors = professor_name.split('/')
            main_professor = professors[0].strip()
            
            # Clean professor name
            main_professor = main_professor.replace('Prof.', '').replace('Dott.', '').strip()
            name_parts = main_professor.split()
            
            if len(name_parts) < 2:
                return None
                
            # Try different search combinations
            search_queries = [
                ' '.join(name_parts[:2]),  # First name + Last name
                name_parts[-1],  # Just last name
                main_professor  # Full name
            ]
            
            for search_query in search_queries:
                search_url = f"{self.rubrica_url}?q={urllib.parse.quote(search_query)}"
                
                soup = self.fetch_page(search_url)
                if not soup:
                    continue
                    
                # Look for email patterns
                email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
                emails = re.findall(email_pattern, soup.get_text())
                
                for email in emails:
                    if 'unimore.it' in email:
                        return email
                        
                # Small delay between searches
                time.sleep(1)
                        
        except Exception as e:
            print(f"Error finding email for {professor_name}: {e}")
            
        return None
    
    def get_course_details(self, course_link: str) -> Dict:
        """Extract detailed course information from course catalogue"""
        details = {
            'tipo_laurea': '',
            'anno_corso': '',
            'percorso_corso': '',
            'nome_esame': '',
            'programmi_testi': ''
        }
        
        if not course_link:
            return details
            
        try:
            soup = self.fetch_page(course_link)
            if not soup:
                return details
                
            # Extract course details from the page
            text_content = soup.get_text()
            
            # Look for degree type patterns
            if 'magistrale' in text_content.lower():
                details['tipo_laurea'] = 'Laurea magistrale'
            elif 'triennale' in text_content.lower():
                details['tipo_laurea'] = 'Laurea triennale'
            
            # Look for year information
            year_match = re.search(r'(\d+)°?\s*anno', text_content, re.IGNORECASE)
            if year_match:
                details['anno_corso'] = year_match.group(1)
            
            # Look for curriculum/path
            if 'comune' in text_content.lower():
                details['percorso_corso'] = 'Comune'
            
            # Extract textbook information
            textbook_sections = soup.find_all(['div', 'section', 'p'], string=re.compile(r'testo|libro|bibliografia', re.IGNORECASE))
            for section in textbook_sections:
                parent = section.parent or section
                text = parent.get_text(strip=True)
                if len(text) > 50:  # Substantial text content
                    details['programmi_testi'] = text[:500]  # Limit length
                    break
                    
        except Exception as e:
            print(f"Error getting course details from {course_link}: {e}")
            
        return details
    
    def find_isbn(self, book_title: str, author: str = '') -> Optional[str]:
        """Search for ISBN on libreriauniversitaria.it"""
        if not book_title:
            return None
            
        try:
            search_term = f"{book_title} {author}".strip()
            search_url = f"{self.libreria_url}/ricerca?q={urllib.parse.quote(search_term)}"
            
            soup = self.fetch_page(search_url)
            if not soup:
                return None
                
            # Look for ISBN patterns
            isbn_pattern = r'ISBN[:\s]*(\d{13}|\d{10}|\d{3}-\d{10}|\d{3}-\d{1}-\d{3}-\d{5}-\d{1})'
            text_content = soup.get_text()
            isbn_matches = re.findall(isbn_pattern, text_content, re.IGNORECASE)
            
            if isbn_matches:
                return isbn_matches[0]
                
        except Exception as e:
            print(f"Error finding ISBN for {book_title}: {e}")
            
        return None
    
    def process_department(self, dept_name: str, start_record: int = 11) -> List[Dict]:
        """Process all courses for a department"""
        print(f"\n=== Processing {dept_name.upper()} Department ===")
        
        # Extract basic schedule data
        courses = self.extract_schedule_data(dept_name, start_record)
        
        processed_courses = []
        
        for i, course in enumerate(courses):
            print(f"\nProcessing course {i+1}/{len(courses)}: {course.get('course_name', 'Unknown')}")
            
            # Get course details
            course_details = {}
            if 'course_link' in course:
                course_details = self.get_course_details(course['course_link'])
            
            # Find professor email
            professor_email = ''
            if 'professor' in course:
                professor_email = self.find_professor_email(course['professor'])
            
            # Create final record
            record = {
                'Facoltà': course['facolta'],
                'Tipo di laurea': course_details.get('tipo_laurea', ''),
                'Nome corso': course.get('course_name', ''),
                'Anno di corso': course_details.get('anno_corso', ''),
                'Percorso del corso': course_details.get('percorso_corso', ''),
                'Nome Esame': course.get('course_name', ''),  # Often same as course name
                'Professore': course.get('professor', ''),
                'Mail professore': professor_email,
                'Programmi e testi': course_details.get('programmi_testi', ''),
                'Link corso': course.get('course_link', '')
            }
            
            processed_courses.append(record)
            
            # Add delay between requests
            time.sleep(2)
            
        return processed_courses
    
    def save_to_excel(self, data: List[Dict], filename: str):
        """Save data to Excel file"""
        df = pd.DataFrame(data)
        df.to_excel(filename, index=False, engine='openpyxl')
        print(f"Data saved to {filename}")
    
    def run_extraction(self):
        """Run the complete extraction process"""
        print("Starting University of Modena Data Extraction...")
        
        all_results = []
        
        # Process departments in order
        departments = ['economia', 'giurisprudenza', 'ingegneria']
        
        for dept in departments:
            start_record = 11 if dept == 'economia' else 1
            results = self.process_department(dept, start_record)
            all_results.extend(results)
            
            # Save intermediate results
            filename = f"unimore_{dept}_data.xlsx"
            self.save_to_excel(results, filename)
            
            print(f"Completed {dept}: {len(results)} courses processed")
        
        # Save combined results
        self.save_to_excel(all_results, "unimore_all_data.xlsx")
        
        return all_results

if __name__ == "__main__":
    extractor = UnimoreDataExtractor()
    
    # Start with Economia department for testing
    print("Starting with Economia department (first 5 courses for testing)...")
    results = extractor.process_department('economia', start_record=11)
    
    # Display first few results
    print("\n=== FIRST RESULTS ===")
    for i, record in enumerate(results[:3]):
        print(f"\nRecord {i+1}:")
        for key, value in record.items():
            print(f"  {key}: {value}")
    
    # Save results
    extractor.save_to_excel(results, "unimore_economia_sample.xlsx")