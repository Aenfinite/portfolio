#!/usr/bin/env python3
"""
Complete University of Modena Web Scraping Bot
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
        """Step 2: Search professor in rubrica and find course link"""
        print(f"\n📧 STEP 2: Searching professor email for {professor_name}")
        
        # Handle multiple professors - take the first one
        main_professor = professor_name.split('/')[0].strip()
        print(f"Searching for main professor: {main_professor}")
        
        try:
            # Try direct search URL approach first
            print("🌐 Trying direct search URL approach...")
            search_query = main_professor.replace(" ", "%20")
            direct_search_url = f"https://www.unimore.it/it/search/node?keys={search_query}"
            
            print(f"🔍 Searching directly: {direct_search_url}")
            self.driver.get(direct_search_url)
            time.sleep(5)
            
            # Check if we got results on this page
            page_content = self.driver.page_source.lower()
            professor_found = any(name.lower() in page_content for name in main_professor.split())
            
            if professor_found:
                print("✅ Found professor content in direct search, proceeding...")
                # Skip the form interaction and go straight to results processing
            else:
                print("⚠️ Direct search didn't work, trying rubrica form...")
                # Navigate to rubrica with retry
                print("🌐 Navigating to rubrica page...")
                self.driver.get("https://www.unimore.it/it/rubrica")
                time.sleep(5)  # Longer wait for page load
                # Try form search as fallback
                try:
                    search_field = self.driver.find_element(By.XPATH, "//input[@type='text']")
                    search_field.clear()
                    search_field.send_keys(main_professor)
                    
                    search_button = self.driver.find_element(By.XPATH, "//button[@value='Cerca' and @type='submit']")
                    self.driver.execute_script("arguments[0].click();", search_button)
                    time.sleep(5)
                    
                    # Update the professor_found flag
                    page_content = self.driver.page_source.lower()
                    professor_found = any(name.lower() in page_content for name in main_professor.split())
                    
                except Exception as e:
                    print(f"⚠️ Form search failed: {e}")
                    professor_found = False            if search_field:
                print(f"✅ Found search field, entering professor name: {main_professor}")
                search_field.clear()
                time.sleep(1)
                search_field.send_keys(main_professor)
                time.sleep(2)
                
                # Try to find and click search button
                search_button = None
                button_selectors = [
                    (By.XPATH, "//button[@value='Cerca' and @type='submit']"),  # Exact match for the Drupal button
                    (By.CSS_SELECTOR, "button[value='Cerca'][type='submit']"),  # CSS version of exact match
                    (By.CSS_SELECTOR, "button.btn.btn-primary[value='Cerca']"),  # With Bootstrap classes
                    (By.XPATH, "//button[contains(@data-drupal-selector, 'edit-submit-rubrica')]"),  # Drupal selector
                    (By.XPATH, "//button[contains(@id, 'edit-submit-rubrica')]"),  # Drupal ID pattern
                    (By.XPATH, "//button[contains(text(), 'Cerca')]"),
                    (By.XPATH, "//input[@value='Cerca']"),
                    (By.XPATH, "//input[@type='submit']"),
                    (By.XPATH, "//button[@type='submit']")
                ]
                
                for selector_type, selector_value in button_selectors:
                    try:
                        search_button = self.driver.find_element(selector_type, selector_value)
                        print(f"✅ Found search button with selector: {selector_type} = {selector_value}")
                        break
                    except:
                        continue
                
                if search_button:
                    print(f"🔘 Clicking search button: {search_button.get_attribute('id')}")
                    try:
                        # For Drupal submit buttons, scroll into view first
                        self.driver.execute_script("arguments[0].scrollIntoView(true);", search_button)
                        time.sleep(1)
                        
                        # Method 1: Try direct click first
                        search_button.click()
                        print("✅ Direct click successful")
                    except Exception as e1:
                        print(f"⚠️ Direct click failed: {e1}")
                        try:
                            # Method 2: Wait for element to be clickable then click
                            clickable_button = self.wait.until(EC.element_to_be_clickable(search_button))
                            clickable_button.click()
                            print("✅ Clickable element click successful")
                        except Exception as e2:
                            print(f"⚠️ Clickable element click failed: {e2}")
                            try:
                                # Method 3: JavaScript click
                                self.driver.execute_script("arguments[0].click();", search_button)
                                print("✅ JavaScript click successful")
                            except Exception as e3:
                                print(f"⚠️ JavaScript click failed: {e3}")
                                try:
                                    # Method 4: Submit the form instead (for Drupal forms)
                                    search_field.submit()
                                    print("✅ Form submit successful")
                                except Exception as e4:
                                    print(f"❌ All click methods failed: {e4}")
                                    return "", ""
                    
                    time.sleep(5)
                    
                    print("🔍 Looking for professor profile results...")
                    
                    # Check if we got redirected to generic search
                    current_url = self.driver.current_url
                    print(f"🌐 Current URL after search: {current_url}")
                    
                    if "search/node?keys=" in current_url:
                        print("⚠️ Got redirected to generic search page, trying alternative approach...")
                        # Go back to rubrica and try a different search method
                        self.driver.get("https://www.unimore.it/it/rubrica")
                        time.sleep(3)
                        
                        # Try the modal search instead
                        try:
                            modal_search = self.driver.find_element(By.NAME, "keys")  # The search field we saw in debug
                            modal_search.clear()
                            modal_search.send_keys(main_professor)
                            modal_search.submit()  # Submit this form instead
                            time.sleep(5)
                            current_url = self.driver.current_url
                            print(f"🌐 URL after modal search: {current_url}")
                        except Exception as e:
                            print(f"⚠️ Modal search failed: {e}")
                    
                    # Wait for search results to load properly
                    try:
                        # Wait for the page to update after search
                        self.wait.until(lambda driver: driver.execute_script("return document.readyState") == "complete")
                        time.sleep(2)  # Additional wait for dynamic content
                        
                        print("🔍 DEBUG: Checking search results...")
                        
                        # Check what page we're actually on
                        final_url = self.driver.current_url
                        page_title = self.driver.title
                        print(f"📄 Final page title: {page_title}")
                        print(f"🌐 Final URL: {final_url}")
                        
                        # Check if we have search results
                        page_content = self.driver.page_source.lower()
                        if "nessun risultato" in page_content or "no results" in page_content:
                            print("⚠️ No search results found for professor")
                            return "", ""
                        
                        # If we're on the generic search page, look for professor results there
                        if "search/node" in final_url:
                            print("🔍 On generic search page, looking for professor results...")
                            # Look for any professor-related content
                            professor_indicators = [
                                "docente", "professore", "prof.", 
                                main_professor.split()[0].lower(), 
                                main_professor.split()[-1].lower()
                            ]
                            
                            found_professor_content = any(indicator in page_content for indicator in professor_indicators)
                            if not found_professor_content:
                                print("⚠️ No professor-related content found on search page")
                                return "", ""
                        
                        # Look for professor results in the specific rubrica structure
                        print("🔍 Looking for professor results in rubrica structure...")
                        
                        # Look for the specific rubrica results structure
                        professor_cards = self.driver.find_elements(By.CSS_SELECTOR, ".rubrica__wrapper")
                        print(f"� Found {len(professor_cards)} professor cards")
                        
                        email = ""
                        professor_name_found = ""
                        
                        # Check each professor card
                        for card in professor_cards:
                            try:
                                # Get the professor name from the card
                                name_element = card.find_element(By.CSS_SELECTOR, ".rubrica__name")
                                card_professor_name = name_element.text.strip()
                                print(f"👤 Found professor: {card_professor_name}")
                                
                                # Check if this matches our target professor
                                professor_names = main_professor.split()
                                card_name_lower = card_professor_name.lower()
                                
                                # Check if at least 2 name parts match (to handle different name orders)
                                matching_names = [name for name in professor_names if name.lower() in card_name_lower and len(name) > 2]
                                
                                if len(matching_names) >= 2 or main_professor.lower() in card_name_lower:
                                    print(f"✅ MATCH FOUND: {card_professor_name}")
                                    professor_name_found = card_professor_name
                                    
                                    # Extract email from this card
                                    try:
                                        email_element = card.find_element(By.CSS_SELECTOR, ".rubrica__email a")
                                        email = email_element.get_attribute('href').replace('mailto:', '')
                                        print(f"📧 Extracted email: {email}")
                                        break
                                    except Exception as e:
                                        print(f"⚠️ Could not extract email from card: {e}")
                                        
                                        # Try alternative email extraction
                                        try:
                                            email_text = card.find_element(By.CSS_SELECTOR, ".rubrica__email").text.strip()
                                            if '@' in email_text:
                                                email = email_text
                                                print(f"📧 Extracted email (text): {email}")
                                                break
                                        except:
                                            pass
                                            
                            except Exception as e:
                                print(f"⚠️ Error processing professor card: {e}")
                                continue
                        
                        if email:
                            print(f"✅ Successfully found professor email: {email}")
                            
                            # Try to find the professor's personal page link for course information
                            course_link = ""
                            try:
                                for card in professor_cards:
                                    name_element = card.find_element(By.CSS_SELECTOR, ".rubrica__name")
                                    if professor_name_found in name_element.text:
                                        # Look for "Pagina personale" link
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
                                        break
                                        
                            except Exception as e:
                                print(f"⚠️ Error finding personal page: {e}")
                            
                            return email, course_link
                        
                        else:
                            print("⚠️ No matching professor found in rubrica results")
                            
                        # Fallback: Show what we found for debugging
                        potential_profiles = []
                        
                        if potential_profiles:
                            profile_links = potential_profiles
                            print(f"✅ Found {len(profile_links)} potential professor profiles")
                        else:
                            print("🔍 No obvious matches found, trying specific selectors...")
                            # Try specific selectors for professor links
                            profile_selectors = [
                                f"//a[contains(@href, '/docente/') and contains(text(), '{main_professor.split()[0]}')]",  # Professor URL with first name
                                f"//a[contains(@href, '/docente/') and contains(text(), '{main_professor.split()[-1]}')]",  # Professor URL with last name
                                f"//a[contains(text(), '{main_professor}')]",  # Full name match
                                f"//a[contains(text(), '{main_professor.split()[0]}') and contains(text(), '{main_professor.split()[-1]}')]",  # Both names
                                "//a[contains(@href, '/docente/') and not(contains(@href, 'facebook')) and not(contains(@href, 'twitter'))]",  # Any docente link but not social media
                            ]
                            
                            profile_links = []
                            for selector in profile_selectors:
                                try:
                                    links = self.driver.find_elements(By.XPATH, selector)
                                    # Filter out non-professor links
                                    valid_links = []
                                    for link in links:
                                        href = link.get_attribute('href')
                                        if href and 'docente' in href and 'facebook' not in href and 'twitter' not in href:
                                            valid_links.append(link)
                                    
                                    if valid_links:
                                        profile_links = valid_links
                                        print(f"✅ Found {len(valid_links)} valid profile links with selector: {selector}")
                                        break
                                except Exception as e:
                                    print(f"⚠️ Selector {selector} failed: {e}")
                                    continue
                        
                    except Exception as e:
                        print(f"⚠️ Error waiting for search results: {e}")
                        profile_links = []
                    
                    if profile_links:
                        print(f"🎯 Found {len(profile_links)} profile links")
                        
                        # Get the best profile link (first one)
                        best_profile = profile_links[0]
                        profile_href = best_profile.get_attribute('href')
                        profile_text = best_profile.text.strip()
                        
                        print(f"🎯 Profile text: '{profile_text}'")
                        print(f"🎯 Profile href: {profile_href}")
                        
                        # Method 1: Direct navigation to profile URL (most reliable)
                        if profile_href and profile_href != "https://www.unimore.it/it/docente":
                            try:
                                print(f"🌐 Navigating directly to profile: {profile_href}")
                                self.driver.get(profile_href)
                                time.sleep(3)
                                print("✅ Successfully navigated to profile page")
                            except Exception as e:
                                print(f"⚠️ Direct navigation failed: {e}")
                                return "", ""
                        else:
                            # Method 2: Try clicking if direct navigation not possible
                            try:
                                # Scroll to element first
                                self.driver.execute_script("arguments[0].scrollIntoView(true);", best_profile)
                                time.sleep(1)
                                
                                # Wait for element to be clickable
                                clickable_profile = self.wait.until(
                                    EC.element_to_be_clickable(best_profile)
                                )
                                
                                # Click using JavaScript
                                self.driver.execute_script("arguments[0].click();", clickable_profile)
                                time.sleep(3)
                                print("✅ Successfully clicked profile link")
                                
                            except Exception as e:
                                print(f"❌ Profile click failed: {e}")
                                return "", ""
                        
                        # Extract email from profile page
                        email = ""
                        email_selectors = [
                            "//a[contains(@href, 'mailto:')]",
                            "//a[starts-with(@href, 'mailto:')]",
                            "//*[contains(text(), '@unimore.it')]",
                            "//*[contains(text(), '@')]"
                        ]
                        
                        for selector in email_selectors:
                            try:
                                email_elements = self.driver.find_elements(By.XPATH, selector)
                                for elem in email_elements:
                                    href = elem.get_attribute('href')
                                    if href and 'mailto:' in href:
                                        email = href.replace('mailto:', '')
                                        break
                                    elif '@unimore.it' in elem.text:
                                        email = elem.text.strip()
                                        break
                                if email:
                                    break
                            except:
                                continue
                        
                        print(f"📧 Found email: {email}")
                        
                        # Try to find course link from Insegnamenti tab
                        course_link = ""
                        try:
                            print("🔍 Looking for Insegnamenti tab...")
                            insegnamenti_selectors = [
                                "//a[contains(text(), 'Insegnamenti')]",
                                "//a[contains(text(), 'insegnamenti')]",
                                "//a[contains(text(), 'Courses')]",
                                "//a[contains(text(), 'Teaching')]",
                                "//li[contains(@class, 'insegnamenti')]//a",
                                "//tab[contains(text(), 'Insegnamenti')]"
                            ]
                            
                            insegnamenti_tab = None
                            for selector in insegnamenti_selectors:
                                try:
                                    tab = self.driver.find_element(By.XPATH, selector)
                                    if tab.is_displayed():
                                        insegnamenti_tab = tab
                                        print(f"✅ Found Insegnamenti tab: {selector}")
                                        break
                                except:
                                    continue
                            
                            if insegnamenti_tab:
                                insegnamenti_tab.click()
                                time.sleep(3)
                                
                                # Look for course links
                                course_links = self.driver.find_elements(By.XPATH, "//a[contains(@href, 'coursecatalogue.cineca.it')]")
                                
                                for link in course_links:
                                    link_text = link.text.lower()
                                    # Check if course name matches
                                    target_words = target_course.lower().split()[:3]  # First 3 words
                                    if any(word in link_text for word in target_words if len(word) > 3):
                                        course_link = link.get_attribute('href')
                                        print(f"🎯 Found matching course link: {course_link}")
                                        break
                            else:
                                print("⚠️ Could not find Insegnamenti tab")
                                
                        except Exception as e:
                            print(f"⚠️ Error finding course link: {e}")
                        
                        return email, course_link
                    else:
                        print("⚠️ No professor profiles found in search results")
                        return "", ""
                else:
                    print("❌ Could not find search button")
                    return "", ""
            else:
                print("❌ Could not find search field on rubrica page")
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
                        # Here you could add ISBN search functionality
                        
            except Exception as e:
                print(f"⚠️ Error extracting textbooks: {e}")
            
            print(f"✅ Extracted course details: {details['nome_esame']}")
            return details
            
        except Exception as e:
            print(f"❌ Error extracting course details: {e}")
            return details
    
    def search_isbn_on_libreria(self, book_title: str, author: str) -> str:
        """Step 5: Search for ISBN on libreriauniversitaria.it"""
        print(f"\n📖 STEP 5: Searching ISBN for '{book_title}' by {author}")
        
        try:
            search_query = f"{book_title} {author}".strip()
            search_url = f"https://www.libreriauniversitaria.it/ricerca?q={search_query.replace(' ', '+')}"
            
            self.driver.get(search_url)
            time.sleep(3)
            
            # Look for ISBN/EAN patterns
            page_text = self.driver.page_source
            isbn_matches = re.findall(r'(?:ISBN|EAN)[:\s]*(\d{13}|\d{10})', page_text, re.IGNORECASE)
            
            if isbn_matches:
                return isbn_matches[0]
            
        except Exception as e:
            print(f"⚠️ Error searching ISBN: {e}")
        
        return ""
    
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
    print("🤖 UNIVERSITY OF MODENA WEB SCRAPING BOT")
    print("="*60)
    
    bot = None
    try:
        # Initialize bot
        bot = UnimoreScrapingBot(headless=False)  # Set to True for headless mode
        
        # Process Economia department (just 1 course for testing)
        courses = bot.process_department('economia', start_record=11, max_courses=1)
        
        if courses:
            # Save results
            filename = "economia_real_data.xlsx"
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