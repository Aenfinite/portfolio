#!/usr/bin/env python3
"""
University of Modena REAL-TIME Bot - With immediate CSV updates and maximized windows
"""

import time
import datetime
import threading
import concurrent.futures
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import pandas as pd
import re
import os
import shutil
import tempfile
import random
import uuid

class RealtimeUnimoreBot:
    def __init__(self, worker_id=0, csv_filename=None):
        self.worker_id = worker_id
        self.driver = None
        self.temp_dir = None
        self.csv_filename = csv_filename
        self.csv_lock = threading.Lock()  # For thread-safe CSV writing
        self.professor_cache = {}  # Cache for professor data {name: {email, personal_page_url}}
        
    def cleanup_old_profiles(self):
        """Clean up old Chrome profiles"""
        try:
            for item in os.listdir('.'):
                if item.startswith('chrome_profile_worker_') or item.startswith('ultra_fast_profile_'):
                    try:
                        if os.path.isdir(item):
                            shutil.rmtree(item)
                    except:
                        pass
        except:
            pass

    def setup_maximized_driver(self):
        """Setup Chrome with MAXIMIZED windows for better element detection"""
        try:
            self.cleanup_old_profiles()
            
            chrome_options = Options()
            
            # SPEED + STABILITY settings
            chrome_options.add_argument("--no-sandbox")
            chrome_options.add_argument("--disable-dev-shm-usage")
            chrome_options.add_argument("--disable-blink-features=AutomationControlled")
            chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])
            chrome_options.add_experimental_option('useAutomationExtension', False)
            chrome_options.add_argument("--disable-extensions")
            chrome_options.add_argument("--disable-plugins")
            chrome_options.add_argument("--disable-images")
            
            # 🔥 MAXIMIZE WINDOWS FOR ELEMENT DETECTION
            chrome_options.add_argument("--start-maximized")
            chrome_options.add_argument("--force-device-scale-factor=1")
            
            # Create unique temp directory
            unique_id = str(uuid.uuid4())[:8]
            self.temp_dir = tempfile.mkdtemp(prefix=f"chrome_worker_{self.worker_id}_{unique_id}_")
            chrome_options.add_argument(f"--user-data-dir={self.temp_dir}")
            
            # Create driver
            self.driver = webdriver.Chrome(options=chrome_options)
            self.driver.execute_script("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})")
            
            # Maximize manually as backup
            self.driver.maximize_window()
            
            # Set LONGER timeouts for VPN connection
            self.driver.set_page_load_timeout(90)  # 90 seconds for VPN
            self.driver.implicitly_wait(15)  # 15 seconds implicit wait
            
            print(f"✅ Worker {self.worker_id}: MAXIMIZED Chrome ready - {unique_id}")
            return True
            
        except Exception as e:
            print(f"❌ Worker {self.worker_id}: Setup failed: {e}")
            return False

    def write_to_csv_immediately(self, result_data):
        """💾 REAL-TIME CSV WRITING - Write each row immediately"""
        if not self.csv_filename or not result_data:
            return
            
        try:
            with self.csv_lock:
                file_exists = os.path.exists(self.csv_filename)
                
                df_new = pd.DataFrame([result_data])
                
                if file_exists:
                    # Append without headers
                    df_new.to_csv(self.csv_filename, mode='a', header=False, index=False, encoding='utf-8-sig')
                else:
                    # Create with headers
                    df_new.to_csv(self.csv_filename, mode='w', header=True, index=False, encoding='utf-8-sig')
                
                print(f"💾 Worker {self.worker_id}: ✅ SAVED TO CSV: {self.csv_filename}")
                
        except Exception as e:
            print(f"❌ Worker {self.worker_id}: CSV write error: {e}")

    def extract_professor_data(self, card):
        """Extract email and personal page from professor card"""
        try:
            # Extract email
            try:
                email_elem = card.find_element(By.CSS_SELECTOR, ".rubrica__email a")
                email = email_elem.get_attribute('href').replace('mailto:', '')
            except:
                email_text = card.find_element(By.CSS_SELECTOR, ".rubrica__email").text.strip()
                email = email_text.replace('E-mail: ', '') if 'E-mail:' in email_text else email_text
            
            # Extract personal page URL
            personal_link = card.find_element(By.CSS_SELECTOR, ".rubrica__button a")
            personal_page_url = personal_link.get_attribute('href')
            
            return {'email': email, 'personal_page_url': personal_page_url}
            
        except Exception as e:
            print(f"❌ Worker {self.worker_id}: Error extracting professor data: {e}")
            return None

    def clean_text_fast(self, text):
        """Fast text cleaning"""
        if not text:
            return ""
        
        replacements = {
            '\u00a0': ' ', '\u2013': '-', '\u2014': '-', '\u2018': "'", '\u2019': "'",
            '\u201c': '"', '\u201d': '"', '\u2022': '•'
        }
        
        for old, new in replacements.items():
            text = text.replace(old, new)
        
        text = re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f\x7f-\x84\x86-\x9f]', '', text)
        text = re.sub(r'\s+', ' ', text).strip()
        
        return text

    def fast_rubrica_search(self, professor_name):
        """Fast professor search in rubrica with better error handling"""
        try:
            # 🚫 SKIP FAKE PROFESSORS
            if 'docente fittizio' in professor_name.lower() or 'fittizio' in professor_name.lower():
                print(f"⏭️ Worker {self.worker_id}: Skipping fake professor: {professor_name}")
                return None
                
            clean_name = re.sub(r'^(Prof\.?\s*|Dott\.?\s*|Dr\.?\s*)', '', professor_name.strip(), flags=re.IGNORECASE)
            clean_name = re.sub(r'\s*\([^)]*\)\s*', '', clean_name).strip()
            
            # Skip if name is too short or empty
            if len(clean_name) < 3:
                print(f"⏭️ Worker {self.worker_id}: Skipping short name: {clean_name}")
                return None
            
            print(f"🔍 Worker {self.worker_id}: Searching {clean_name}")
            
            self.driver.get("https://www.unimore.it/it/rubrica")
            time.sleep(3)  # LONGER wait for VPN
            
            # 🔍 USE WEBDRIVERWAIT FOR SEARCH ELEMENTS
            try:
                name_input = WebDriverWait(self.driver, 20).until(  # 20 seconds for VPN
                    EC.presence_of_element_located((By.XPATH, "//input[@name='name_1']"))
                )
                name_input.clear()
                name_input.send_keys(clean_name)
                
                # Wait for search button with multiple selectors
                search_button = None
                try:
                    search_button = WebDriverWait(self.driver, 10).until(
                        EC.element_to_be_clickable((By.XPATH, "//button[@id='edit-submit-rubrica-role']"))
                    )
                except:
                    # Try alternative selector
                    search_button = WebDriverWait(self.driver, 10).until(
                        EC.element_to_be_clickable((By.XPATH, "//button[contains(@class, 'btn') and contains(text(), 'Cerca')]"))
                    )
                
                if search_button:
                    self.driver.execute_script("arguments[0].click();", search_button)
                    time.sleep(5)  # LONGER wait for VPN search results
                else:
                    print(f"❌ Worker {self.worker_id}: Search button not found for {clean_name}")
                    return None
                    
            except Exception as e:
                print(f"❌ Worker {self.worker_id}: Search form error for {clean_name}: {e}")
                return None
            
            cards = self.driver.find_elements(By.CSS_SELECTOR, ".rubrica__wrapper")
            
            print(f"🔍 Worker {self.worker_id}: Found {len(cards)} professor cards")
            
            # IMPROVED MATCHING - Multiple strategies
            professor_parts = clean_name.split()
            
            for card in cards:
                try:
                    name_elem = card.find_element(By.CSS_SELECTOR, ".rubrica__name")
                    card_name = name_elem.text.strip().upper()
                    clean_search = clean_name.upper()
                    
                    # Strategy 1: Full name match
                    if clean_search in card_name:
                        print(f"✅ Worker {self.worker_id}: FULL MATCH - {card_name}")
                        # 🎯 EXTRACT THE FULL REAL NAME from the card
                        full_real_name = name_elem.text.strip()
                        print(f"📝 Worker {self.worker_id}: FULL REAL NAME: {full_real_name}")
                        return self.extract_professor_data(card)
                    
                    # Strategy 2: Surname match (if we have parts)
                    if len(professor_parts) >= 2:
                        surname = professor_parts[-1].upper()
                        if surname in card_name:
                            print(f"✅ Worker {self.worker_id}: SURNAME MATCH - {card_name}")
                            # 🎯 EXTRACT THE FULL REAL NAME from the card
                            full_real_name = name_elem.text.strip()
                            print(f"📝 Worker {self.worker_id}: FULL REAL NAME: {full_real_name}")
                            return self.extract_professor_data(card)
                    
                    # Strategy 3: First name + Surname match
                    if len(professor_parts) >= 2:
                        first_name = professor_parts[0].upper()
                        surname = professor_parts[-1].upper()
                        if first_name in card_name and surname in card_name:
                            print(f"✅ Worker {self.worker_id}: FIRST+SURNAME MATCH - {card_name}")
                            # 🎯 EXTRACT THE FULL REAL NAME from the card
                            full_real_name = name_elem.text.strip()
                            print(f"📝 Worker {self.worker_id}: FULL REAL NAME: {full_real_name}")
                            return self.extract_professor_data(card)
                    
                    # Strategy 4: Partial word matching (for similar names)
                    for part in professor_parts:
                        if len(part) >= 3 and part.upper() in card_name:
                            # Check if at least 2 parts match
                            matches = sum(1 for p in professor_parts if len(p) >= 3 and p.upper() in card_name)
                            if matches >= 2:
                                print(f"✅ Worker {self.worker_id}: PARTIAL MATCH ({matches} parts) - {card_name}")
                                # 🎯 EXTRACT THE FULL REAL NAME from the card
                                full_real_name = name_elem.text.strip()
                                print(f"📝 Worker {self.worker_id}: FULL REAL NAME: {full_real_name}")
                                return self.extract_professor_data(card)
                                
                except Exception as e:
                    continue
            
            # FALLBACK: Try searching with just surname if no match found
            if len(professor_parts) >= 2:
                surname_only = professor_parts[-1]
                print(f"🔄 Worker {self.worker_id}: Trying surname-only search: {surname_only}")
                
                # Search again with just surname
                name_input = self.driver.find_element(By.XPATH, "//input[@name='name_1']")
                name_input.clear()
                name_input.send_keys(surname_only)
                
                search_button = self.driver.find_element(By.XPATH, "//button[@id='edit-submit-rubrica-role']")
                self.driver.execute_script("arguments[0].click();", search_button)
                time.sleep(5)  # LONGER wait for VPN fallback search
                
                cards = self.driver.find_elements(By.CSS_SELECTOR, ".rubrica__wrapper")
                print(f"🔍 Worker {self.worker_id}: Surname search found {len(cards)} cards")
                
                for card in cards:
                    try:
                        name_elem = card.find_element(By.CSS_SELECTOR, ".rubrica__name")
                        card_name = name_elem.text.strip().upper()
                        
                        # Check if original first name appears in this card
                        if len(professor_parts) >= 1:
                            first_name = professor_parts[0].upper()
                            if first_name in card_name and surname_only.upper() in card_name:
                                print(f"✅ Worker {self.worker_id}: FALLBACK MATCH - {card_name}")
                                # 🎯 EXTRACT THE FULL REAL NAME from the card
                                full_real_name = name_elem.text.strip()
                                print(f"📝 Worker {self.worker_id}: FULL REAL NAME: {full_real_name}")
                                return self.extract_professor_data(card)
                                
                    except Exception as e:
                        continue
            
            print(f"⚠️ Worker {self.worker_id}: Professor not found after all attempts - {clean_name}")
            return None
            
        except Exception as e:
            print(f"❌ Worker {self.worker_id}: Error searching {professor_name}: {e}")
            return None

    def fast_course_link(self, personal_page_url, target_course):
        """Fast course link extraction"""
        try:
            print(f"🔗 Worker {self.worker_id}: Getting course link")
            
            self.driver.get(personal_page_url)
            time.sleep(5)  # LONGER wait for VPN page load
            
            # Handle cookie popup
            try:
                cookie_button = WebDriverWait(self.driver, 10).until(  # 10 seconds for VPN
                    EC.element_to_be_clickable((By.XPATH, "//button[contains(text(), 'Accetta')]"))
                )
                self.driver.execute_script("arguments[0].click();", cookie_button)
                time.sleep(3)  # LONGER wait for VPN cookie handling
            except:
                pass
            
            # Click Insegnamenti tab
            try:
                insegnamenti_tab = WebDriverWait(self.driver, 15).until(  # 15 seconds for VPN
                    EC.element_to_be_clickable((By.XPATH, "//a[@href='#insegnamenti']"))
                )
                self.driver.execute_script("arguments[0].click();", insegnamenti_tab)
                time.sleep(4)  # LONGER wait for VPN tab load
            except Exception as e:
                print(f"❌ Worker {self.worker_id}: Cannot find Insegnamenti tab")
                return None
            
            # Find matching H3
            h3_elements = self.driver.find_elements(By.TAG_NAME, "h3")
            course_words = target_course.lower().split()
            best_match = None
            max_matches = 0
            
            for h3 in h3_elements:
                try:
                    h3_text = h3.text.strip().lower()
                    matches = sum(1 for word in course_words if len(word) > 2 and word in h3_text)
                    
                    if matches > max_matches:
                        max_matches = matches
                        best_match = h3
                        
                except Exception as e:
                    continue
            
            if best_match and max_matches > 0:
                print(f"🎯 Worker {self.worker_id}: MATCH - {best_match.text.strip()}")
                
                try:
                    child_link = best_match.find_element(By.TAG_NAME, "a")
                    self.driver.execute_script("arguments[0].click();", child_link)
                except:
                    self.driver.execute_script("arguments[0].click();", best_match)
                
                time.sleep(4)  # LONGER wait for VPN course page
                return self.driver.current_url
            else:
                print(f"❌ Worker {self.worker_id}: No matching course found")
                return None
                
        except Exception as e:
            print(f"❌ Worker {self.worker_id}: Error getting course link: {e}")
            return None

    def extract_curriculum_info(self, course_name, department_url, faculty_name):
        """📋 STEP 0: Extract course info from visual timetable format"""
        try:
            print(f"📋 Worker {self.worker_id}: Extracting curriculum info for {course_name}")
            
            # Use specific Scienze Chimiche e Geologiche timetable URL
            curriculum_url = "https://www.orariolezioni.unimore.it/Orario/Dipartimento_di_Scienze_Chimiche_e_Geologiche/2025-2026/2280/Curricula/SCIENZENATURALIDM270-04_LaureaTriennale_16-212.html"
            
            curriculum_info = {
                'curriculum_nome_corso': '',
                'curriculum_tipo_laurea': '',  
                'curriculum_anno_corso': '',
                'periodo_didattico': '',
                'date_curriculum': '',
                'aula_location': ''
            }
            
            try:
                # Navigate to the main department curriculum page
                self.driver.get(curriculum_url)
                time.sleep(3)
                
                # 📋 EXTRACT HEADER INFORMATION from visual timetable
                try:
                    page_text = self.driver.page_source
                    
                    # Extract "Corso di laurea" info from timetable header
                    if "Corso di laurea:" in page_text:
                        import re
                        corso_match = re.search(r'Corso di laurea:\s*([^<\n]+)', page_text)
                        if corso_match:
                            corso_info = corso_match.group(1).strip()
                            print(f"📚 Worker {self.worker_id}: Found corso: {corso_info}")
                            
                            # Parse "SCIENZE NATURALI (D.M. 270/04) - Laurea Triennale"
                            if "(" in corso_info and ")" in corso_info:
                                course_name_part = corso_info.split("(")[0].strip()  # "SCIENZE NATURALI"
                                type_part = corso_info.split("(")[1].split(")")[0]    # "D.M. 270/04"
                                after_paren = corso_info.split(")")[1].strip() if ")" in corso_info else ""  # "- Laurea Triennale"
                                
                                curriculum_info['curriculum_nome_corso'] = course_name_part
                                curriculum_info['curriculum_tipo_laurea'] = f"{type_part} {after_paren}".strip()
                    
                    # Extract "Curriculum" info  
                    if "Curriculum:" in page_text:
                        curriculum_match = re.search(r'Curriculum:\s*([^<\n]+)', page_text)
                        if curriculum_match:
                            curriculum_text = curriculum_match.group(1).strip()
                            curriculum_info['curriculum_anno_corso'] = curriculum_text
                            
                    # Extract "Periodo didattico" info
                    if "Periodo didattico:" in page_text:
                        periodo_match = re.search(r'Periodo didattico:\s*([^<\n]+)', page_text)
                        if periodo_match:
                            curriculum_info['periodo_didattico'] = periodo_match.group(1).strip()
                            
                    # Extract date range
                    if "Date di inizio/fine curriculum:" in page_text:
                        date_match = re.search(r'Date di inizio/fine curriculum:\s*([^<\n]+)', page_text)
                        if date_match:
                            curriculum_info['date_curriculum'] = date_match.group(1).strip()
                            
                except Exception as e:
                    print(f"⚠️ Worker {self.worker_id}: Error parsing curriculum header: {e}")
                
                # 🏫 EXTRACT COURSE AND CLASSROOM INFO from visual timetable cells
                try:
                    # Look for course in timetable cells (case-insensitive)
                    course_cells = self.driver.find_elements(By.XPATH, f"//td[contains(translate(text(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '{course_name.lower()}')]")
                    
                    if not course_cells:
                        # Try broader search for any matching word
                        course_words = course_name.lower().split()
                        for word in course_words:
                            if len(word) > 3:  # Skip short words
                                course_cells = self.driver.find_elements(By.XPATH, f"//td[contains(translate(text(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '{word}')]")
                                if course_cells:
                                    print(f"🔍 Worker {self.worker_id}: Found course cells using word: {word}")
                                    break
                    
                    for cell in course_cells:
                        try:
                            # Get the full cell content (course, professor, classroom)
                            cell_text = cell.text.strip()
                            lines = cell_text.split('\n')
                            
                            print(f"📋 Worker {self.worker_id}: Cell content: {lines}")
                            
                            # Parse cell structure: Course -> Professor -> Classroom
                            for i, line in enumerate(lines):
                                line_clean = line.strip()
                                
                                # Look for classroom (contains "Aula" or similar)
                                if ('aula' in line_clean.lower() or 'sala' in line_clean.lower() or 
                                    'u0.' in line_clean.lower() or 'uint.' in line_clean.lower()):
                                    curriculum_info['aula_location'] = line_clean
                                    print(f"🏫 Worker {self.worker_id}: Found classroom: {line_clean}")
                                    break
                                    
                        except Exception as e:
                            continue
                            
                    if not curriculum_info['aula_location']:
                        print(f"⚠️ Worker {self.worker_id}: No classroom found for {course_name}")
                        
                except Exception as e:
                    print(f"⚠️ Worker {self.worker_id}: Error extracting classroom info: {e}")
                        
            except Exception as e:
                print(f"⚠️ Worker {self.worker_id}: Could not access curriculum page: {e}")
            
            return curriculum_info
            
        except Exception as e:
            print(f"❌ Worker {self.worker_id}: Error in curriculum extraction: {e}")
            return {
                'curriculum_nome_corso': '',
                'curriculum_tipo_laurea': '',
                'curriculum_anno_corso': '',
                'curriculum_crediti': '',
                'curriculum_settore': ''
            }

    def fast_course_info(self):
        """Fast course information extraction"""
        try:
            print(f"📚 Worker {self.worker_id}: Extracting course info")
            
            course_info = {
                'nome_corso': '', 'tipo_laurea': '', 'anno_corso': '', 
                'percorso_corso': '', 'textbook_info': ''
            }
            
            # 🏛️ MULTI-DEPARTMENT: Different selectors for each department
            info_generali_selectors = [
                # For Economia department
                "//dt[contains(text(), 'Informazioni generali')]",
                "//dt//div[contains(text(), 'Informazioni generali')]",
                # For Giurisprudenza department
                "//h3[contains(text(), 'Informazioni generali')]",
                "//div[contains(@class, 'accordion')]//h3[contains(text(), 'Informazioni')]",
                # For Ingegneria department
                "//button[contains(text(), 'Informazioni generali')]",
                "//a[contains(text(), 'Informazioni generali')]",
                # Generic fallbacks
                "//*[contains(text(), 'Informazioni generali')]",
                "//*[contains(text(), 'Informazioni')]",
                "//dt[contains(@class, 'info')]",
                "//div[contains(@id, 'info')]"
            ]
            
            info_clicked = False
            for selector in info_generali_selectors:
                try:
                    info_elem = WebDriverWait(self.driver, 15).until(  # 15 seconds for VPN
                        EC.element_to_be_clickable((By.XPATH, selector))
                    )
                    self.driver.execute_script("arguments[0].click();", info_elem)
                    time.sleep(4)  # LONGER wait for VPN info load
                    info_clicked = True
                    print(f"✅ Worker {self.worker_id}: Info generali clicked with selector: {selector}")
                    break
                except:
                    continue
                
            if info_clicked:
                # 🏛️ MULTI-DEPARTMENT: Different extraction strategies
                extracted_data = {}
                try:
                    # Strategy 1: Economia style (dt[@title] + dd pairs)
                    dt_elements = self.driver.find_elements(By.XPATH, "//dt[@title]")
                    if not dt_elements:
                        # Strategy 2: Giurisprudenza style (div or table structure)
                        print(f"🔄 Worker {self.worker_id}: Trying Giurisprudenza/Ingegneria style extraction")
                        # Try different table/div structures
                        table_elements = self.driver.find_elements(By.XPATH, "//table//tr")
                        for tr in table_elements[:10]:  # Limit for speed
                            try:
                                cells = tr.find_elements(By.TAG_NAME, "td")
                                if len(cells) >= 2:
                                    key = cells[0].text.strip()
                                    value = cells[1].text.strip()
                                    if key and value:
                                        extracted_data[key] = self.clean_text_fast(value)
                            except:
                                continue
                    
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
                                    value = self.clean_text_fast(value)
                                    extracted_data[title] = value
                                    
                        except Exception as e:
                            continue
                            
                except Exception as e:
                    print(f"⚠️ Worker {self.worker_id}: Error in generic parser: {e}")
                
                # 🗺️ MULTI-DEPARTMENT: Map extracted data with multiple key variations
                course_info['nome_corso'] = (
                    extracted_data.get('Corso di studi', '') or
                    extracted_data.get('Corso', '') or
                    extracted_data.get('Course', '') or
                    extracted_data.get('Denominazione', '')
                )
                course_info['tipo_laurea'] = (
                    extracted_data.get('Tipo di corso', '') or
                    extracted_data.get('Tipo corso', '') or
                    extracted_data.get('Livello', '') or
                    extracted_data.get('Degree Type', '')
                )
                course_info['anno_corso'] = (
                    extracted_data.get('Anno di corso', '') or
                    extracted_data.get('Anno', '') or
                    extracted_data.get('Year', '')
                )
                course_info['percorso_corso'] = (
                    extracted_data.get('Percorso', '') or 
                    extracted_data.get('Tipo Attività Formativa', '') or
                    extracted_data.get('Curriculum', '') or
                    extracted_data.get('Indirizzo', '')
                )
            else:
                print(f"⚠️ Worker {self.worker_id}: Could not click Informazioni generali")
            
            # 📚 MULTI-DEPARTMENT: Extract Testi information for all departments
            testi_selectors = [
                # Economia department
                "//dt[@class='open']//div[contains(text(), 'Testi')]",
                "//dt//div[text()='Testi']",
                "//dt[contains(., 'Testi')]",
                # Giurisprudenza department
                "//h3[contains(text(), 'Testi')]",
                "//h4[contains(text(), 'Testi')]",
                "//div[contains(@class, 'accordion')]//h3[contains(text(), 'Testi')]",
                # Ingegneria department
                "//button[contains(text(), 'Testi')]",
                "//a[contains(text(), 'Testi')]",
                # Generic fallbacks
                "//*[contains(text(), 'Testi')]",
                "//*[contains(text(), 'Bibliografia')]",
                "//*[contains(text(), 'Libri')]",
                "//*[contains(text(), 'Textbook')]"
            ]
            
            for selector in testi_selectors:
                try:
                    elements = self.driver.find_elements(By.XPATH, selector)
                    if elements:
                        testi_element = elements[0]
                        self.driver.execute_script("arguments[0].click();", testi_element)
                        time.sleep(3)  # Wait for dropdown to expand
                        
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
                                        course_info['textbook_info'] = self.clean_text_fast(textbook_content)
                                        print(f"✅ Worker {self.worker_id}: Found textbook info")
                                        break
                            except:
                                continue
                        
                        if course_info['textbook_info']:
                            break
                        
                except:
                    continue
            
            return course_info
            
        except Exception as e:
            print(f"❌ Worker {self.worker_id}: Error in course info extraction: {e}")
            return {
                'nome_corso': '', 'tipo_laurea': '', 'anno_corso': '', 
                'percorso_corso': '', 'textbook_info': ''
            }

    def process_course_realtime(self, course_data):
        """🚀 REAL-TIME course processing with immediate CSV save - ALWAYS SAVES RECORD"""
        course_name = course_data['course_name']
        individual_professor = course_data['professor_name']  # Now individual professor
        all_professors_original = course_data.get('all_professors', individual_professor)  # Original list
        row_number = course_data['row_number']
        
        print(f"\n🎯 Worker {self.worker_id}: Processing Row {row_number} - {course_name}")
        print(f"� Individual professor: {individual_professor}")
        print(f"👥 Original professor list: {all_professors_original}")
        
        # 📋 INITIALIZE RESULT WITH EXACT CSV FIELD NAMES (PRE-FILLED FROM TIMETABLE)
        result = {
            'Facoltà': course_data.get('faculty', 'Scienze Chimiche e Geologiche'),
            'Tipo di laurea': course_data.get('tipo_laurea', ''),     # From timetable header
            'Nome corso': course_data.get('nome_corso_degree', ''),  # From timetable header  
            'Anno di corso': course_data.get('anno_corso', ''),      # From timetable header
            'Percorso del corso': course_data.get('percorso_corso', ''), # From timetable header
            'Nome Esame': course_name,     # From timetable cell: "Chimica"
            'Professore': individual_professor,  # Individual professor only: "Gianluca Malavasi"
            'Mail professore': '',         # From rubrica: "gianluca.malavasi@unimore.it"
            'Programmi e testi': '',       # From course page: syllabus/textbooks
            'Link corso': ''               # From professor page: course catalog link
        }
        
        try:
            # 📋 STEP 0: Degree info already extracted from timetable header in get_courses_from_timetable()
            # No need to re-extract - data is already populated in result dictionary
            print(f"📋 Worker {self.worker_id}: Using pre-extracted degree info:")
            print(f"   📚 Nome corso: {result['Nome corso']}")
            print(f"   🎓 Tipo laurea: {result['Tipo di laurea']}")
            print(f"   📅 Anno corso: {result['Anno di corso']}")
            print(f"   🛤️ Percorso: {result['Percorso del corso']}")
            
            # Check if we already have this professor's info in cache
            cached_prof_info = self.professor_cache.get(individual_professor)
            if cached_prof_info:
                print(f"✨ Worker {self.worker_id}: Using cached info for {individual_professor}")
                result['Mail professore'] = cached_prof_info['email']
                
                # Get course link using cached personal page URL
                course_link = self.fast_course_link(cached_prof_info['personal_page_url'], course_name)
                if course_link:
                    result['Link corso'] = course_link
            else:
                # Not in cache - need to search rubrica
                print(f"🔍 Worker {self.worker_id}: First time seeing {individual_professor} - searching rubrica")
                rubrica_result = self.fast_rubrica_search(individual_professor)
                if rubrica_result:
                    # Save to cache for future use
                    self.professor_cache[individual_professor] = rubrica_result
                    result['Mail professore'] = rubrica_result['email']
                    
                    # Step 2: Get course link (if fails, link stays blank)
                    course_link = self.fast_course_link(rubrica_result['personal_page_url'], course_name)
                    if course_link:
                    result['Link corso'] = course_link
                    
                    # Step 3: Extract course info (PROFESSOR PAGE DATA TAKES PRIORITY)
                    course_info = self.fast_course_info()
                    if course_info:
                        # 🎯 PROFESSOR PAGE DATA IS MORE DETAILED - Override curriculum data
                        if course_info.get('tipo_laurea'):
                            result['Tipo di laurea'] = course_info.get('tipo_laurea', '')
                        if course_info.get('nome_corso'):
                            result['Nome corso'] = course_info.get('nome_corso', '')
                        if course_info.get('anno_corso'):
                            result['Anno di corso'] = course_info.get('anno_corso', '')
                        if course_info.get('percorso_corso'):
                            result['Percorso del corso'] = course_info.get('percorso_corso', '')
                        # Always fill textbook info (comes only from professor's course page)
                        result['Programmi e testi'] = course_info.get('textbook_info', '')
                else:
                    print(f"⚠️ Worker {self.worker_id}: Course link not found for {individual_professor}, saving with blank link")
            else:
                print(f"⚠️ Worker {self.worker_id}: Professor {individual_professor} not found, saving with blank email")
            
            # 💾 ALWAYS WRITE TO CSV - Even with missing data!
            self.write_to_csv_immediately(result)
            
            print(f"✅ Worker {self.worker_id}: RECORD SAVED Row {row_number} - 💾 ADDED TO CSV!")
            return result
            
        except Exception as e:
            print(f"❌ Worker {self.worker_id}: Error processing Row {row_number}: {e}")
            # 💾 STILL SAVE RECORD even if there was an error
            self.write_to_csv_immediately(result)
            print(f"⚠️ Worker {self.worker_id}: ERROR but RECORD SAVED Row {row_number} - 💾 ADDED TO CSV!")
            return result

    def process_batch_realtime(self, courses_batch):
        """Process batch with real-time CSV writing"""
        if not self.setup_maximized_driver():
            return []
        
        results = []
        try:
            for course_data in courses_batch:
                result = self.process_course_realtime(course_data)
                if result:
                    results.append(result)
                
                time.sleep(1.5)  # LONGER delay for VPN stability
                
        except Exception as e:
            print(f"❌ Worker {self.worker_id}: Batch error: {e}")
        finally:
            self.cleanup()
        
        return results

    def cleanup(self):
        """Clean up resources"""
        if self.driver:
            try:
                self.driver.quit()
            except:
                pass
        
        if self.temp_dir and os.path.exists(self.temp_dir):
            try:
                shutil.rmtree(self.temp_dir)
            except:
                pass

