#!/usr/bin/env python3
"""
Complete University of Modena Web Scraping Bot - FIXED VERSION
Automates the entire data collection process with browser automation
"""

from selenium import             # Process the rubrica cards
            email = ""
            course_link = ""
            
            # Check each rubrica card for matching professor
            for i, card in enumerate(rubrica_cards):
                try:
                    # Get professor name from the card
                    name_element = card.find_element(By.CSS_SELECTOR, ".rubrica__name")
                    card_professor_name = name_element.text.strip()
                    print(f"👤 Found professor {i+1}: {card_professor_name}")
                    
                    # Check if this matches our target professor
                    professor_names = main_professor.split()
                    card_name_lower = card_professor_name.lower()
                    
                    # Check if at least 2 name parts match (handles different name orders)
                    matching_names = [name for name in professor_names if name.lower() in card_name_lower and len(name) > 2]
                    
                    if len(matching_names) >= 2 or main_professor.lower() in card_name_lower:
                        print(f"✅ MATCH FOUND: {card_professor_name}")
                        
                        # Extract email from this card
                        try:
                            email_element = card.find_element(By.CSS_SELECTOR, ".rubrica__email a")
                            email = email_element.get_attribute('href').replace('mailto:', '')
                            print(f"📧 Extracted email: {email}")
                        except Exception as e:
                            print(f"⚠️ Could not extract email link: {e}")
                            # Try alternative email extraction
                            try:
                                email_text = card.find_element(By.CSS_SELECTOR, ".rubrica__email").text.strip()
                                if '@' in email_text:
                                    email = email_text
                                    print(f"📧 Extracted email (text): {email}")
                            except:
                                print("❌ No email found in card")
                        
                        # Try to find personal page link for course information
                        try:
                            personal_page_link = card.find_element(By.CSS_SELECTOR, ".rubrica__button a")
                            personal_page_url = personal_page_link.get_attribute('href')
                            print(f"🔗 Found personal page: {personal_page_url}")
                            
                            # Navigate to personal page to look for course links
                            self.driver.get(personal_page_url)
                            time.sleep(3)
                            
                            # Look for course/teaching links on personal page
                            course_links = self.driver.find_elements(By.XPATH, "//a[contains(@href, 'coursecatalogue.cineca.it')]")
                            for link in course_links:
                                link_text = link.text.lower()
                                target_words = target_course.lower().split()[:3]
                                if any(word in link_text for word in target_words if len(word) > 3):
                                    course_link = link.get_attribute('href')
                                    print(f"🎯 Found matching course link: {course_link}")
                                    break
                        except Exception as e:
                            print(f"⚠️ Error accessing personal page: {e}")
                        
                        break  # Found our professor, stop looking
                        
                except Exception as e:
                    print(f"⚠️ Error processing rubrica card {i+1}: {e}")
                    continuerom selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import TimeoutException, NoSuchElementException
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service
import pandas as pd
import time
import re
from typing import Dict, List, Optional

