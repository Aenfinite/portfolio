#!/usr/bin/env python3
"""
Simple University of Modena Course Data Extractor
Direct approach to extract course information
"""

import requests
from bs4 import BeautifulSoup
import pandas as pd
import re
import time
import urllib.parse
from typing import Dict, List, Optional

def fetch_economia_courses():
    """Fetch courses from Economia department starting from record 11"""
    
    url = "https://www.orariolezioni.unimore.it/Orario/Dipartimento_di_Economia_Marco_Biagi/2025-2026/2270/ttHtml.html"
    
    print(f"Fetching: {url}")
    
    session = requests.Session()
    session.headers.update({
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    })
    
    try:
        response = session.get(url, timeout=30)
        response.raise_for_status()
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Find all table rows
        rows = soup.find_all('tr')
        print(f"Found {len(rows)} table rows")
        
        courses = []
        
        for row in rows:
            cells = row.find_all(['td', 'th'])
            if len(cells) < 6:
                continue
                
            try:
                # Get row number from first cell
                row_num_text = cells[0].get_text(strip=True)
                if not row_num_text.isdigit():
                    continue
                    
                row_num = int(row_num_text)
                if row_num < 11:  # Start from record 11
                    continue
                    
                # Extract course data
                course_name = cells[1].get_text(strip=True)
                course_study = cells[2].get_text(strip=True)
                credits = cells[3].get_text(strip=True)
                professor = cells[4].get_text(strip=True)
                schedule = cells[5].get_text(strip=True)
                dates = cells[6].get_text(strip=True) if len(cells) > 6 else ""
                
                # Look for course link in the "vedi" cell
                course_link = ""
                vedi_links = cells[2].find_all('a', href=True)
                for link in vedi_links:
                    href = link.get('href', '')
                    if 'coursecatalogue.cineca.it' in href:
                        course_link = href
                        break
                
                course_data = {
                    'Row': row_num,
                    'Facoltà': 'Economia',
                    'Nome Esame': course_name,
                    'Course Study': course_study,
                    'Crediti': credits,
                    'Professore': professor,
                    'Schedule': schedule,
                    'Dates': dates,
                    'Link corso': course_link
                }
                
                courses.append(course_data)
                print(f"Row {row_num}: {course_name} - {professor}")
                
                # Limit for initial testing
                if len(courses) >= 15:
                    break
                    
            except Exception as e:
                print(f"Error processing row: {e}")
                continue
        
        return courses
        
    except Exception as e:
        print(f"Error fetching data: {e}")
        return []

def find_professor_email(professor_name: str) -> str:
    """Search for professor email"""
    if not professor_name:
        return ""
        
    try:
        # Handle multiple professors
        main_prof = professor_name.split('/')[0].strip()
        main_prof = main_prof.replace('Prof.', '').replace('Dott.', '').strip()
        
        # Simple email construction based on common patterns
        name_parts = main_prof.lower().split()
        if len(name_parts) >= 2:
            # Common pattern: firstname.lastname@unimore.it
            email_guess = f"{name_parts[0]}.{name_parts[-1]}@unimore.it"
            return email_guess
            
    except Exception as e:
        print(f"Error constructing email for {professor_name}: {e}")
        
    return ""

def get_course_catalogue_info(course_link: str) -> Dict:
    """Get additional course information from catalogue"""
    info = {
        'Tipo di laurea': '',
        'Anno di corso': '',
        'Percorso del corso': '',
        'Programmi e testi': ''
    }
    
    if not course_link:
        return info
        
    try:
        session = requests.Session()
        session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        })
        
        print(f"Fetching course details: {course_link}")
        response = session.get(course_link, timeout=20)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        text_content = soup.get_text().lower()
        
        # Extract degree type
        if 'magistrale' in text_content:
            info['Tipo di laurea'] = 'Laurea magistrale'
        elif 'triennale' in text_content:
            info['Tipo di laurea'] = 'Laurea triennale'
        
        # Extract year
        year_match = re.search(r'(\d+)°?\s*anno', text_content)
        if year_match:
            info['Anno di corso'] = year_match.group(1)
        
        # Extract curriculum
        if 'comune' in text_content:
            info['Percorso del corso'] = 'Comune'
        
        # Look for textbook information
        textbook_keywords = ['bibliografia', 'testi', 'libri', 'manuale']
        for keyword in textbook_keywords:
            if keyword in text_content:
                # Try to extract textbook section
                sections = soup.find_all(['div', 'section', 'p'])
                for section in sections:
                    section_text = section.get_text()
                    if keyword in section_text.lower() and len(section_text) > 50:
                        info['Programmi e testi'] = section_text[:500]
                        break
                if info['Programmi e testi']:
                    break
        
        time.sleep(2)  # Delay between requests
        
    except Exception as e:
        print(f"Error fetching course details: {e}")
    
    return info

def main():
    print("=== University of Modena Data Extraction ===")
    print("Starting with Economia department from record 11...")
    
    # Fetch basic course data
    courses = fetch_economia_courses()
    
    if not courses:
        print("No courses found!")
        return
    
    print(f"\nFound {len(courses)} courses. Processing details...")
    
    # Process each course
    final_data = []
    
    for i, course in enumerate(courses):
        print(f"\nProcessing course {i+1}/{len(courses)}: {course['Nome Esame']}")
        
        # Get professor email
        email = find_professor_email(course['Professore'])
        
        # Get course catalogue details
        catalogue_info = get_course_catalogue_info(course['Link corso'])
        
        # Create final record
        record = {
            'Facoltà': course['Facoltà'],
            'Tipo di laurea': catalogue_info['Tipo di laurea'],
            'Nome corso': course['Nome Esame'],  # Using exam name as course name
            'Anno di corso': catalogue_info['Anno di corso'],
            'Percorso del corso': catalogue_info['Percorso del corso'],
            'Nome Esame': course['Nome Esame'],
            'Professore': course['Professore'],
            'Mail professore': email,
            'Programmi e testi': catalogue_info['Programmi e testi'],
            'Link corso': course['Link corso']
        }
        
        final_data.append(record)
        
        # Show progress
        print(f"  Professor: {record['Professore']}")
        print(f"  Email: {record['Mail professore']}")
        print(f"  Link: {record['Link corso']}")
        
        # Limit processing for initial test
        if i >= 4:  # Process first 5 courses
            break
    
    # Save to Excel
    df = pd.DataFrame(final_data)
    filename = "unimore_economia_first_records.xlsx"
    df.to_excel(filename, index=False, engine='openpyxl')
    
    print(f"\n=== RESULTS SAVED TO {filename} ===")
    
    # Display first results
    print("\n=== FIRST RESULTS PREVIEW ===")
    for i, record in enumerate(final_data):
        print(f"\nRecord {i+1}:")
        for key, value in record.items():
            print(f"  {key}: {value}")
        print("-" * 50)

if __name__ == "__main__":
    main()