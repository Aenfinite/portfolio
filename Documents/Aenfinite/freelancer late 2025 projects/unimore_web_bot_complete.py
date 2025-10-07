#!/usr/bin/env python3
"""
Complete University of Modena Web Scraping Bot - WORKING VERSION
Automates the entire data collection process with browser automation
"""

from selenium import webdriver
from selenium.webdriver.common.by import By
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
        """Step 2: Search professor in rubrica and extract email + course link"""
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
            
            # Process the rubrica cards
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
                        
                        # STEP 3: Navigate to personal page and find course in Insegnamenti
                        try:
                            personal_page_link = card.find_element(By.CSS_SELECTOR, ".rubrica__button a")
                            personal_page_url = personal_page_link.get_attribute('href')
                            print(f"🔗 Found personal page: {personal_page_url}")
                            
                            # Navigate to personal page
                            print("🌐 Navigating to personal page...")
                            self.driver.get(personal_page_url)
                            time.sleep(3)
                            
                            # Handle cookie popup if it appears
                            print("🍪 Checking for cookie popup...")
                            try:
                                # Look for common cookie accept buttons
                                cookie_selectors = [
                                    "//button[contains(text(), 'ACCETTA TUTTI')]",
                                    "//button[contains(text(), 'Accept')]", 
                                    "//button[contains(text(), 'Accetta')]",
                                    "//button[contains(@class, 'cookie') and contains(text(), 'Accetta')]",
                                    "//button[contains(@id, 'cookie') and contains(text(), 'Accetta')]",
                                    "//*[contains(@class, 'cookie')]//button[contains(text(), 'Accetta')]"
                                ]
                                
                                cookie_accepted = False
                                for selector in cookie_selectors:
                                    try:
                                        cookie_button = self.driver.find_element(By.XPATH, selector)
                                        if cookie_button.is_displayed():
                                            print(f"🍪 Found cookie button: {cookie_button.text}")
                                            self.driver.execute_script("arguments[0].click();", cookie_button)
                                            time.sleep(1)
                                            print("✅ Cookie popup accepted")
                                            cookie_accepted = True
                                            break
                                    except:
                                        continue
                                
                                if not cookie_accepted:
                                    print("ℹ️ No cookie popup found or already handled")
                                    
                            except Exception as e:
                                print(f"⚠️ Error handling cookies: {e}")
                            
                            # Debug: Check what's available on the personal page
                            print("🔍 DEBUG: Checking personal page content...")
                            page_text = self.driver.page_source.lower()
                            
                            # Look for any teaching-related keywords
                            teaching_keywords = ['insegnamenti', 'teaching', 'corsi', 'courses', 'didattica']
                            found_keywords = [kw for kw in teaching_keywords if kw in page_text]
                            print(f"📚 Found teaching keywords: {found_keywords}")
                            
                            # Look for all links and buttons on the page
                            all_links = self.driver.find_elements(By.TAG_NAME, "a")
                            all_buttons = self.driver.find_elements(By.TAG_NAME, "button")
                            
                            print(f"🔗 Found {len(all_links)} links on personal page")
                            teaching_related_links = []
                            for i, link in enumerate(all_links):
                                link_text = link.text.strip().lower()
                                href = link.get_attribute('href') or ""
                                
                                # Look for teaching-related links
                                if any(keyword in link_text for keyword in teaching_keywords) or 'insegnament' in href.lower():
                                    teaching_related_links.append((link, link.text.strip(), href))
                                    print(f"   📚 Teaching link {len(teaching_related_links)}: '{link.text.strip()}' -> {href}")
                            
                            if not teaching_related_links:
                                # Show some general links to understand the page structure
                                for i, link in enumerate(all_links[:15]):
                                    link_text = link.text.strip()
                                    if link_text and len(link_text) > 2 and len(link_text) < 50:
                                        print(f"   Link {i+1}: '{link_text}'")
                            
                            print(f"🔘 Found {len(all_buttons)} buttons on personal page")
                            for i, btn in enumerate(all_buttons[:5]):  # Show first 5 buttons
                                btn_text = btn.text.strip()
                                if btn_text and len(btn_text) > 2:
                                    print(f"   Button {i+1}: '{btn_text}'")
                            
                            # Look for "Insegnamenti" tab with the exact Bootstrap structure
                            print("🔍 Looking for Insegnamenti tab...")
                            insegnamenti_selectors = [
                                "//li[@id='insegnamentiTab']//a",  # Exact ID match
                                "//li[contains(@id, 'insegnamentiTab')]//a",  # Partial ID match
                                "//a[@href='#insegnamenti' and @role='tab']",  # Bootstrap tab link
                                "//a[contains(@aria-controls, 'insegnamenti')]",  # ARIA controls
                                "//li[contains(@class, 'nav-item') and contains(@dataurl, 'insegnamenti')]//a",  # Bootstrap nav item
                                "//a[@data-bs-toggle='tab' and contains(text(), 'Insegnamenti')]",  # Bootstrap toggle
                                "//a[contains(text(), 'Insegnamenti') and contains(@class, 'nav-link')]",  # Nav link with text
                                "//a[contains(text(), 'Insegnamenti')]",  # Generic text match
                                "//button[contains(text(), 'Insegnamenti')]"
                            ]
                            
                            insegnamenti_tab = None
                            
                            # First try using the teaching links we found earlier
                            if teaching_related_links:
                                for link, link_text, href in teaching_related_links:
                                    if 'insegnamenti' in href.lower() and link_text.upper() == 'INSEGNAMENTI':
                                        try:
                                            if link.is_displayed():
                                                insegnamenti_tab = link
                                                print(f"✅ Found Insegnamenti tab from detected links: '{link_text}'")
                                                break
                                        except:
                                            continue
                            
                            # Fallback to xpath selectors
                            if not insegnamenti_tab:
                                for selector in insegnamenti_selectors:
                                    try:
                                        tab = self.driver.find_element(By.XPATH, selector)
                                        if tab.is_displayed():
                                            insegnamenti_tab = tab
                                            print(f"✅ Found Insegnamenti tab with selector: {selector}")
                                            break
                                    except:
                                        continue
                            
                            if insegnamenti_tab:
                                print("🔘 Clicking Insegnamenti tab...")
                                print(f"   Tab element: {insegnamenti_tab.get_attribute('outerHTML')[:200]}...")
                                
                                # Try multiple click methods for Bootstrap tabs
                                click_methods = [
                                    ("JavaScript click", lambda: self.driver.execute_script("arguments[0].click();", insegnamenti_tab)),
                                    ("Direct click", lambda: insegnamenti_tab.click()),
                                    ("Scroll and click", lambda: (
                                        self.driver.execute_script("arguments[0].scrollIntoView(true);", insegnamenti_tab),
                                        time.sleep(1),
                                        insegnamenti_tab.click()
                                    )),
                                    ("Bootstrap tab activation", lambda: self.driver.execute_script(
                                        "var tab = new bootstrap.Tab(arguments[0]); tab.show();", insegnamenti_tab
                                    ) if 'bootstrap' in self.driver.page_source else None)
                                ]
                                
                                tab_clicked = False
                                for method_name, click_func in click_methods:
                                    if click_func is None:
                                        continue
                                    try:
                                        print(f"   Trying {method_name}...")
                                        click_func()
                                        time.sleep(2)
                                        print(f"   ✅ {method_name} successful!")
                                        tab_clicked = True
                                        break
                                    except Exception as e:
                                        print(f"   ❌ {method_name} failed: {e}")
                                        continue
                                
                                if not tab_clicked:
                                    print("❌ All tab click methods failed!")
                                else:
                                    time.sleep(2)  # Additional wait for content to load
                                
                                # Look for course links in the teachings section
                                print(f"🔍 Looking for course '{target_course}' in Insegnamenti...")
                                
                                # Wait for the tab content to load
                                time.sleep(3)
                                
                                # Look for all course-related elements
                                course_elements = self.driver.find_elements(By.XPATH, "//*[contains(@href, 'coursecatalogue.cineca.it') or contains(text(), '{}')]".format(target_course.split()[0]))
                                print(f"📚 Found {len(course_elements)} course-related elements")
                                
                                # Also try to find all links and text that might contain course info
                                all_course_links = self.driver.find_elements(By.XPATH, "//a[contains(@href, 'coursecatalogue.cineca.it')]")
                                print(f"� Found {len(all_course_links)} total course catalogue links")
                                
                                # Check each course link for match
                                for i, link in enumerate(all_course_links):
                                    try:
                                        link_text = link.text.strip()
                                        link_href = link.get_attribute('href')
                                        print(f"   📖 Course {i+1}: '{link_text}' -> {link_href}")
                                        
                                        # If link text is empty, this might be a direct link to coursecatalogue
                                        # Let's click it and see if it matches our course
                                        if not link_text.strip() and 'coursecatalogue.cineca.it' in link_href:
                                            print("🔍 Found course catalogue link, clicking to check...")
                                            course_link = link_href
                                            print(f"🎯 USING COURSE CATALOGUE LINK: {course_link}")
                                            
                                            # Click on the course link to open it
                                            print("🔘 Clicking on course link...")
                                            self.driver.execute_script("arguments[0].click();", link)
                                            time.sleep(5)  # Wait for course page to load
                                            
                                            print(f"📍 Current URL: {self.driver.current_url}")
                                            course_link = self.driver.current_url  # Use actual URL after navigation
                                            break
                                        
                                        # More flexible matching - check for any word from target course
                                        target_words = target_course.lower().split()
                                        link_text_lower = link_text.lower()
                                        
                                        # Match if any significant word (length > 3) appears
                                        matches = [word for word in target_words if len(word) > 3 and word in link_text_lower]
                                        
                                        if matches or target_course.lower() in link_text_lower:
                                            course_link = link_href
                                            print(f"🎯 COURSE MATCH FOUND: '{link_text}'")
                                            print(f"🔗 Course link: {course_link}")
                                            
                                            # Click on the course link to open it
                                            print("🔘 Clicking on course link...")
                                            self.driver.execute_script("arguments[0].click();", link)
                                            time.sleep(5)  # Wait for course page to load
                                            
                                            print(f"� Current URL: {self.driver.current_url}")
                                            course_link = self.driver.current_url  # Use actual URL after navigation
                                            break
                                    except Exception as e:
                                        print(f"⚠️ Error processing course link {i+1}: {e}")
                                        continue
                                
                                if not course_link:
                                    print("⚠️ No matching course found in Insegnamenti")
                            else:
                                print("⚠️ Could not find Insegnamenti tab")
                                
                        except Exception as e:
                            print(f"⚠️ Error accessing personal page: {e}")
                        
                        break  # Found our professor, stop looking
                        
                except Exception as e:
                    print(f"⚠️ Error processing rubrica card {i+1}: {e}")
                    continue
            
            if email:
                print(f"✅ Successfully found professor email: {email}")
                if course_link:
                    print(f"✅ Successfully found course link: {course_link}")
                    # Extract textbook info if we have a course link
                    textbook_info = self.extract_testi_info()
                    return email, course_link, textbook_info
                return email, course_link, ""
            else:
                print("⚠️ No matching professor found in rubrica results")
                return "", "", ""
                
        except Exception as e:
            print(f"❌ Error in professor search: {e}")
            # Take screenshot for debugging
            try:
                self.driver.save_screenshot("rubrica_error.png")
                print("📸 Screenshot saved as rubrica_error.png")
            except:
                pass
            return "", "", ""
    
    def extract_testi_info(self) -> str:
        """Extract textbook information from Testi dropdown"""
        try:
            print("📖 Looking for Testi dropdown...")
            
            # Look for the Testi dropdown element - try multiple selectors
            testi_selectors = [
                "//dt[@class='open']//div[contains(text(), 'Testi')]",
                "//dt[contains(@class, 'open')]//div[text()='Testi']",
                "//*[contains(text(), 'Testi')]/..//i[@class='fa fa-chevron-down']",
                "//dt//div[contains(text(), 'Testi')]"
            ]
            
            testi_element = None
            for selector in testi_selectors:
                try:
                    elements = self.driver.find_elements(By.XPATH, selector)
                    if elements:
                        testi_element = elements[0]
                        print(f"✅ Found Testi element with selector: {selector}")
                        break
                except:
                    continue
            
            if testi_element:
                # Click on the Testi dropdown
                print("🔘 Clicking Testi dropdown...")
                self.driver.execute_script("arguments[0].click();", testi_element)
                time.sleep(2)
                
                # Look for the expanded content
                textbook_content = ""
                content_selectors = [
                    "//dt[contains(@class, 'open')]//following-sibling::dd",
                    "//dt//div[contains(text(), 'Testi')]/../following-sibling::dd",
                    "//*[contains(text(), 'Testi')]/../../following-sibling::dd"
                ]
                
                for selector in content_selectors:
                    try:
                        content_elements = self.driver.find_elements(By.XPATH, selector)
                        if content_elements:
                            textbook_content = content_elements[0].text.strip()
                            if textbook_content:
                                print(f"✅ Found textbook content: {textbook_content[:100]}...")
                                break
                    except:
                        continue
                
                return textbook_content
            else:
                print("⚠️ Testi dropdown not found")
                return ""
                
        except Exception as e:
            print(f"⚠️ Error extracting Testi info: {e}")
            return ""

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
            
            # Step 2: Get professor email, course link, and textbook info from personal page
            email, real_course_link, textbook_info = self.search_professor_email(
                course['professor'], 
                course['course_name']
            )
            
            # Use the link from professor's Insegnamenti if available, otherwise use schedule link
            final_course_link = real_course_link or course['course_link']
            
            # Step 3: Extract course details
            course_details = self.extract_course_details(final_course_link)
            
            # Compile final record
            record = {
                'Facoltà': course['department'],
                'Tipo di laurea': course_details.get('tipo_laurea', 'Laurea magistrale'),
                'Nome corso': course_details.get('nome_corso', course['course_name']),
                'Anno di corso': course_details.get('anno_corso', '1'),
                'Percorso del corso': course_details.get('percorso_corso', 'Comune'),
                'Nome Esame': course_details.get('nome_esame', course['course_name']),
                'Professore': course['professor'],
                'Mail professore': email,
                'Programmi e testi': textbook_info or course_details.get('programmi_testi', ''),
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
    print("🤖 UNIVERSITY OF MODENA WEB SCRAPING BOT - WORKING VERSION")
    print("="*60)
    
    bot = None
    try:
        # Initialize bot
        bot = UnimoreScrapingBot(headless=False)  # Set to True for headless mode
        
        # Process Economia department (just 1 course for testing)
        courses = bot.process_department('economia', start_record=11, max_courses=1)
        
        if courses:
            # Save results
            filename = "economia_complete_data.xlsx"
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