def get_courses_from_timetable(department_name, timetable_url, faculty_name):
    """Extract courses directly from visual timetable page"""
    print(f"\n📊 Getting courses from visual timetable: {department_name}...")
    
    bot = RealtimeUnimoreBot(0)
    if not bot.setup_maximized_driver():
        return []
    
    try:
        # Go directly to the visual timetable page
        print(f"🌐 Loading timetable: {timetable_url}")
        bot.driver.get(timetable_url)
        time.sleep(5)  # Wait for timetable to load
        
        # 📜 SCROLL THROUGH ENTIRE PAGE to load all timetable sections
        print("📜 Scrolling through entire page to load all timetable sections...")
        
        # Get initial page height
        last_height = bot.driver.execute_script("return document.body.scrollHeight")
        
        # Scroll down multiple times to load all content
        scroll_attempts = 0
        max_scrolls = 10  # Prevent infinite scrolling
        
        while scroll_attempts < max_scrolls:
            # Scroll to bottom
            bot.driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
            time.sleep(2)  # Wait for content to load
            
            # Calculate new scroll height and compare to last height
            new_height = bot.driver.execute_script("return document.body.scrollHeight")
            
            if new_height == last_height:
                # No more content to load
                break
                
            last_height = new_height
            scroll_attempts += 1
            print(f"📜 Scroll attempt {scroll_attempts}: Found more content...")
        
        # Scroll back to top to ensure we capture everything
        bot.driver.execute_script("window.scrollTo(0, 0);")
        time.sleep(2)
        
        print(f"📜 Scrolling complete. Made {scroll_attempts} scroll attempts.")
        
        courses_data = []
        
        # Extract header information first
        page_source = bot.driver.page_source
        
        # 📚 ENHANCED: Parse course degree info from headers AND detect multiple sections
        course_degree_info = {
            'nome_corso': '',
            'tipo_laurea': '',
            'anno_corso': '',
            'percorso_corso': 'Comune'
        }
        
        # 🔍 DETECT ALL CURRICULUM SECTIONS on the page
        print("🔍 Detecting all curriculum sections on the page...")
        section_headers = bot.driver.find_elements(By.XPATH, "//text()[contains(., 'Curriculum:') or contains(., 'Corso di laurea:')]/../..")
        
        if not section_headers:
            # Try broader search for section indicators
            section_headers = bot.driver.find_elements(By.XPATH, "//*[contains(text(), 'anno') or contains(text(), 'Anno')]")
            
        print(f"📚 Found {len(section_headers)} potential curriculum sections")
        
        # Try to extract degree info from any visible headers
        all_text = bot.driver.find_element(By.TAG_NAME, "body").text
        print(f"📋 Page contains {len(all_text)} characters of text")
        
        try:
            import re
            # Extract "Corso di laurea: SCIENZE NATURALI (D.M. 270/04) - Laurea Triennale"
            if "Corso di laurea:" in page_source:
                corso_match = re.search(r'Corso di laurea:\s*([^<\n]+)', page_source)
                if corso_match:
                    corso_info = corso_match.group(1).strip()
                    print(f"� Found course info: {corso_info}")
                    
                    if "(" in corso_info and ")" in corso_info:
                        course_degree_info['nome_corso'] = corso_info.split("(")[0].strip()
                        type_part = corso_info.split("(")[1].split(")")[0]
                        after_paren = corso_info.split(")")[1].strip() if ")" in corso_info else ""
                        course_degree_info['tipo_laurea'] = f"{type_part} {after_paren}".strip()
            
            # Extract "Curriculum: Comune - 1 anno"
            if "Curriculum:" in page_source:
                curriculum_match = re.search(r'Curriculum:\s*([^<\n]+)', page_source)
                if curriculum_match:
                    curriculum_text = curriculum_match.group(1).strip()
                    if " - " in curriculum_text:
                        course_degree_info['percorso_corso'] = curriculum_text.split(" - ")[0]
                        course_degree_info['anno_corso'] = curriculum_text.split(" - ")[1] if len(curriculum_text.split(" - ")) > 1 else ""
                    else:
                        course_degree_info['anno_corso'] = curriculum_text
                        
        except Exception as e:
            print(f"⚠️ Error parsing header info: {e}")
        
        # Debug: Show what was extracted from headers
        print(f"📋 Header extraction results:")
        print(f"   📚 Nome corso: '{course_degree_info['nome_corso']}'")
        print(f"   🎓 Tipo laurea: '{course_degree_info['tipo_laurea']}'")
        print(f"   📅 Anno corso: '{course_degree_info['anno_corso']}'")
        print(f"   🛤️ Percorso: '{course_degree_info['percorso_corso']}'")
        
        # Now extract courses from timetable cells
        print("🔍 Extracting courses from timetable cells...")
        
        # 🔍 ENHANCED: Find all table cells from ALL sections (after scrolling)
        # Multiple strategies to capture all course cells
        
        # Strategy 1: Look for colored cells (courses usually have background colors)
        course_cells = bot.driver.find_elements(By.XPATH, "//td[contains(@style, 'background-color') or @bgcolor or contains(@class, 'corso')]")
        
        # Strategy 2: Look for cells containing course-like content
        if not course_cells:
            course_cells = bot.driver.find_elements(By.XPATH, "//td[string-length(normalize-space(text())) > 10]")
        
        # Strategy 3: Look for cells within timetable tables
        if len(course_cells) < 50:  # If we don't have many cells, try broader search
            additional_cells = bot.driver.find_elements(By.XPATH, "//table//td[text() and string-length(normalize-space(text())) > 5]")
            course_cells.extend(additional_cells)
            
        # Process all cells (no duplicate filtering)
        valid_cells = []
        for cell in course_cells:
            try:
                cell_text = cell.text.strip()
                if cell_text and len(cell_text) > 5:  # Just check it's not empty/too short
                    valid_cells.append(cell)
            except:
                continue
                
        course_cells = valid_cells
        print(f"🔍 Found {len(course_cells)} course cells to process (after scrolling)")
        
        processed_courses = set()  # To avoid duplicates
        row_counter = 1
        
        for cell in course_cells:
            try:
                cell_text = cell.text.strip()
                if not cell_text or len(cell_text) < 3:
                    continue
                
                lines = cell_text.split('\n')
                if len(lines) < 2:  # Need at least course name and professor
                    continue
                
                # Parse cell structure: Course Name -> Professor -> Classroom
                course_name = lines[0].strip()
                professor_line = lines[1].strip() if len(lines) > 1 else ""
                classroom = lines[2].strip() if len(lines) > 2 else ""
                
                # Extract professor names from HTML - handle multiple professors with links
                professor_name = ""
                if professor_line:
                    # Try to extract from HTML first (for linked professors)
                    try:
                        from bs4 import BeautifulSoup
                        soup = BeautifulSoup(professor_line, 'html.parser')
                        # Find all professor links
                        professor_links = soup.find_all('a')
                        if professor_links:
                            professor_names = []
                            for link in professor_links:
                                name = link.get_text().strip()
                                if name:
                                    professor_names.append(name)
                            professor_name = " / ".join(professor_names)
                        else:
                            # No links found, use plain text
                            professor_name = professor_line
                    except:
                        # Fallback to plain text if HTML parsing fails
                        professor_name = professor_line
                
                # 🔍 Try to detect which section/year this course belongs to
                section_year = "Unknown"
                section_percorso = "Comune"
                try:
                    # Strategy 1: Look for nearby section headers to determine year
                    parent_elements = bot.driver.execute_script("""
                        var cell = arguments[0];
                        var elements = [];
                        var current = cell;
                        // First, look for curriculum headers in the page
                        var allElements = document.querySelectorAll('*');
                        var cellPosition = Array.from(allElements).indexOf(cell);
                        
                        // Look backwards from cell position for curriculum headers
                        for (var i = cellPosition - 1; i >= 0 && i >= cellPosition - 100; i--) {
                            var elem = allElements[i];
                            if (elem && elem.textContent && 
                                (elem.textContent.includes('Curriculum:') || 
                                 elem.textContent.includes('anno') || 
                                 elem.textContent.includes('Anno'))) {
                                elements.push(elem.textContent);
                                if (elem.textContent.includes('Curriculum:')) break; // Found curriculum header
                            }
                        }
                        return elements;
                    """, cell)
                    
                    # Process found elements to determine section
                    for elem_text in parent_elements:
                        if 'curriculum:' in elem_text.lower():
                            # Found curriculum header like "Curriculum: Comune - 2 anno"
                            import re
                            curriculum_match = re.search(r'Curriculum:\s*([^<\n]+)', elem_text, re.IGNORECASE)
                            if curriculum_match:
                                curriculum_full = curriculum_match.group(1).strip()
                                if " - " in curriculum_full:
                                    parts = curriculum_full.split(" - ")
                                    section_percorso = parts[0].strip()
                                    if len(parts) > 1:
                                        year_part = parts[1].strip()
                                        year_match = re.search(r'(\d+)\s*anno', year_part, re.IGNORECASE)
                                        if year_match:
                                            section_year = f"{year_match.group(1)} anno"
                                            print(f"🎯 Found curriculum section for course: {section_percorso} - {section_year}")
                                            break
                        elif 'anno' in elem_text.lower() and section_year == "Unknown":
                            # Fallback: look for any year reference
                            import re
                            year_match = re.search(r'(\d+)\s*anno', elem_text, re.IGNORECASE)
                            if year_match:
                                section_year = f"{year_match.group(1)} anno"
                                
                except Exception as e:
                    print(f"⚠️ Error detecting section for course {course_name}: {e}")
                    pass  # Keep default "Unknown"
                
                # Skip if course name looks like time or is too short
                if (course_name.replace(':', '').replace('-', '').isdigit() or 
                    len(course_name) < 3 or
                    course_name.lower() in ['lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì']):
                    continue
                
                # Skip if professor name is empty or looks invalid
                if not professor_name or len(professor_name) < 3:
                    continue
                
                # Create unique identifier to avoid duplicate course-professor combinations
                course_key = f"{course_name}_{professor_name}"
                if course_key in processed_courses:
                    continue
                
                processed_courses.add(course_key)
                
                print(f"🔍 Found course: {course_name} with professors: {professor_name}")
                
                # 👥 HANDLE MULTIPLE PROFESSORS - Create separate row for each professor
                professors = [prof.strip() for prof in professor_name.split('/')]
                
                # Create separate course entry for EACH professor
                for individual_professor in professors:
                    if individual_professor and len(individual_professor) > 2:  # Valid professor name
                        
                        course_data = {
                            'course_name': course_name,
                            'professor_name': individual_professor,  # Individual professor only
                            'main_professor': individual_professor,   # Same as professor_name now
                            'all_professors': professor_name,         # Keep original full list
                            'classroom': classroom,
                            'row_number': row_counter,
                            'department': department_name,
                            'faculty': faculty_name,
                            'timetable_url': timetable_url,
                            'section_year': section_year,  # NEW: Which year/section this belongs to
                            'section_percorso': section_percorso,    # NEW: Which curriculum path (Comune, etc.)
                            # Include degree info extracted from header
                            'nome_corso_degree': course_degree_info['nome_corso'],
                            'tipo_laurea': course_degree_info['tipo_laurea'],
                            'anno_corso': section_year if section_year != "Unknown" else course_degree_info['anno_corso'],  # Use detected year
                            'percorso_corso': section_percorso if section_percorso != "Comune" else course_degree_info['percorso_corso']  # Use detected percorso
                        }
                        
                        courses_data.append(course_data)
                        print(f"   📚 Row {row_counter}: {course_name} - {individual_professor} [{classroom}] ({section_percorso} - {section_year})")
                        
                        row_counter += 1
                
                # Continue processing all courses (removed limit)
                # if len(courses_data) >= 10:
                #     print(f"🧪 TESTING MODE: Limited to {len(courses_data)} courses")
                #     break
                    
            except Exception as e:
                continue
        
        print(f"✅ EXTRACTED {len(courses_data)} TOTAL COURSES from timetable")
        return courses_data
        
    except Exception as e:
        print(f"❌ Error getting courses from timetable: {e}")
        return []
    finally:
        bot.cleanup()

