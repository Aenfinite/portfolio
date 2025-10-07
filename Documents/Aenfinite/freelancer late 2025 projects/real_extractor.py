#!/usr/bin/env python3
"""
Real University of Modena Course Data Extractor
Fetches actual course links and real data from course catalogue
"""

import requests
from bs4 import BeautifulSoup
import pandas as pd
import re
import time
import urllib.parse
from typing import Dict, List, Optional

class RealUnimoreExtractor:
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        })
        
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
    
    def extract_real_course_links(self) -> List[Dict]:
        """Extract real course data with actual links from the schedule page"""
        
        url = "https://www.orariolezioni.unimore.it/Orario/Dipartimento_di_Economia_Marco_Biagi/2025-2026/2270/ttHtml.html"
        
        soup = self.fetch_page(url)
        if not soup:
            return []
        
        courses = []
        
        # Find all table rows
        rows = soup.find_all('tr')
        
        for row in rows:
            cells = row.find_all(['td', 'th'])
            if len(cells) < 6:
                continue
                
            try:
                # Get row number
                row_num_text = cells[0].get_text(strip=True)
                if not row_num_text.isdigit():
                    continue
                    
                row_num = int(row_num_text)
                if row_num < 11:  # Start from record 11
                    continue
                
                # Extract course data
                course_name = cells[1].get_text(strip=True)
                course_study_cell = cells[2]  # This contains the "vedi" link
                credits = cells[3].get_text(strip=True)
                professor = cells[4].get_text(strip=True)
                
                # Extract the real course link from "vedi" cell
                course_link = ""
                vedi_links = course_study_cell.find_all('a', href=True)
                for link in vedi_links:
                    href = link.get('href', '')
                    if 'coursecatalogue.cineca.it' in href:
                        course_link = href
                        break
                
                # If no direct link found, look for any link that might be the course link
                if not course_link:
                    all_links = row.find_all('a', href=True)
                    for link in all_links:
                        href = link.get('href', '')
                        if 'coursecatalogue.cineca.it' in href or 'insegnamenti' in href:
                            course_link = href
                            break
                
                course_data = {
                    'row': row_num,
                    'course_name': course_name,
                    'credits': credits,
                    'professor': professor,
                    'course_link': course_link
                }
                
                courses.append(course_data)
                print(f"Row {row_num}: {course_name} - Link: {course_link[:80]}...")
                
                # Process first 10 courses for testing
                if len(courses) >= 10:
                    break
                    
            except Exception as e:
                print(f"Error processing row: {e}")
                continue
        
        return courses
    
    def get_course_details(self, course_link: str) -> Dict:
        """Get detailed course information from the actual course page"""
        
        details = {
            'tipo_laurea': '',
            'corso_di_studi': '',
            'anno_corso': '',
            'percorso_corso': '',
            'textbooks': ''
        }
        
        if not course_link:
            return details
        
        try:
            soup = self.fetch_page(course_link)
            if not soup:
                return details
            
            # Extract course details from the page structure
            
            # Look for "Corso di Laurea" or "Tipo di corso"
            text_content = soup.get_text()
            
            # Extract degree type
            if 'Corso di Laurea Magistrale' in text_content:
                details['tipo_laurea'] = 'Laurea magistrale'
            elif 'Corso di Laurea' in text_content:
                details['tipo_laurea'] = 'Laurea triennale'
            
            # Extract course of study name
            corso_match = re.search(r'Corso di Laurea[:\s]*([A-Z\s]+)', text_content, re.IGNORECASE)
            if corso_match:
                details['corso_di_studi'] = corso_match.group(1).strip()
            
            # Look for textbooks in expandable sections or bibliography
            # Find elements that might contain textbook information
            possible_textbook_sections = soup.find_all(['div', 'section', 'details', 'summary'])
            
            for section in possible_textbook_sections:
                section_text = section.get_text().lower()
                if any(keyword in section_text for keyword in ['testo', 'bibliografia', 'libro', 'manuale', 'slide']):
                    # Found a textbook section
                    full_text = section.get_text(strip=True)
                    if len(full_text) > 50:  # Substantial content
                        details['textbooks'] = full_text[:800]  # Limit length
                        break
            
            # Look for expandable content (like your example with separator)
            details_elements = soup.find_all('details')
            for detail_elem in details_elements:
                detail_text = detail_elem.get_text()
                if any(keyword in detail_text.lower() for keyword in ['testo', 'bibliografia', 'materiale']):
                    details['textbooks'] = detail_text.strip()[:800]
                    break
            
            time.sleep(2)  # Delay between requests
            
        except Exception as e:
            print(f"Error getting course details from {course_link}: {e}")
        
        return details
    
    def find_book_isbn(self, book_title: str, author: str = '') -> str:
        """Search for book ISBN on libreriauniversitaria.it"""
        
        if not book_title:
            return ""
        
        try:
            # Clean and prepare search terms
            search_query = f"{book_title} {author}".strip()
            search_url = f"https://www.libreriauniversitaria.it/ricerca?q={urllib.parse.quote(search_query)}"
            
            soup = self.fetch_page(search_url)
            if not soup:
                return ""
            
            # Look for EAN/ISBN patterns in the page
            page_text = soup.get_text()
            
            # Search for EAN patterns (13 digits)
            ean_pattern = r'EAN[:\s]*(\d{13})'
            ean_matches = re.findall(ean_pattern, page_text, re.IGNORECASE)
            
            if ean_matches:
                return ean_matches[0]
            
            # Search for ISBN patterns
            isbn_patterns = [
                r'ISBN[:\s]*(\d{13})',
                r'ISBN[:\s]*(\d{10})',
                r'ISBN[:\s]*(\d{3}-\d{10})',
                r'(\d{13})'  # Generic 13-digit number
            ]
            
            for pattern in isbn_patterns:
                matches = re.findall(pattern, page_text, re.IGNORECASE)
                if matches:
                    return matches[0]
            
            time.sleep(2)  # Delay between searches
            
        except Exception as e:
            print(f"Error searching ISBN for '{book_title}': {e}")
        
        return ""
    
    def parse_textbooks_and_get_isbns(self, textbook_text: str) -> str:
        """Parse textbook text and get ISBNs for each book"""
        
        if not textbook_text:
            return ""
        
        try:
            # Split textbook text into individual books
            books = []
            
            # Common patterns to identify book entries
            book_patterns = [
                r'([A-Za-z\s,]+)\s*\(([^)]+)\)',  # Title (Author)
                r'([A-Za-z\s,]+)\s*,\s*([A-Za-z\s]+),',  # Title, Author,
                r'([A-Za-z\s]+)\s*-\s*([A-Za-z\s]+)'  # Title - Author
            ]
            
            # For now, process first book mentioned
            first_line = textbook_text.split('\n')[0] if '\n' in textbook_text else textbook_text
            
            # Extract author and title
            if '(' in first_line and ')' in first_line:
                # Pattern: Title (Author, edition)
                title_part = first_line.split('(')[0].strip()
                author_part = first_line.split('(')[1].split(',')[0].strip() if ',' in first_line else first_line.split('(')[1].split(')')[0].strip()
            else:
                # Try comma separation
                parts = first_line.split(',')
                title_part = parts[0].strip() if parts else first_line
                author_part = parts[1].strip() if len(parts) > 1 else ""
            
            # Search for ISBN
            isbn = self.find_book_isbn(title_part, author_part)
            
            # Format the result
            if isbn:
                formatted_text = f"{first_line}"
                if 'ISBN' not in formatted_text and isbn:
                    formatted_text += f", ISBN {isbn}"
                return formatted_text
            else:
                return first_line
            
        except Exception as e:
            print(f"Error parsing textbooks: {e}")
            return textbook_text
    
    def find_professor_email(self, professor_name: str) -> str:
        """Find professor email from rubrica"""
        
        if not professor_name:
            return ""
        
        try:
            # Handle multiple professors
            main_prof = professor_name.split('/')[0].strip()
            main_prof = main_prof.replace('Prof.', '').replace('Dott.', '').strip()
            
            # Use rubrica search
            search_query = urllib.parse.quote(main_prof)
            rubrica_url = f"https://www.unimore.it/it/rubrica?q={search_query}"
            
            soup = self.fetch_page(rubrica_url)
            if not soup:
                # Fallback to predictable pattern
                name_parts = main_prof.lower().split()
                if len(name_parts) >= 2:
                    return f"{name_parts[0]}.{name_parts[-1]}@unimore.it"
                return ""
            
            # Look for email patterns
            email_pattern = r'\b[A-Za-z0-9._%+-]+@unimore\.it\b'
            emails = re.findall(email_pattern, soup.get_text())
            
            if emails:
                return emails[0]
            
            # Fallback
            name_parts = main_prof.lower().split()
            if len(name_parts) >= 2:
                return f"{name_parts[0]}.{name_parts[-1]}@unimore.it"
            
            time.sleep(1)  # Delay between searches
            
        except Exception as e:
            print(f"Error finding email for {professor_name}: {e}")
            # Fallback
            try:
                main_prof = professor_name.split('/')[0].strip()
                name_parts = main_prof.lower().split()
                if len(name_parts) >= 2:
                    return f"{name_parts[0]}.{name_parts[-1]}@unimore.it"
            except:
                pass
        
        return ""
    
    def process_courses(self) -> List[Dict]:
        """Process all courses with real data"""
        
        print("=== EXTRACTING REAL COURSE DATA ===")
        
        # Get courses with real links
        courses = self.extract_real_course_links()
        
        if not courses:
            print("No courses found with links!")
            return []
        
        processed_courses = []
        
        for i, course in enumerate(courses):
            print(f"\n--- Processing Course {i+1}/{len(courses)} ---")
            print(f"Course: {course['course_name']}")
            print(f"Link: {course['course_link']}")
            
            # Get course details from the actual course page
            course_details = self.get_course_details(course['course_link'])
            
            # Get professor email
            professor_email = self.find_professor_email(course['professor'])
            
            # Process textbooks and get ISBNs
            textbooks_with_isbn = self.parse_textbooks_and_get_isbns(course_details['textbooks'])
            
            # Create final record
            record = {
                'Facoltà': 'Economia',
                'Tipo di laurea': course_details['tipo_laurea'],
                'Nome corso': course_details['corso_di_studi'] if course_details['corso_di_studi'] else course['course_name'],
                'Anno di corso': course_details['anno_corso'],
                'Percorso del corso': course_details['percorso_corso'],
                'Nome Esame': course['course_name'],
                'Professore': course['professor'],
                'Mail professore': professor_email,
                'Programmi e testi': textbooks_with_isbn,
                'Link corso': course['course_link']
            }
            
            processed_courses.append(record)
            
            print(f"✓ Degree Type: {record['Tipo di laurea']}")
            print(f"✓ Course of Study: {record['Nome corso']}")
            print(f"✓ Professor Email: {record['Mail professore']}")
            print(f"✓ Textbooks: {record['Programmi e testi'][:100]}...")
            
            # Delay between courses
            time.sleep(3)
            
            # Process only first 3 for testing
            if i >= 2:
                break
        
        return processed_courses

def main():
    print("=" * 60)
    print("REAL UNIVERSITY OF MODENA DATA EXTRACTION")
    print("=" * 60)
    
    extractor = RealUnimoreExtractor()
    
    # Process courses with real data
    courses = extractor.process_courses()
    
    if not courses:
        print("❌ No courses processed!")
        return
    
    # Save to Excel
    df = pd.DataFrame(courses)
    filename = "real_economia_courses.xlsx"
    df.to_excel(filename, index=False, engine='openpyxl')
    
    print(f"\n✅ Saved {len(courses)} courses to {filename}")
    
    # Show results
    print("\n" + "=" * 60)
    print("RESULTS PREVIEW:")
    print("=" * 60)
    
    for i, record in enumerate(courses):
        print(f"\n📋 RECORD {i+1}:")
        print("-" * 40)
        for key, value in record.items():
            print(f"{key:20}: {value}")

if __name__ == "__main__":
    main()