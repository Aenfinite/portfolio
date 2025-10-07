#!/usr/bin/env python3
"""
University of Modena Web Scraping Bot - Production Version
Processes multiple courses automatically from schedule data
"""

import time
import datetime
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import pandas as pd
import re

class UnimoreProductionBot:
    def __init__(self):
        self.driver = None
        self.setup_driver()
        self.results = []
        self.processed_count = 0
        self.target_count = None  # Process ALL courses in the department
    
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

    def get_schedule_data(self):
        """Get course data from schedule pages (Economia department, records 11+)"""
        print("\n📅 STEP 1: Loading schedule data from Economia department...")
        
        # Navigate to Economia schedule - the correct department URL
        schedule_url = "https://www.orariolezioni.unimore.it/Orario/Dipartimento_di_Economia_Marco_Biagi/2025-2026/2270/ttHtml.html"
        
        self.driver.get(schedule_url)
        time.sleep(5)
        
        courses_data = []
        
        try:
            # Find all table rows (based on the real_extractor.py structure)
            rows = self.driver.find_elements(By.TAG_NAME, "tr")
            print(f"� Found {len(rows)} total rows in page")
            
            # Process records starting from row 11 as specified
            processed_count = 0
            total_professor_records = 0
            
            for row in rows:
                try:
                    cells = row.find_elements(By.TAG_NAME, "td")
                    if len(cells) < 6:  # Need at least 6 columns based on real_extractor structure
                        continue
                    
                    # Get row number from first cell
                    row_num_text = cells[0].text.strip()
                    if not row_num_text.isdigit():
                        continue
                    
                    row_num = int(row_num_text)
                    if row_num < 11:  # Start from record 11 as specified
                        continue
                    
                    # Extract course data based on real_extractor.py structure:
                    # Column 0: Row number
                    # Column 1: Course name  
                    # Column 2: Course study (contains links)
                    # Column 3: Credits
                    # Column 4: Professor
                    course_name = cells[1].text.strip()
                    professor_name = cells[4].text.strip()
                    
                    if course_name and professor_name:
                        # Keep all professors in the name but only extract data from main professor (first one)
                        professors = [prof.strip() for prof in professor_name.split('/')]
                        main_professor = professors[0] if professors else professor_name  # First professor is main
                        
                        print(f"   📚 Row {row_num}: '{course_name}' - All professors: '{professor_name}'")
                        print(f"      🎯 Main professor (for data extraction): '{main_professor}'")
                        
                        courses_data.append({
                            'course_name': course_name,
                            'professor_name': professor_name,  # Keep ALL professors in name
                            'main_professor': main_professor,   # Only main professor for extraction
                            'row_number': row_num
                        })
                        total_professor_records += 1
                        
                except Exception as e:
                    continue
                    
        except Exception as e:
            print(f"❌ Error loading schedule data: {e}")
            return []
        
        print(f"✅ Extracted {len(courses_data)} course records from {processed_count} course rows")
        print(f"📊 Will process ALL {len(courses_data)} courses from the entire Economia department")
        print(f"👥 Note: All professors listed, but data extracted only from main professor (first one)")
        return courses_data

    def clean_professor_name(self, professor_name):
        """Clean professor name by removing titles and extra text"""
        if not professor_name:
            return ""
        
        # Remove common titles and prefixes
        name = professor_name.strip()
        name = re.sub(r'^(Prof\.?\s*|Dott\.?\s*|Dr\.?\s*)', '', name, flags=re.IGNORECASE)
        name = re.sub(r'\s*\([^)]*\)\s*', '', name)  # Remove text in parentheses
        name = name.strip()
        
        return name

    def search_professor_rubrica(self, professor_name):
        """Search professor in rubrica and get email + personal page URL"""
        try:
            # Clean the professor name first
            clean_name = self.clean_professor_name(professor_name)
            print(f"📧 Searching professor '{clean_name}' in rubrica...")
            
            # Navigate to rubrica
            self.driver.get("https://www.unimore.it/it/rubrica")
            time.sleep(3)
            
            # Find and fill search form
            name_input = self.driver.find_element(By.XPATH, "//input[@name='name_1']")
            name_input.clear()
            name_input.send_keys(clean_name)
            
            # Click search button
            search_button = self.driver.find_element(By.XPATH, "//button[@id='edit-submit-rubrica-role']")
            self.driver.execute_script("arguments[0].click();", search_button)
            time.sleep(5)
            
            # Find professor card and extract email
            cards = self.driver.find_elements(By.CSS_SELECTOR, ".rubrica__wrapper")
            
            for card in cards:
                try:
                    name_elem = card.find_element(By.CSS_SELECTOR, ".rubrica__name")
                    card_name = name_elem.text.strip()
                    
                    # Check if this matches our professor (more flexible matching)
                    professor_parts = clean_name.split()
                    if len(professor_parts) >= 2:
                        surname = professor_parts[-1].upper()  # Last name
                        if surname in card_name.upper():
                            print(f"✅ MATCH FOUND: {card_name}")
                            
                            # Extract email
                            try:
                                email_elem = card.find_element(By.CSS_SELECTOR, ".rubrica__email a")
                                email = email_elem.get_attribute('href').replace('mailto:', '')
                            except:
                                email_text = card.find_element(By.CSS_SELECTOR, ".rubrica__email").text.strip()
                                email = email_text.replace('E-mail: ', '') if 'E-mail:' in email_text else email_text
                            
                            # Get personal page link
                            personal_link = card.find_element(By.CSS_SELECTOR, ".rubrica__button a")
                            personal_page_url = personal_link.get_attribute('href')
                            
                            return {
                                'email': email,
                                'personal_page_url': personal_page_url
                            }
                            
                except Exception as e:
                    continue
            
            print(f"⚠️ Professor {clean_name} not found in rubrica")
            return None
            
        except Exception as e:
            print(f"❌ Error searching professor {clean_name}: {e}")
            return None

    def get_professor_course_link(self, personal_page_url, target_course):
        """Navigate to professor's personal page and get course link"""
        try:
            print(f"🔍 Getting course link from personal page...")
            
            # Navigate to personal page
            self.driver.get(personal_page_url)
            time.sleep(3)
            
            # Handle cookie popup
            try:
                cookie_button = self.driver.find_element(By.XPATH, "//button[contains(text(), 'Accetta')]")
                self.driver.execute_script("arguments[0].click();", cookie_button)
                time.sleep(2)
            except:
                pass
            
            # Find and click Insegnamenti tab
            insegnamenti_tab = self.driver.find_element(By.XPATH, "//a[@href='#insegnamenti']")
            self.driver.execute_script("arguments[0].click();", insegnamenti_tab)
            time.sleep(3)
            
            # Look for H3 tags containing course name parts
            print(f"🔍 Looking for course containing: '{target_course}'")
            
            h3_elements = self.driver.find_elements(By.TAG_NAME, "h3")
            
            # Try to match course name with H3 content
            course_words = target_course.lower().split()
            best_match = None
            max_matches = 0
            
            for h3 in h3_elements:
                try:
                    h3_text = h3.text.strip().lower()
                    
                    # Count how many words from the course name appear in this H3
                    matches = sum(1 for word in course_words if len(word) > 2 and word in h3_text)
                    
                    if matches > max_matches:
                        max_matches = matches
                        best_match = h3
                        
                except Exception as e:
                    continue
            
            if best_match and max_matches > 0:
                print(f"🎯 BEST MATCH: '{best_match.text.strip()}' ({max_matches} word matches)")
                
                # Click on the best matching H3
                try:
                    child_link = best_match.find_element(By.TAG_NAME, "a")
                    self.driver.execute_script("arguments[0].click();", child_link)
                except:
                    self.driver.execute_script("arguments[0].click();", best_match)
                
                time.sleep(5)
                return self.driver.current_url
            else:
                print("❌ No matching course found in H3 tags")
                return None
                
        except Exception as e:
            print(f"❌ Error getting course link: {e}")
            return None

    def extract_course_info_and_testi(self):
        """Extract course information and textbook info from course page"""
        try:
            print("📚 Extracting course information...")
            
            # Click on "Informazioni generali" dropdown
            info_generali_selectors = [
                "//dt[contains(text(), 'Informazioni generali')]",
                "//*[contains(text(), 'Informazioni generali')]",
                "//dt//div[contains(text(), 'Informazioni generali')]"
            ]
            
            info_clicked = False
            for selector in info_generali_selectors:
                try:
                    info_elem = self.driver.find_element(By.XPATH, selector)
                    self.driver.execute_script("arguments[0].click();", info_elem)
                    time.sleep(3)
                    info_clicked = True
                    break
                except:
                    continue
            
            course_info = {
                'nome_corso': '',
                'tipo_laurea': '',
                'anno_corso': '',
                'percorso_corso': '',
                'textbook_info': ''
            }
            
            if info_clicked:
                # Generic parser for all dt[@title] + dd pairs
                extracted_data = {}
                try:
                    dt_elements = self.driver.find_elements(By.XPATH, "//dt[@title]")
                    
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
                                # Get clean text content from child elements
                                value = self.driver.execute_script("""
                                    var dd = arguments[0];
                                    var childElements = dd.querySelectorAll('a, span');
                                    if (childElements.length > 0) {
                                        var texts = [];
                                        for (var i = 0; i < childElements.length; i++) {
                                            var text = childElements[i].textContent.trim();
                                            if (text) texts.push(text);
                                        }
                                        return texts.join(' ');
                                    }
                                    return dd.textContent.trim();
                                """, dd)
                                
                                if value:
                                    value = self.clean_text(value)
                                    extracted_data[title] = value
                                    
                        except Exception as e:
                            continue
                            
                except Exception as e:
                    print(f"⚠️ Error in generic parser: {e}")
                
                # Map extracted data
                course_info['nome_corso'] = extracted_data.get('Corso di studi', '')
                course_info['tipo_laurea'] = extracted_data.get('Tipo di corso', '')
                course_info['anno_corso'] = extracted_data.get('Anno di corso', '')
                course_info['percorso_corso'] = (
                    extracted_data.get('Percorso', '') or 
                    extracted_data.get('Tipo Attività Formativa', '')
                )
            
            # Extract Testi information
            testi_selectors = [
                "//dt[@class='open']//div[contains(text(), 'Testi')]",
                "//dt//div[text()='Testi']",
                "//*[contains(text(), 'Testi')]",
                "//dt[contains(., 'Testi')]"
            ]
            
            for selector in testi_selectors:
                try:
                    elements = self.driver.find_elements(By.XPATH, selector)
                    if elements:
                        testi_element = elements[0]
                        self.driver.execute_script("arguments[0].click();", testi_element)
                        time.sleep(3)
                        
                        # Look for expanded content
                        content_selectors = [
                            "//dd[preceding-sibling::dt[contains(., 'Testi')]]",
                            "//*[contains(text(), 'Testi')]/following::dd[1]",
                            "//dt[contains(., 'Testi')]/following-sibling::dd[1]"
                        ]
                        
                        for content_selector in content_selectors:
                            try:
                                content_elements = self.driver.find_elements(By.XPATH, content_selector)
                                if content_elements:
                                    textbook_content = content_elements[0].text.strip()
                                    if textbook_content:
                                        course_info['textbook_info'] = self.clean_text(textbook_content)
                                        break
                            except:
                                continue
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

    def process_single_course(self, course_data):
        """Process a single course through the complete workflow"""
        course_name = course_data['course_name']
        all_professors = course_data['professor_name']  # All professors for display
        main_professor = course_data['main_professor']  # Only main professor for extraction
        row_number = course_data['row_number']
        
        print(f"\n🎯 PROCESSING COURSE RECORD")
        print(f"📚 Course: {course_name}")
        print(f"� All Professors: {all_professors}")
        print(f"🎯 Main Professor (for extraction): {main_professor}")
        print(f"📊 Row: {row_number}")
        print("=" * 60)
        
        try:
            # Step 1: Search MAIN professor in rubrica (only extract data from main professor)
            rubrica_result = self.search_professor_rubrica(main_professor)
            if not rubrica_result:
                print("❌ Skipping - Professor not found in rubrica")
                return None
            
            # Step 2: Get course link from MAIN professor's personal page
            course_link = self.get_professor_course_link(rubrica_result['personal_page_url'], course_name)
            if not course_link:
                print("❌ Skipping - Course link not found")
                return None
            
            # Step 3: Extract course details
            course_info = self.extract_course_info_and_testi()
            
            # Build final result
            result = {
                'Facoltà': 'Economia',
                'Tipo di laurea': course_info['tipo_laurea'],
                'Nome corso': course_info['nome_corso'],
                'Anno di corso': course_info['anno_corso'],
                'Percorso del corso': course_info['percorso_corso'],
                'Nome Esame': course_name,
                'Professore': all_professors,  # ALL professors listed
                'Mail professore': rubrica_result['email'],  # Only MAIN professor's email
                'Programmi e testi': course_info['textbook_info'],
                'Link corso': course_link  # Only MAIN professor's course link
            }
            
            print("✅ SUCCESS! Course processed successfully")
            return result
            
        except Exception as e:
            print(f"❌ Error processing course: {e}")
            return None

    def run_production_batch(self):
        """Run the production batch processing"""
        print(f"\n🚀 STARTING FULL DEPARTMENT PROCESSING")
        print(f"🎯 Target: ALL courses from Economia department (starting from row 11)")
        print("=" * 60)
        
        try:
            # Get schedule data
            courses_data = self.get_schedule_data()
            
            if not courses_data:
                print("❌ No course data found")
                return
            
            # Process ALL courses in the department
            for i, course_data in enumerate(courses_data):
                result = self.process_single_course(course_data)
                
                if result:
                    self.results.append(result)
                    self.processed_count += 1
                    print(f"✅ Successfully processed {self.processed_count}/{len(courses_data)} courses")
                else:
                    print(f"⚠️ Failed to process course, continuing...")
                
                # Small delay between courses
                time.sleep(2)
                
                print(f"📊 Progress: {i+1}/{len(courses_data)} courses attempted")
            
            # Save results
            if self.results:
                self.save_results()
            else:
                print("❌ No courses were successfully processed")
                
        except Exception as e:
            print(f"❌ Critical error in production batch: {e}")

    def save_results(self):
        """Save all results to CSV with clean encoding"""
        try:
            # Clean all data
            cleaned_results = []
            for result in self.results:
                cleaned_result = {}
                for key, value in result.items():
                    cleaned_result[key] = self.clean_text(str(value)) if value else ""
                cleaned_results.append(cleaned_result)
            
            # Save with timestamp
            timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f'unimore_production_batch_{timestamp}.csv'
            
            df = pd.DataFrame(cleaned_results)
            df.to_csv(filename, index=False, encoding='utf-8-sig')
            
            print(f"\n🎉 PRODUCTION BATCH COMPLETE!")
            print(f"📊 Successfully processed: {len(cleaned_results)} courses")
            print(f"💾 Data saved to: {filename}")
            print(f"📈 Total courses attempted: {len(self.results)} individual professor records")
            
        except Exception as e:
            print(f"❌ Error saving results: {e}")

    def close(self):
        """Close the browser"""
        if self.driver:
            self.driver.quit()
            print("🔒 Browser closed")

def main():
    bot = UnimoreProductionBot()
    try:
        bot.run_production_batch()
    finally:
        bot.close()

if __name__ == "__main__":
    main()