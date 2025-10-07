#!/usr/bin/env python3
"""
Test specific course link to understand the structure
"""

import requests
from bs4 import BeautifulSoup

def test_course_page():
    # Test the example link you provided
    test_url = "https://unimore.coursecatalogue.cineca.it/insegnamenti/2025/25732/2019/9999/10733?coorte=2024&schemaid=22003"
    
    session = requests.Session()
    session.headers.update({
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    })
    
    try:
        print(f"Testing course page: {test_url}")
        response = session.get(test_url, timeout=30)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        
        print("\n=== PAGE TITLE ===")
        title = soup.find('title')
        if title:
            print(title.get_text())
        
        print("\n=== LOOKING FOR COURSE INFO ===")
        
        # Look for degree type indicators
        text_content = soup.get_text()
        print(f"Page contains 'Corso di Laurea': {'Corso di Laurea' in text_content}")
        print(f"Page contains 'ECONOMIA AZIENDALE': {'ECONOMIA AZIENDALE' in text_content}")
        print(f"Page contains 'Bilancio': {'Bilancio' in text_content}")
        
        # Look for course of studies info
        if 'ECONOMIA AZIENDALE E MANAGEMENT' in text_content:
            print("✓ Found: ECONOMIA AZIENDALE E MANAGEMENT")
        
        if 'Corso di Laurea' in text_content:
            print("✓ Found: Corso di Laurea")
        
        # Look for textbook sections
        print(f"Page contains 'Testi': {'Testi' in text_content}")
        print(f"Page contains 'Bibliografia': {'Bibliografia' in text_content}")
        print(f"Page contains 'Quagli': {'Quagli' in text_content}")
        
        # Try to find specific elements
        print("\n=== SEARCHING FOR SPECIFIC ELEMENTS ===")
        
        # Look for expandable sections
        details = soup.find_all('details')
        print(f"Found {len(details)} <details> elements")
        
        for i, detail in enumerate(details):
            summary = detail.find('summary')
            if summary:
                print(f"Details {i+1} summary: {summary.get_text()[:100]}")
        
        # Look for divs that might contain course info
        course_divs = soup.find_all('div', class_=re.compile(r'course|info|content', re.I))
        print(f"Found {len(course_divs)} potential course info divs")
        
        # Print first 1000 chars of page content
        print("\n=== FIRST 1000 CHARS OF PAGE ===")
        print(text_content[:1000])
        
    except Exception as e:
        print(f"Error accessing course page: {e}")

def test_schedule_page_links():
    """Test extracting links from the schedule page"""
    
    url = "https://www.orariolezioni.unimore.it/Orario/Dipartimento_di_Economia_Marco_Biagi/2025-2026/2270/ttHtml.html"
    
    session = requests.Session()
    session.headers.update({
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    })
    
    try:
        print(f"\n=== TESTING SCHEDULE PAGE LINKS ===")
        response = session.get(url, timeout=30)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Find all links in the page
        all_links = soup.find_all('a', href=True)
        course_links = []
        
        for link in all_links:
            href = link.get('href', '')
            if 'coursecatalogue.cineca.it' in href or 'insegnamenti' in href:
                course_links.append({
                    'text': link.get_text(strip=True),
                    'href': href
                })
        
        print(f"Found {len(course_links)} course catalogue links:")
        for i, link in enumerate(course_links[:10]):  # Show first 10
            print(f"{i+1}. Text: '{link['text']}' -> {link['href']}")
        
        # Also look in specific table structure
        print(f"\n=== LOOKING IN TABLE CELLS ===")
        
        rows = soup.find_all('tr')
        for row_idx, row in enumerate(rows[10:20]):  # Check rows around 11-20
            cells = row.find_all(['td', 'th'])
            if len(cells) >= 3:
                # Check the third cell (index 2) which should contain "vedi" links
                vedi_cell = cells[2]
                links_in_cell = vedi_cell.find_all('a', href=True)
                
                if links_in_cell:
                    print(f"Row {row_idx+10}: Found {len(links_in_cell)} links in vedi cell")
                    for link in links_in_cell:
                        print(f"  -> {link.get('href', '')}")
        
    except Exception as e:
        print(f"Error testing schedule page: {e}")

if __name__ == "__main__":
    # Test the specific course page first
    test_course_page()
    
    # Then test extracting links from schedule
    test_schedule_page_links()