class UnimoreScrapingBot:
    def __init__(self, headless: bool = False):
        """Initialize the web scraping bot"""
        self.setup_driver(headless)
        self.results = []
        
    def setup_driver(self, headless: bool):
        """Setup Chrome WebDriver with options"""
        chrome_options = Options()
        if headless:
            chrome_options.add_argument("--headless")
        
        # Stability and performance options
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")
        chrome_options.add_argument("--disable-gpu")
        chrome_options.add_argument("--disable-web-security")
        chrome_options.add_argument("--disable-features=VizDisplayCompositor")
        chrome_options.add_argument("--disable-extensions")
        chrome_options.add_argument("--disable-plugins")
        chrome_options.add_argument("--disable-images")
        chrome_options.add_argument("--window-size=1920,1080")
        chrome_options.add_argument("--start-maximized")
        
        # User agent and headers
        chrome_options.add_argument("--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")
        
        # Memory and crash prevention
        chrome_options.add_argument("--memory-pressure-off")
        chrome_options.add_argument("--max_old_space_size=4096")
        chrome_options.add_argument("--disable-background-timer-throttling")
        chrome_options.add_argument("--disable-renderer-backgrounding")
        chrome_options.add_argument("--disable-backgrounding-occluded-windows")
        
        # Logging
        chrome_options.add_argument("--disable-logging")
        chrome_options.add_argument("--log-level=3")
        chrome_options.add_argument("--silent")
        
        try:
            # Automatically download and setup ChromeDriver
            service = Service(ChromeDriverManager().install())
            self.driver = webdriver.Chrome(service=service, options=chrome_options)
            self.wait = WebDriverWait(self.driver, 10)
            print("✅ Chrome WebDriver initialized successfully")
        except Exception as e:
            print(f"❌ Error initializing WebDriver: {e}")
            print("Make sure Google Chrome is installed on your system")
            raise
    
    def get_schedule_data(self, department: str, start_record: int = 11) -> List[Dict]:
        """Step 1: Extract courses from schedule page"""
        print(f"\n🔍 STEP 1: Extracting {department} schedule data...")
        
        urls = {
            'economia': 'https://www.orariolezioni.unimore.it/Orario/Dipartimento_di_Economia_Marco_Biagi/2025-2026/2270/ttHtml.html',
            'giurisprudenza': 'https://www.orariolezioni.unimore.it/Orario/Dipartimento_di_Giurisprudenza/2025-2026/2273/ttHtml.html',
            'ingegneria': 'https://www.orariolezioni.unimore.it/Orario/Dipartimento_di_Ingegneria_Enzo_Ferrari/2025-2026/2249/ttHtml.html'
        }
        
        if department.lower() not in urls:
            print(f"❌ Unknown department: {department}")
            return []
        
        self.driver.get(urls[department.lower()])
        time.sleep(3)
        
        courses = []
        
        try:
            # Find table rows
            rows = self.driver.find_elements(By.TAG_NAME, "tr")
            print(f"Found {len(rows)} table rows")
            
            for row in rows:
                cells = row.find_elements(By.TAG_NAME, "td")
                
                if len(cells) < 6:
                    continue
                    
                try:
                    # Get row number
                    row_num_text = cells[0].text.strip()
                    if not row_num_text.isdigit():
                        continue
                        
                    row_num = int(row_num_text)
                    if row_num < start_record:
                        continue
                    
                    # Extract course data
                    course_name = cells[1].text.strip()
                    professor = cells[4].text.strip()
                    
                    # Look for "vedi" link in course study column
                    course_link = ""
                    try:
                        vedi_links = cells[2].find_elements(By.TAG_NAME, "a")
                        for link in vedi_links:
                            href = link.get_attribute('href')
                            if href and 'coursecatalogue.cineca.it' in href:
                                course_link = href
                                break
                    except:
                        pass
                    
                    course_data = {
                        'row_number': row_num,
                        'course_name': course_name,
                        'professor': professor,
                        'course_link': course_link,
                        'department': department.capitalize()
                    }
                    
                    courses.append(course_data)
                    print(f"✅ Row {row_num}: {course_name} - {professor}")
                    
                    # Limit for testing
                    if len(courses) >= 5:
                        break
                        
                except Exception as e:
                    print(f"⚠️ Error processing row: {e}")
                    continue
            
            print(f"✅ Extracted {len(courses)} courses from schedule")
            return courses
            
        except Exception as e:
            print(f"❌ Error extracting schedule data: {e}")
            return []
    
    def search_professor_email(self, professor_name: str, target_course: str) -> tuple:
        """Step 2: Search professor in rubrica and extract email from results"""
        print(f"\n📧 STEP 2: Searching professor email for {professor_name}")
        
        # Handle multiple professors - take the first one
        main_professor = professor_name.split('/')[0].strip()
        print(f"Searching for main professor: {main_professor}")
        
        try:
            # Navigate to rubrica page
            print("🌐 Navigating to rubrica page...")
            self.driver.get("https://www.unimore.it/it/rubrica")
            time.sleep(5)
            
            # Find and fill the search field (name_1 is the correct field)
            print("🔍 Finding search form...")
            search_field = self.driver.find_element(By.XPATH, "//input[@name='name_1']")
            search_field.clear()
            search_field.send_keys(main_professor)
            time.sleep(1)
            print(f"⌨️ Entered professor name: {main_professor}")
            
            # Find the correct Cerca button (edit-submit-rubrica-role)
            search_button = self.driver.find_element(By.XPATH, "//button[@id='edit-submit-rubrica-role']")
            print(f"🔘 Found search button: {search_button.get_attribute('id')}")
            
            # Use JavaScript click to avoid cookie banner interference
            print("🔘 Clicking search button with JavaScript...")
            self.driver.execute_script("arguments[0].click();", search_button)
            time.sleep(5)
            print("✅ Search form submitted successfully")
            
            # Look for rubrica results
            rubrica_cards = self.driver.find_elements(By.CSS_SELECTOR, ".rubrica__wrapper")
            print(f"📋 Found {len(rubrica_cards)} rubrica cards")
            
            if not rubrica_cards:
                print("⚠️ No rubrica cards found")
                return "", ""
            
            # Process the professor cards we found
            print(f"🔍 Processing {len(professor_cards)} professor result containers...")
            
            if not professor_cards:
                # Fallback: look for any containers that might have professor info
                print("⚠️ No rubrica cards found, trying fallback approach...")
                fallback_containers = self.driver.find_elements(By.CSS_SELECTOR, ".view-content, .views-row")
                professor_cards = [c for c in fallback_containers if len(c.text.strip()) > 50]  # Only substantial content
                print(f"� Using {len(professor_cards)} fallback containers")
            
            email = ""
            course_link = ""
            
            # Check each container
            for i, card in enumerate(professor_cards):
                try:
                    print(f"🔍 Examining container {i+1}...")
                    card_html = card.get_attribute('innerHTML')[:200]  # First 200 chars
                    print(f"📄 Container HTML preview: {card_html}...")
                    card_text = card.text.strip()
                    print(f"� Container text: {card_text[:100]}...")
                    
                    # Look for professor name in various possible selectors
                    professor_name_selectors = [
                        ".rubrica__name",
                        ".field-content",
                        "h3", "h4", "h5",
                        "[class*='name']",
                        "[class*='title']",
                        "strong", "b"
                    ]
                    
                    card_professor_name = ""
                    for selector in professor_name_selectors:
                        try:
                            name_element = card.find_element(By.CSS_SELECTOR, selector)
                            potential_name = name_element.text.strip()
                            if len(potential_name) > 5 and any(name.lower() in potential_name.lower() for name in main_professor.split()):
                                card_professor_name = potential_name
                                print(f"👤 Found professor name with selector '{selector}': {card_professor_name}")
                                break
                        except:
                            continue
                    
                    # If no specific selector worked, check if professor name is anywhere in the card text
                    if not card_professor_name and card_text:
                        professor_names = main_professor.split()
                        card_text_lower = card_text.lower()
                        matching_names = [name for name in professor_names if name.lower() in card_text_lower and len(name) > 2]
                        
                        if len(matching_names) >= 2:
                            card_professor_name = main_professor  # Use the search name
                            print(f"👤 Found professor in card text: {matching_names}")
                    
                    if card_professor_name:
                        print(f"✅ MATCH FOUND: {card_professor_name}")
                        
                        # Look for email in various selectors
                        email_selectors = [
                            ".rubrica__email a",
                            ".rubrica__email",
                            "a[href*='mailto:']",
                            "[class*='email']",
                            "*"  # Last resort - search all elements
                        ]
                        
                        for email_selector in email_selectors:
                            try:
                                if email_selector == "*":
                                    # Search all text in the card for email patterns
                                    import re
                                    email_pattern = r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'
                                    email_match = re.search(email_pattern, card_text)
                                    if email_match:
                                        email = email_match.group(0)
                                        print(f"📧 Found email in text: {email}")
                                        break
                                else:
                                    email_element = card.find_element(By.CSS_SELECTOR, email_selector)
                                    if 'mailto:' in email_element.get_attribute('href'):
                                        email = email_element.get_attribute('href').replace('mailto:', '')
                                    else:
                                        email_text = email_element.text.strip()
                                        if '@' in email_text:
                                            email = email_text
                                    print(f"📧 Found email with selector '{email_selector}': {email}")
                                    break
                            except:
                                continue
                        
                        if email:
                            # Look for personal page or profile link
                            link_selectors = [
                                ".rubrica__button a",
                                "a[href*='unimore.unifind.cineca.it']",
                                "a[href*='docente']",
                                "a[target='_blank']"
                            ]
                            
                            for link_selector in link_selectors:
                                try:
                                    personal_page_link = card.find_element(By.CSS_SELECTOR, link_selector)
                                    personal_page_url = personal_page_link.get_attribute('href')
                                    print(f"🔗 Found personal page: {personal_page_url}")
                                    break
                                except:
                                    continue
                        
                        break  # Found our professor, stop looking
                        
                except Exception as e:
                    print(f"⚠️ Error processing container {i+1}: {e}")
                    continue
            
            if email:
                print(f"✅ Successfully found professor email: {email}")
                return email, course_link
            else:
                print("⚠️ No matching professor found in rubrica results")
                return "", ""
                
        except Exception as e:
            print(f"❌ Error in professor search: {e}")
            # Take screenshot for debugging
            try:
                self.driver.save_screenshot("rubrica_error.png")
                print("📸 Screenshot saved as rubrica_error.png")
            except:
                pass
            return "", ""
    
    def extract_course_details(self, course_link: str) -> Dict:
        """Step 3: Extract detailed course information"""
        print(f"\n📚 STEP 3: Extracting course details from {course_link}")
        
        details = {
            'tipo_laurea': '',
            'nome_corso': '',
            'anno_corso': '',
            'percorso_corso': '',
            'nome_esame': '',
            'programmi_testi': ''
        }
        
        if not course_link:
            return details
            
        try:
            self.driver.get(course_link)
            time.sleep(3)
            
            # Extract course title
            try:
                title_element = self.driver.find_element(By.TAG_NAME, "h1")
                details['nome_esame'] = title_element.text.strip()
            except:
                pass
            
            # Extract information from the general info section
            try:
                # Look for "Corso di Laurea" or "Corso di Laurea Magistrale"
                tipo_elements = self.driver.find_elements(By.XPATH, "//*[contains(text(), 'Corso di Laurea')]")
                for elem in tipo_elements:
                    text = elem.text.strip()
                    if 'Magistrale' in text:
                        details['tipo_laurea'] = 'Laurea magistrale'
                    elif 'Corso di Laurea' in text:
                        details['tipo_laurea'] = 'Laurea triennale'
                    break
                
                # Extract course name from the page
                course_name_elements = self.driver.find_elements(By.XPATH, "//*[contains(@class, 'course-name') or contains(@class, 'title')]")
                if course_name_elements:
                    details['nome_corso'] = course_name_elements[0].text.strip()
                
                # Look for year information
                year_elements = self.driver.find_elements(By.XPATH, "//*[contains(text(), 'Anno')]")
                for elem in year_elements:
                    year_match = re.search(r'(\d+)', elem.text)
                    if year_match:
                        details['anno_corso'] = year_match.group(1)
                        break
                
                # Look for curriculum/track info
                curriculum_keywords = ['Comune', 'Affine', 'Integrativa', 'Caratterizzante']
                for keyword in curriculum_keywords:
                    elements = self.driver.find_elements(By.XPATH, f"//*[contains(text(), '{keyword}')]")
                    if elements:
                        details['percorso_corso'] = keyword
                        break
                
            except Exception as e:
                print(f"⚠️ Error extracting course info: {e}")
            
            # Step 4: Extract textbooks
            try:
                # Look for "Testi" button or section
                testi_buttons = self.driver.find_elements(By.XPATH, "//*[contains(text(), 'Testi') or contains(text(), 'Bibliografia')]")
                
                if testi_buttons:
                    # Try clicking the button
                    try:
                        testi_buttons[0].click()
                        time.sleep(2)
                    except:
                        pass
                    
                    # Extract textbook content
                    textbook_elements = self.driver.find_elements(By.XPATH, "//*[contains(@class, 'testi') or contains(@class, 'bibliography')]")
                    
                    textbook_text = ""
                    for elem in textbook_elements:
                        text = elem.text.strip()
                        if len(text) > 20:  # Substantial content
                            textbook_text += text + " "
                    
                    if textbook_text:
                        details['programmi_testi'] = textbook_text.strip()
                        
            except Exception as e:
                print(f"⚠️ Error extracting textbooks: {e}")
            
            print(f"✅ Extracted course details: {details['nome_esame']}")
            return details
            
        except Exception as e:
            print(f"❌ Error extracting course details: {e}")
            return details
    
    def process_department(self, department: str, start_record: int = 11, max_courses: int = 5):
        """Main processing function"""
        print(f"\n{'='*60}")
        print(f"🚀 PROCESSING {department.upper()} DEPARTMENT")
        print(f"{'='*60}")
        
        # Step 1: Get schedule data
        courses = self.get_schedule_data(department, start_record)
        
        if not courses:
            print("❌ No courses found in schedule")
            return []
        
        processed_courses = []
        
        for i, course in enumerate(courses[:max_courses]):
            print(f"\n{'🔄 PROCESSING COURSE {i+1}/{min(len(courses), max_courses)}'}")
            print(f"Course: {course['course_name']}")
            print(f"Professor: {course['professor']}")
            
            # Step 2: Get professor email and course link
            email, real_course_link = self.search_professor_email(
                course['professor'], 
                course['course_name']
            )
            
            # Use the link from professor's page if available, otherwise use schedule link
            final_course_link = real_course_link or course['course_link']
            
            # Step 3: Extract course details
            course_details = self.extract_course_details(final_course_link)
            
            # Compile final record
            record = {
                'Facoltà': course['department'],
                'Tipo di laurea': course_details['tipo_laurea'] or 'Laurea magistrale',
                'Nome corso': course_details['nome_corso'] or course['course_name'],
                'Anno di corso': course_details['anno_corso'] or '1',
                'Percorso del corso': course_details['percorso_corso'] or 'Comune',
                'Nome Esame': course_details['nome_esame'] or course['course_name'],
                'Professore': course['professor'],
                'Mail professore': email,
                'Programmi e testi': course_details['programmi_testi'],
                'Link corso': final_course_link
            }
            
            processed_courses.append(record)
            
            print(f"✅ COMPLETED: {record['Nome Esame']}")
            print(f"   Email: {record['Mail professore']}")
            print(f"   Link: {record['Link corso']}")
            
            # Delay between courses
            time.sleep(2)
        
        return processed_courses
    
    def save_to_excel(self, courses: List[Dict], filename: str):
        """Save results to Excel file"""
        try:
            df = pd.DataFrame(courses)
            df.to_excel(filename, index=False, engine='openpyxl')
            print(f"\n✅ Data saved to {filename}")
            return True
        except Exception as e:
            print(f"❌ Error saving to Excel: {e}")
            return False
    
    def close(self):
        """Close the browser"""
        if hasattr(self, 'driver'):
            self.driver.quit()
            print("🔒 Browser closed")

def main():
    print("🤖 UNIVERSITY OF MODENA WEB SCRAPING BOT - FIXED VERSION")
    print("="*60)
    
    bot = None
    try:
        # Initialize bot
        bot = UnimoreScrapingBot(headless=False)  # Set to True for headless mode
        
        # Process Economia department (just 1 course for testing)
        courses = bot.process_department('economia', start_record=11, max_courses=1)
        
        if courses:
            # Save results
            filename = "economia_real_data_fixed.xlsx"
            bot.save_to_excel(courses, filename)
            
            # Show results
            print(f"\n{'='*60}")
            print("📊 RESULTS PREVIEW")
            print(f"{'='*60}")
            
            for i, course in enumerate(courses):
                print(f"\n🎯 RECORD {i+1}:")
                for key, value in course.items():
                    print(f"  {key}: {value}")
        
    except Exception as e:
        print(f"❌ Critical error: {e}")
    
    finally:
        if bot:
            bot.close()

if __name__ == "__main__":
    main()