def process_single_department(department_info, max_workers=4):
    """Process single department with REAL-TIME CSV updates"""
    department_name = department_info['name']
    department_url = department_info['url']
    faculty_name = department_info['faculty']
    
    print(f"\n🎯 PROCESSING DEPARTMENT: {department_name}")
    print(f"🌐 URL: {department_url}")
    print(f"🏛️ Faculty: {faculty_name}")
    print("=" * 80)
    
    # 💾 CREATE CSV FILENAME IMMEDIATELY
    timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
    safe_dept_name = department_name.replace(" ", "_").replace("/", "_")
    csv_filename = f'unimore_{safe_dept_name}_{timestamp}.csv'
    print(f"💾 CSV file: {csv_filename} (REAL-TIME updates)")
    
    dept_start_time = time.time()
    
    # Get all courses from visual timetable
    all_courses = get_courses_from_timetable(department_name, department_url, faculty_name)
    if not all_courses:
        print(f"❌ No courses found in {department_name}")
        return 0
    
    print(f"📊 Total courses in {department_name}: {len(all_courses)}")
    
    # Split into batches
    batch_size = max(1, len(all_courses) // max_workers)
    course_batches = [
        all_courses[i:i + batch_size] 
        for i in range(0, len(all_courses), batch_size)
    ]
    
    print(f"📦 Created {len(course_batches)} batches for {department_name}")
    
    department_results = []
    
    # Process batches in parallel with REAL-TIME CSV
    with concurrent.futures.ThreadPoolExecutor(max_workers=max_workers) as executor:
        future_to_worker = {}
        
        for i, batch in enumerate(course_batches):
            if batch:
                bot = RealtimeUnimoreBot(i, csv_filename)  # Pass CSV filename
                future = executor.submit(bot.process_batch_realtime, batch)
                future_to_worker[future] = i
        
        # Collect results
        for future in concurrent.futures.as_completed(future_to_worker):
            worker_id = future_to_worker[future]
            try:
                batch_results = future.result(timeout=1800)  # 30 minute timeout per batch for VPN
                department_results.extend(batch_results)
                print(f"✅ {department_name} Worker {worker_id} completed: {len(batch_results)} courses")
            except Exception as e:
                print(f"❌ {department_name} Worker {worker_id} failed: {e}")
    
    dept_end_time = time.time()
    dept_processing_time = dept_end_time - dept_start_time
    
    print(f"\n🎉 {department_name.upper()} DEPARTMENT COMPLETE!")
    print(f"⏱️ Department time: {dept_processing_time:.1f} seconds")
    print(f"📊 Courses processed: {len(department_results)}")
    if dept_processing_time > 0:
        print(f"🚀 Department speed: {len(department_results)/dept_processing_time*60:.1f} courses/minute")
    
    # CSV is already saved in REAL-TIME!
    if department_results:
        print(f"💾 {department_name} results already saved REAL-TIME: {csv_filename}")
        print(f"🎉 SUCCESS: {len(department_results)} courses extracted from {department_name}!")
    else:
        print(f"❌ No courses were successfully processed from {department_name}")
    
    return len(department_results)

def crawl_all_departments_for_count(departments):
    """📊 PHASE 1: Crawl all departments to count total courses before processing"""
    print("\n📊📊📊 PHASE 1: CRAWLING ALL DEPARTMENTS FOR RECORD COUNT 📊📊📊")
    print("🔍 This will give you an overview of total workload before processing professors")
    print("⚡ Quick scan - no professor data extraction yet!\n")
    
    total_courses_all_departments = 0
    department_course_counts = []
    
    for i, dept_info in enumerate(departments, 1):
        department_name = dept_info['name']
        timetable_url = dept_info['url']
        faculty_name = dept_info['faculty']
        
        print(f"📋 [{i}/{len(departments)}] Crawling: {department_name}")
        print(f"🌐 URL: {timetable_url[:80]}...")
        
        # Get course count from this department
        courses_in_dept = get_courses_from_timetable(department_name, timetable_url, faculty_name)
        course_count = len(courses_in_dept)
        
        department_course_counts.append({
            'name': department_name,
            'faculty': faculty_name,
            'course_count': course_count
        })
        
        total_courses_all_departments += course_count
        
        print(f"✅ Found {course_count} courses in {department_name}")
        print(f"📊 Running total: {total_courses_all_departments} courses")
        print("-" * 60)
    
    # Display final summary
    print(f"\n🎯 CRAWLING PHASE COMPLETE - TOTAL OVERVIEW:")
    print(f"📊 TOTAL COURSES TO PROCESS: {total_courses_all_departments}")
    print(f"🏛️ DEPARTMENTS: {len(departments)}")
    print(f"\n� BREAKDOWN BY DEPARTMENT:")
    
    for dept in department_course_counts:
        percentage = (dept['course_count'] / total_courses_all_departments * 100) if total_courses_all_departments > 0 else 0
        print(f"   📚 {dept['name']}: {dept['course_count']} courses ({percentage:.1f}%)")
    
    print(f"\n⏳ ESTIMATED PROCESSING TIME:")
    print(f"   🔍 At ~30 seconds per course: {total_courses_all_departments * 30 / 60:.1f} minutes")
    print(f"   �🚀 With 4 parallel workers: {total_courses_all_departments * 30 / 60 / 4:.1f} minutes")
    
    return total_courses_all_departments, department_course_counts

def main():
    """🚀 REAL-TIME TIMETABLE EXTRACTION - 10 DEPARTMENT TIMETABLES - ALL RECORDS"""
    print("🚀🚀🚀 UNIMORE REAL-TIME BOT STARTING 🚀🚀🚀")
    print("🎯 PROCESSING 10 DIFFERENT DEGREE PROGRAM TIMETABLES")
    print("🧪 7 PROGRAMS FROM SCIENZE CHIMICHE E GEOLOGICHE + 3 OTHER DEPARTMENTS")
    print("\n📊 TWO-PHASE PROCESSING:")
    print("   🔍 PHASE 1: Crawl all departments to count total records")
    print("   👨‍🏫 PHASE 2: Process professors department by department")
    print("\n🎯 FEATURES:")
    print("📅 DIRECT TIMETABLE PARSING - All fields in Step 0!")
    print("💾 REAL-TIME CSV UPDATES - Each row saved immediately!")
    print("🖥️ MAXIMIZED WINDOWS - Better element detection!")
    print("🔍 IMPROVED PROFESSOR MATCHING - Multiple strategies!")
    print("📊 PROCESSING ALL COURSES (No limit!)")
    print("👥 HANDLING MULTIPLE PROFESSORS - Separate rows per professor!")
    print("🔗 10 TIMETABLE URLs TO PROCESS")
    print("🚫 DUPLICATE DETECTION - Avoiding duplicate course-professor pairs!")
    
    # Define all 10 timetable URLs to process sequentially - 7 from Scienze Chimiche e Geologiche + 3 others
    departments = [
        # 🧪 SCIENZE CHIMICHE E GEOLOGICHE - 7 DEGREE PROGRAMS
        {
            'name': 'Scienze_Chimiche_Didattica_Comunicazione_Magistrale',
            'url': 'https://www.orariolezioni.unimore.it/Orario/Dipartimento_di_Scienze_Chimiche_e_Geologiche/2025-2026/2280/Curricula/DidatticaeComunicazionedelleScienzeDM270-04_LaureaMagistrale_16-269.html',
            'faculty': 'Scienze Chimiche e Geologiche'
        },
        {
            'name': 'Scienze_Chimiche_Geoscienze_Georischi_Magistrale',
            'url': 'https://www.orariolezioni.unimore.it/Orario/Dipartimento_di_Scienze_Chimiche_e_Geologiche/2025-2026/2280/Curricula/Geoscienze-GeorischieGeorisorseDM270-04_LaureaMagistrale_16-270.html',
            'faculty': 'Scienze Chimiche e Geologiche'
        },
        {
            'name': 'Scienze_Chimiche_Scienze_Chimiche_Magistrale',
            'url': 'https://www.orariolezioni.unimore.it/Orario/Dipartimento_di_Scienze_Chimiche_e_Geologiche/2025-2026/2280/Curricula/SCIENZECHIMICHEDM270-04_LaureaMagistrale_16-264.html',
            'faculty': 'Scienze Chimiche e Geologiche'
        },
        {
            'name': 'Scienze_Chimiche_Chimica_Triennale',
            'url': 'https://www.orariolezioni.unimore.it/Orario/Dipartimento_di_Scienze_Chimiche_e_Geologiche/2025-2026/2280/Curricula/CHIMICADM270-04_LaureaTriennale_16-210.html',
            'faculty': 'Scienze Chimiche e Geologiche'
        },
        {
            'name': 'Scienze_Chimiche_Chimica_Verde_Sostenibile_Triennale',
            'url': 'https://www.orariolezioni.unimore.it/Orario/Dipartimento_di_Scienze_Chimiche_e_Geologiche/2025-2026/2280/Curricula/Chimicaverdeesostenibile_LaureaTriennale_16-316.html',
            'faculty': 'Scienze Chimiche e Geologiche'
        },
        {
            'name': 'Scienze_Chimiche_Scienze_Geologiche_Triennale',
            'url': 'https://www.orariolezioni.unimore.it/Orario/Dipartimento_di_Scienze_Chimiche_e_Geologiche/2025-2026/2280/Curricula/SCIENZEGEOLOGICHEDM270-04_LaureaTriennale_16-213.html',
            'faculty': 'Scienze Chimiche e Geologiche'
        },
        {
            'name': 'Scienze_Chimiche_Scienze_Naturali_Triennale',
            'url': 'https://www.orariolezioni.unimore.it/Orario/Dipartimento_di_Scienze_Chimiche_e_Geologiche/2025-2026/2280/Curricula/SCIENZENATURALIDM270-04_LaureaTriennale_16-212.html',
            'faculty': 'Scienze Chimiche e Geologiche'
        },
        # 🧬 OTHER DEPARTMENTS - 3 PROGRAMS
        {
            'name': 'Scienze_della_Vita_Bioscienze_Magistrale',
            'url': 'https://www.orariolezioni.unimore.it/Orario/Dipartimento_di_Scienze_della_Vita_-_Sede_Modena/2025-2026/2250/Curricula/Bioscienze_LaureaMagistrale_1_Biodiversitaeclima_17-256.html',
            'faculty': 'Scienze della Vita'
        },
        {
            'name': 'Scienze_e_metodi_Ingegneria_Digital_Automation',
            'url': 'https://www.orariolezioni.unimore.it/Orario/Dipartimento_di_Scienze_e_metodi_dellIngegneria/2025-2026/2283/Curricula/DigitalAutomationEngineering_Laureamagistrale_1_Comune_1-362.html',
            'faculty': 'Scienze e metodi dell\'Ingegneria'
        },
        {
            'name': 'Scienze_Chimiche_e_Geologiche_SCIENZE_NATURALI_ORIGINAL',
            'url': 'https://www.orariolezioni.unimore.it/Orario/Dipartimento_di_Scienze_Chimiche_e_Geologiche/2025-2026/2280/Curricula/SCIENZENATURALIDM270-04_LaureaTriennale_16-212.html',
            'faculty': 'Scienze Chimiche e Geologiche'
        }
    ]
    
    max_workers = 4
    print(f"🔧 Using {max_workers} parallel workers per department")
    
    # 📊 PHASE 1: Crawl all departments for counting
    total_expected_courses, dept_breakdowns = crawl_all_departments_for_count(departments)
    
    # Ask user to confirm before starting processing
    print(f"\n⚠️ READY TO START PHASE 2 - PROFESSOR PROCESSING")
    print(f"📊 Will process {total_expected_courses} courses across {len(departments)} departments")
    print(f"⏳ This will take approximately {total_expected_courses * 30 / 60 / 4:.1f} minutes with 4 workers")
    
    input("\n✅ Press ENTER to start Phase 2 (Professor Processing) or Ctrl+C to exit...")
    
    print(f"\n👨‍🏫👨‍🏫👨‍🏫 PHASE 2: PROFESSOR PROCESSING STARTING 👨‍🏫👨‍🏫👨‍🏫")
    
    total_start_time = time.time()
    total_courses_processed = 0
    
    # Process each department
    for i, dept_info in enumerate(departments, 1):
        expected_for_dept = next((d['course_count'] for d in dept_breakdowns if d['name'] == dept_info['name']), 0)
        print(f"\n{'='*20} DEPARTMENT {i}/{len(departments)} {'='*20}")
        print(f"📊 Expected courses for this department: {expected_for_dept}")
        
        courses_processed = process_single_department(dept_info, max_workers)
        total_courses_processed += courses_processed
        
        if i < len(departments):
            print(f"\n⏸️ Quick transition to next department...")
            time.sleep(2)
    
    total_end_time = time.time()
    total_processing_time = total_end_time - total_start_time
    
    print(f"\n🎉🎉🎉 ALL 10 DEGREE PROGRAMS PROCESSING COMPLETE! 🎉🎉🎉")
    print(f"⏱️ Total time for all programs: {total_processing_time/60:.1f} minutes")
    print(f"📊 Total courses processed: {total_courses_processed}/{total_expected_courses}")
    print(f"🏛️ Degree programs processed: {len(departments)}")
    print(f"💾 Separate CSV files created for each program with REAL-TIME updates")
    if total_processing_time > 0:
        print(f"🚀 Overall speed: {total_courses_processed/total_processing_time*60:.1f} courses/minute")
    
    # Show final comparison with expectations
    success_rate = (total_courses_processed / total_expected_courses * 100) if total_expected_courses > 0 else 0
    print(f"📊 Success rate: {success_rate:.1f}% ({total_courses_processed}/{total_expected_courses})")
    
    print(f"\n🎯 FINAL SUMMARY - 10 TIMETABLES PROCESSED:")
    print(f"\n🧪 SCIENZE CHIMICHE E GEOLOGICHE - 7 PROGRAMS:")
    for i in range(7):
        dept = departments[i]
        expected = next((d['course_count'] for d in dept_breakdowns if d['name'] == dept['name']), 0)
        print(f"   ✅ {i+1}. {dept['name']} - Expected: {expected} courses")
    
    print(f"\n🧬 OTHER DEPARTMENTS - 3 PROGRAMS:")
    for i in range(7, len(departments)):
        dept = departments[i]
        expected = next((d['course_count'] for d in dept_breakdowns if d['name'] == dept['name']), 0)
        print(f"   ✅ {i+1}. {dept['name']} ({dept['faculty']}) - Expected: {expected} courses")
    
    print(f"\n💾 Check your directory for 10 CSV files: unimore_[Department]_[Timestamp].csv")
    print(f"🌟 COMPLETE: All 10 degree program timetables extracted successfully!")

if __name__ == "__main__":
    main()