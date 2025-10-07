#!/usr/bin/env python3
"""
University of Modena Web Scraping Bot - Test Single Course
Simple focused version to test the complete workflow for one course
"""

import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import pandas as pd

class UnimoreTestBot:
    def __init__(self):
        self.driver = None
        self.setup_driver()
    
    def setup_driver(self):
        """Initialize Chrome WebDriver with stability options"""
        chrome_options = Options()
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")
        chrome_options.add_argument("--disable-blink-features=AutomationControlled")
        chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])
        chrome_options.add_experimental_option('useAutomationExtension', False)
        chrome_options.add_argument("--disable-extensions")
        chrome_options.add_argument("--disable-plugins")
        chrome_options.add_argument("--disable-images")
        chrome_options.add_argument("--window-size=1920,1080")
        
        try:
            self.driver = webdriver.Chrome(options=chrome_options)
            self.driver.execute_script("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})")
            print("✅ Chrome WebDriver initialized successfully")
        except Exception as e:
            print(f"❌ Failed to initialize Chrome WebDriver: {e}")
            raise

    def clean_text(self, text):
        """Clean text from unwanted characters and encoding issues"""
        if not text:
            return ""
        
        # Remove common problematic characters and normalize
        import re
        
        # Replace common Unicode issues
        text = text.replace('\u00a0', ' ')  # Non-breaking space
        text = text.replace('\u2013', '-')  # En dash
        text = text.replace('\u2014', '-')  # Em dash
        text = text.replace('\u2018', "'")  # Left single quote
        text = text.replace('\u2019', "'")  # Right single quote
        text = text.replace('\u201c', '"')  # Left double quote
        text = text.replace('\u201d', '"')  # Right double quote
        text = text.replace('\u2022', '•')  # Bullet point
        
        # Keep most characters, only remove problematic control characters
        text = re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f\x7f-\x84\x86-\x9f]', '', text)
        
        # Clean up multiple spaces and newlines
        text = re.sub(r'\s+', ' ', text)
        text = text.strip()
        
        return text

    def test_single_course(self):
        """Test the complete workflow for one course"""
        print("\n🚀 TESTING SINGLE COURSE WORKFLOW")
        print("=" * 50)
        
        # Test data - using the course we know exists
        professor_name = "Forni Mario"
        course_name = "Analisi dei dati"
        
        try:
            # Step 1: Search professor in rubrica
            print(f"\n📧 STEP 1: Searching professor '{professor_name}' in rubrica...")
            email = self.search_professor_rubrica(professor_name)
            
            if not email:
                print("❌ Could not find professor email")
                return
            
            # Step 2: Go to personal page and find Insegnamenti
            print(f"\n🔍 STEP 2: Finding professor's courses...")
            course_link = self.get_professor_course_link(professor_name)
            
            if not course_link:
                print("❌ Could not find course link")
                return
                
            # Step 3: Extract course details and Testi info
            print(f"\n📚 STEP 3: Extracting course details...")
            course_info = self.extract_course_info_and_testi()
            
            # Final result using REAL extracted data
            result = {
                'Facoltà': 'Economia',
                'Tipo di laurea': course_info['tipo_laurea'],
                'Nome corso': course_info['nome_corso'],
                'Anno di corso': course_info['anno_corso'],
                'Percorso del corso': course_info['percorso_corso'],
                'Nome Esame': course_name,  # Keep original course name from schedule
                'Professore': professor_name,
                'Mail professore': email,
                'Programmi e testi': course_info['textbook_info'],
                'Link corso': course_link
            }
            
            print("\n✅ SUCCESS! Complete course data:")
            for key, value in result.items():
                print(f"   {key}: {value}")
                
            return result
            
        except Exception as e:
            print(f"❌ Error in test: {e}")
            return None

    def search_professor_rubrica(self, professor_name):
        """Search professor in rubrica and get email"""
        try:
            # Navigate to rubrica (correct URL)
            print("🌐 Navigating to rubrica...")
            self.driver.get("https://www.unimore.it/it/rubrica")
            time.sleep(3)
            
            # Find and fill search form
            name_input = self.driver.find_element(By.XPATH, "//input[@name='name_1']")
            name_input.clear()
            name_input.send_keys(professor_name)
            print(f"⌨️ Entered professor name: {professor_name}")
            
            # Click search button
            search_button = self.driver.find_element(By.XPATH, "//button[@id='edit-submit-rubrica-role']")
            self.driver.execute_script("arguments[0].click();", search_button)
            print("🔘 Search submitted")
            time.sleep(5)  # Wait longer for results to load
            
            # Debug: Check current page content
            print(f"📍 Current URL: {self.driver.current_url}")
            page_content = self.driver.page_source
            if "rubrica__wrapper" in page_content:
                print("✅ Found rubrica wrapper in page")
            else:
                print("⚠️ No rubrica wrapper found")
                if "risultat" in page_content.lower():
                    print("✅ Found 'risultat' text in page")
                if "forni" in page_content.lower():
                    print("✅ Found 'forni' in page content")
            
            # Find professor card and extract email
            cards = self.driver.find_elements(By.CSS_SELECTOR, ".rubrica__wrapper")
            print(f"📋 Found {len(cards)} rubrica cards")
            
            for i, card in enumerate(cards):
                try:
                    name_elem = card.find_element(By.CSS_SELECTOR, ".rubrica__name")
                    card_name = name_elem.text.strip()
                    print(f"👤 Found professor {i+1}: {card_name}")
                    
                    # Check if this matches our professor
                    if professor_name.split()[1].upper() in card_name.upper():
                        print(f"✅ MATCH FOUND: {card_name}")
                        
                        # Extract email
                        try:
                            email_elem = card.find_element(By.CSS_SELECTOR, ".rubrica__email a")
                            email = email_elem.get_attribute('href').replace('mailto:', '')
                        except:
                            email_text = card.find_element(By.CSS_SELECTOR, ".rubrica__email").text.strip()
                            email = email_text.replace('E-mail: ', '') if 'E-mail:' in email_text else email_text
                        
                        print(f"📧 Extracted email: {email}")
                        
                        # Get personal page link
                        personal_link = card.find_element(By.CSS_SELECTOR, ".rubrica__button a")
                        self.personal_page_url = personal_link.get_attribute('href')
                        print(f"🔗 Found personal page: {self.personal_page_url}")
                        
                        return email
                        
                except Exception as e:
                    print(f"⚠️ Error processing card {i+1}: {e}")
                    continue
            
            return ""
            
        except Exception as e:
            print(f"❌ Error searching professor: {e}")
            return ""

    def get_professor_course_link(self, professor_name):
        """Navigate to professor's personal page and get course link"""
        try:
            # Navigate to personal page
            print("🌐 Going to personal page...")
            self.driver.get(self.personal_page_url)
            time.sleep(3)
            
            # Handle cookie popup
            try:
                cookie_button = self.driver.find_element(By.XPATH, "//button[contains(text(), 'Accetta')]")
                self.driver.execute_script("arguments[0].click();", cookie_button)
                print("🍪 Accepted cookies")
                time.sleep(2)
            except:
                pass
            
            # Find and click Insegnamenti tab
            insegnamenti_tab = self.driver.find_element(By.XPATH, "//a[@href='#insegnamenti']")
            self.driver.execute_script("arguments[0].click();", insegnamenti_tab)
            print("🔘 Clicked Insegnamenti tab")
            time.sleep(3)
            
            # Look for H3 tags containing our course name (case insensitive)
            target_course = "Analisi dei dati"  # Our target course
            print(f"🔍 Looking for H3 tags containing: '{target_course}'")
            
            # Find all H3 elements
            h3_elements = self.driver.find_elements(By.TAG_NAME, "h3")
            print(f"📚 Found {len(h3_elements)} H3 elements")
            
            course_found = False
            for i, h3 in enumerate(h3_elements):
                try:
                    h3_text = h3.text.strip()
                    print(f"   H3 {i+1}: '{h3_text}'")
                    
                    # Check if our course name is in this H3 (case insensitive)
                    if target_course.lower() in h3_text.lower():
                        print(f"🎯 FOUND MATCHING COURSE IN H3: '{h3_text}'")
                        
                        # Look for <a> tag INSIDE the H3
                        try:
                            child_link = h3.find_element(By.TAG_NAME, "a")
                            link_url = child_link.get_attribute('href')
                            print(f"🔗 Found child link inside H3: {link_url}")
                            print("🔘 Clicking on <a> tag inside H3...")
                            self.driver.execute_script("arguments[0].click();", child_link)
                        except:
                            # Fallback: click on H3 directly
                            print("🔘 No <a> inside H3, clicking H3 directly...")
                            self.driver.execute_script("arguments[0].click();", h3)
                        
                        time.sleep(5)
                        course_found = True
                        break
                        
                except Exception as e:
                    print(f"⚠️ Error reading H3 {i+1}: {e}")
                    continue
            
            if course_found:
                final_url = self.driver.current_url
                print(f"📍 Course page loaded: {final_url}")
                return final_url
            else:
                print("❌ No matching course found in H3 tags")
                return ""
            
            return ""
            
        except Exception as e:
            print(f"❌ Error getting course link: {e}")
            return ""

    def extract_course_info_and_testi(self):
        """Extract course information and textbook info from course page"""
        try:
            print("📚 Extracting course information from page...")
            
            # First, click on "Informazioni generali" dropdown
            print("🔘 Looking for Informazioni generali dropdown...")
            info_generali_selectors = [
                "//dt[contains(text(), 'Informazioni generali')]",
                "//*[contains(text(), 'Informazioni generali')]",
                "//dt//div[contains(text(), 'Informazioni generali')]"
            ]
            
            info_clicked = False
            for selector in info_generali_selectors:
                try:
                    info_elem = self.driver.find_element(By.XPATH, selector)
                    print("✅ Found Informazioni generali dropdown")
                    print("🔘 Clicking Informazioni generali dropdown...")
                    self.driver.execute_script("arguments[0].click();", info_elem)
                    time.sleep(3)
                    info_clicked = True
                    break
                except:
                    continue
            
            if not info_clicked:
                print("⚠️ Could not find Informazioni generali dropdown")
            
            # Extract course details from the page
            course_info = {
                'nome_corso': '',
                'tipo_laurea': '',
                'anno_corso': '',
                'percorso_corso': '',
                'textbook_info': ''
            }
            
            # IMPORTANT: Extract ALL data from Informazioni generali dropdown BEFORE clicking anything else
            # This is because clicking other dropdowns closes this one!
            print("📋 Extracting ALL data using generic dt/dd parser...")
            
            # Generic parser for all dt[@title] + dd pairs
            extracted_data = {}
            try:
                dt_elements = self.driver.find_elements(By.XPATH, "//dt[@title]")
                print(f"🔍 Found {len(dt_elements)} dt elements with title attributes")
                
                for dt in dt_elements:
                    try:
                        title = dt.get_attribute('title').strip()
                        # Find the next dd sibling
                        dd = self.driver.execute_script("""
                            var dt = arguments[0];
                            var nextSibling = dt.nextElementSibling;
                            while (nextSibling && nextSibling.tagName.toLowerCase() !== 'dd') {
                                nextSibling = nextSibling.nextElementSibling;
                            }
                            return nextSibling;
                        """, dt)
                        
                        if dd:
                            # Get clean text content, handling links and spans inside dd
                            value = self.driver.execute_script("""
                                var dd = arguments[0];
                                // Try to get text from child elements first (a, span)
                                var childElements = dd.querySelectorAll('a, span');
                                if (childElements.length > 0) {
                                    var texts = [];
                                    for (var i = 0; i < childElements.length; i++) {
                                        var text = childElements[i].textContent.trim();
                                        if (text) texts.push(text);
                                    }
                                    return texts.join(' ');
                                }
                                // Fallback to dd text content
                                return dd.textContent.trim();
                            """, dd)
                            
                            # Clean the extracted text
                            if value:
                                value = self.clean_text(value)
                            
                            if value:
                                extracted_data[title] = value
                                print(f"✅ {title}: {value}")
                            else:
                                print(f"⚠️ Empty value for {title}")
                        else:
                            print(f"⚠️ No dd found for {title}")
                            
                    except Exception as e:
                        print(f"⚠️ Error processing dt element: {e}")
                        continue
                        
            except Exception as e:
                print(f"❌ Error in generic parser: {e}")
            
            # Map extracted data to our course_info structure
            course_info['nome_corso'] = extracted_data.get('Corso di studi', '')
            course_info['tipo_laurea'] = extracted_data.get('Tipo di corso', '')
            course_info['anno_corso'] = extracted_data.get('Anno di corso', '')
            
            # For percorso_corso, prefer "Percorso" but fall back to "Tipo Attività Formativa"
            course_info['percorso_corso'] = (
                extracted_data.get('Percorso', '') or 
                extracted_data.get('Tipo Attività Formativa', '')
            )
            
            print(f"📊 MAPPED RESULTS:")
            print(f"   📚 Nome corso: '{course_info['nome_corso']}'")
            print(f"   🎓 Tipo laurea: '{course_info['tipo_laurea']}'")
            print(f"   📅 Anno corso: '{course_info['anno_corso']}'")
            print(f"   🛤️ Percorso corso: '{course_info['percorso_corso']}'")
            
            print("✅ FINISHED extracting from Informazioni generali dropdown")
            print("🔄 Now looking for Testi dropdown (this will close Informazioni generali)...")
            
            # Now extract Testi information - this will close the Informazioni generali dropdown
            print("📖 Looking for Testi dropdown...")
            testi_selectors = [
                "//dt[@class='open']//div[contains(text(), 'Testi')]",
                "//dt//div[text()='Testi']",
                "//*[contains(text(), 'Testi')]",
                "//dt[contains(., 'Testi')]"
            ]
            
            testi_element = None
            for selector in testi_selectors:
                try:
                    elements = self.driver.find_elements(By.XPATH, selector)
                    if elements:
                        testi_element = elements[0]
                        print(f"✅ Found Testi element")
                        break
                except:
                    continue
            
            if testi_element:
                # Click on Testi dropdown
                print("🔘 Clicking Testi dropdown...")
                self.driver.execute_script("arguments[0].click();", testi_element)
                time.sleep(3)
                
                # Look for expanded content
                content_selectors = [
                    "//dd[preceding-sibling::dt[contains(., 'Testi')]]",
                    "//*[contains(text(), 'Testi')]/following::dd[1]",
                    "//dt[contains(., 'Testi')]/following-sibling::dd[1]"
                ]
                
                for selector in content_selectors:
                    try:
                        content_elements = self.driver.find_elements(By.XPATH, selector)
                        if content_elements:
                            textbook_content = content_elements[0].text.strip()
                            if textbook_content:
                                # Clean textbook content
                                course_info['textbook_info'] = self.clean_text(textbook_content)
                                print(f"✅ Found textbook info: {textbook_content[:100]}...")
                                break
                    except:
                        continue
            
            return course_info
            
        except Exception as e:
            print(f"❌ Error extracting course info: {e}")
            return {
                'nome_corso': '',
                'tipo_laurea': '',
                'anno_corso': '',
                'percorso_corso': '',
                'textbook_info': ''
            }

    def close(self):
        """Close the browser"""
        if self.driver:
            self.driver.quit()
            print("🔒 Browser closed")

def main():
    bot = UnimoreTestBot()
    try:
        result = bot.test_single_course()
        if result:
            # Clean all result values before saving
            cleaned_result = {}
            for key, value in result.items():
                cleaned_result[key] = bot.clean_text(str(value)) if value else ""
            
            # Save to CSV with proper UTF-8 encoding and timestamp to avoid permission issues
            import datetime
            timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f'course_data_clean_{timestamp}.csv'
            
            df = pd.DataFrame([cleaned_result])
            df.to_csv(filename, index=False, encoding='utf-8-sig')
            print(f"\n💾 Data saved to {filename} with clean encoding")
        else:
            print("\n❌ Test failed")
    finally:
        bot.close()

if __name__ == "__main__":
    main()