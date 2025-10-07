#!/usr/bin/env python3
"""
University of Modena FIXED FAST Bot - Handles Chrome profile conflicts
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
idef process_single_department(department_info, max_workers=3):
    """Process a single department with parallel workers"""
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
    print(f"💾 CSV file: {csv_filename} (real-time updates)")
    
    dept_start_time = time.time()
import tempfile
import random
import uuid

class FixedFastUnimoreBot:
    def __init__(self, worker_id=0, csv_filename=None):
        self.worker_id = worker_id
        self.driver = None
        self.temp_dir = None
        self.csv_filename = csv_filename
        self.csv_lock = threading.Lock()  # For thread-safe CSV writing
        
    def cleanup_old_profiles(self):
        """Clean up old Chrome profiles"""
        try:
            # Clean up old profiles from current directory
            for item in os.listdir('.'):
                if item.startswith('chrome_profile_worker_') or item.startswith('ultra_fast_profile_'):
                    try:
                        if os.path.isdir(item):
                            shutil.rmtree(item)
                    except:
                        pass
        except:
            pass

    def setup_fixed_fast_driver(self):
        """FIXED Chrome setup with unique profiles"""
        try:
            # Clean old profiles first
            self.cleanup_old_profiles()
            
            chrome_options = Options()
            
            # OPTIMIZED SPEED SETTINGS (but stable)
            chrome_options.add_argument("--no-sandbox")
            chrome_options.add_argument("--disable-dev-shm-usage")
            chrome_options.add_argument("--disable-blink-features=AutomationControlled")
            chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])
            chrome_options.add_experimental_option('useAutomationExtension', False)
            chrome_options.add_argument("--disable-extensions")
            chrome_options.add_argument("--disable-plugins")
            chrome_options.add_argument("--disable-images")
            chrome_options.add_argument("--disable-background-timer-throttling")
            chrome_options.add_argument("--disable-backgrounding-occluded-windows")
            chrome_options.add_argument("--disable-renderer-backgrounding")
            chrome_options.add_argument("--memory-pressure-off")
            
            # Create UNIQUE temp directory for each worker
            unique_id = str(uuid.uuid4())[:8]
            self.temp_dir = tempfile.mkdtemp(prefix=f"chrome_worker_{self.worker_id}_{unique_id}_")
            chrome_options.add_argument(f"--user-data-dir={self.temp_dir}")
            
            # MAXIMIZE windows for better element detection
            chrome_options.add_argument("--start-maximized")
            # Different window positions (but maximized)
            x_pos = (self.worker_id * 50) % 200
            y_pos = (self.worker_id * 50) % 200
            chrome_options.add_argument(f"--window-position={x_pos},{y_pos}")
            
            # Create driver
            self.driver = webdriver.Chrome(options=chrome_options)
            self.driver.execute_script("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})")
            
            # Set reasonable timeouts
            self.driver.set_page_load_timeout(30)
            self.driver.implicitly_wait(5)
            
            print(f"✅ FIXED Worker {self.worker_id}: Chrome initialized with profile {unique_id}")
            return True
            
        except Exception as e:
            print(f"❌ FIXED Worker {self.worker_id}: Setup failed: {e}")
            return False

    def write_to_csv_immediately(self, result_data):
        """Write single row to CSV immediately (thread-safe)"""
        if not self.csv_filename or not result_data:
            return
            
        try:
            with self.csv_lock:
                # Check if file exists to determine if we need headers
                file_exists = os.path.exists(self.csv_filename)
                
                df_new = pd.DataFrame([result_data])
                
                if file_exists:
                    # Append without headers
                    df_new.to_csv(self.csv_filename, mode='a', header=False, index=False, encoding='utf-8-sig')
                else:
                    # Create with headers
                    df_new.to_csv(self.csv_filename, mode='w', header=True, index=False, encoding='utf-8-sig')
                
                print(f"💾 Worker {self.worker_id}: Row saved to {self.csv_filename}")
                
        except Exception as e:
            print(f"❌ Worker {self.worker_id}: CSV write error: {e}")

    def clean_text_fast(self, text):
        """Fast text cleaning"""
        if not text:
            return ""
        
        # Replace common Unicode issues
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
        """Fast professor search in rubrica"""
        try:
            clean_name = re.sub(r'^(Prof\.?\s*|Dott\.?\s*|Dr\.?\s*)', '', professor_name.strip(), flags=re.IGNORECASE)
            clean_name = re.sub(r'\s*\([^)]*\)\s*', '', clean_name).strip()
            
            print(f"🔍 Worker {self.worker_id}: Searching {clean_name}")
            
            self.driver.get("https://www.unimore.it/it/rubrica")
            time.sleep(1)  # FASTER wait time
            
            name_input = WebDriverWait(self.driver, 8).until(
                EC.presence_of_element_located((By.XPATH, "//input[@name='name_1']"))
            )
            name_input.clear()
            name_input.send_keys(clean_name)
            
            search_button = self.driver.find_element(By.XPATH, "//button[@id='edit-submit-rubrica-role']")
            self.driver.execute_script("arguments[0].click();", search_button)
            time.sleep(2)  # FASTER results wait
            
            cards = self.driver.find_elements(By.CSS_SELECTOR, ".rubrica__wrapper")
            
            professor_parts = clean_name.split()
            if len(professor_parts) >= 2:
                surname = professor_parts[-1].upper()
                
                for card in cards:
                    try:
                        name_elem = card.find_element(By.CSS_SELECTOR, ".rubrica__name")
                        card_name = name_elem.text.strip()
                        
                        if surname in card_name.upper():
                            print(f"✅ Worker {self.worker_id}: MATCH - {card_name}")
                            
                            # Extract email
                            try:
                                email_elem = card.find_element(By.CSS_SELECTOR, ".rubrica__email a")
                                email = email_elem.get_attribute('href').replace('mailto:', '')
                            except:
                                email_text = card.find_element(By.CSS_SELECTOR, ".rubrica__email").text.strip()
                                email = email_text.replace('E-mail: ', '') if 'E-mail:' in email_text else email_text
                            
                            personal_link = card.find_element(By.CSS_SELECTOR, ".rubrica__button a")
                            personal_page_url = personal_link.get_attribute('href')
                            
                            return {'email': email, 'personal_page_url': personal_page_url}
                            
                    except Exception as e:
                        continue
            
            print(f"⚠️ Worker {self.worker_id}: Professor not found - {clean_name}")
            return None
            
        except Exception as e:
            print(f"❌ Worker {self.worker_id}: Error searching {professor_name}: {e}")
            return None

    def fast_course_link(self, personal_page_url, target_course):
        """Fast course link extraction"""
        try:
            print(f"🔗 Worker {self.worker_id}: Getting course link")
            
            self.driver.get(personal_page_url)
            time.sleep(2)
            
            # Handle cookie popup
            try:
                cookie_button = WebDriverWait(self.driver, 3).until(
                    EC.element_to_be_clickable((By.XPATH, "//button[contains(text(), 'Accetta')]"))
                )
                self.driver.execute_script("arguments[0].click();", cookie_button)
                time.sleep(1)
            except:
                pass
            
            # Click Insegnamenti tab
            try:
                insegnamenti_tab = WebDriverWait(self.driver, 5).until(
                    EC.element_to_be_clickable((By.XPATH, "//a[@href='#insegnamenti']"))
                )
                self.driver.execute_script("arguments[0].click();", insegnamenti_tab)
                time.sleep(2)
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
                
                time.sleep(2)  # FASTER course page load
                return self.driver.current_url
            else:
                print(f"❌ Worker {self.worker_id}: No matching course found")
                return None
                
        except Exception as e:
            print(f"❌ Worker {self.worker_id}: Error getting course link: {e}")
            return None

    def fast_course_info(self):
        """Fast course information extraction"""
        try:
            print(f"📚 Worker {self.worker_id}: Extracting course info")
            
            course_info = {
                'nome_corso': '', 'tipo_laurea': '', 'anno_corso': '', 
                'percorso_corso': '', 'textbook_info': ''
            }
            
            # Click Informazioni generali
            try:
                info_elem = WebDriverWait(self.driver, 5).until(
                    EC.element_to_be_clickable((By.XPATH, "//dt[contains(text(), 'Informazioni generali')]"))
                )
                self.driver.execute_script("arguments[0].click();", info_elem)
                time.sleep(2)
                
                # Extract data using the working method
                dt_elements = self.driver.find_elements(By.XPATH, "//dt[@title]")
                extracted_data = {}
                
                for dt in dt_elements[:10]:  # Limit for speed
                    try:
                        title = dt.get_attribute('title').strip()
                        dd = self.driver.execute_script("""
                            var dt = arguments[0];
                            var nextSibling = dt.nextElementSibling;
                            while (nextSibling && nextSibling.tagName.toLowerCase() !== 'dd') {
                                nextSibling = nextSibling.nextElementSibling;
                            }
                            return nextSibling;
                        """, dt)
                        
                        if dd:
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
                                extracted_data[title] = self.clean_text_fast(value)
                                
                    except Exception as e:
                        continue
                
                # Map the data
                course_info['nome_corso'] = extracted_data.get('Corso di studi', '')
                course_info['tipo_laurea'] = extracted_data.get('Tipo di corso', '')
                course_info['anno_corso'] = extracted_data.get('Anno di corso', '')
                course_info['percorso_corso'] = (
                    extracted_data.get('Percorso', '') or 
                    extracted_data.get('Tipo Attività Formativa', '')
                )
                
            except Exception as e:
                print(f"⚠️ Worker {self.worker_id}: Could not extract course info: {e}")
            
            # SKIP textbook extraction for speed (can be added back if needed)
            
            return course_info
            
        except Exception as e:
            print(f"❌ Worker {self.worker_id}: Error in course info extraction: {e}")
            return {
                'nome_corso': '', 'tipo_laurea': '', 'anno_corso': '', 
                'percorso_corso': '', 'textbook_info': ''
            }

    def process_course_fast(self, course_data):
        """Fast single course processing"""
        course_name = course_data['course_name']
        all_professors = course_data['professor_name']
        main_professor = course_data['main_professor']
        row_number = course_data['row_number']
        
        print(f"\n🎯 Worker {self.worker_id}: Processing Row {row_number} - {course_name}")
        print(f"👥 All professors: {all_professors}")
        print(f"🎯 Main professor: {main_professor}")
        
        try:
            # Step 1: Search professor
            rubrica_result = self.fast_rubrica_search(main_professor)
            if not rubrica_result:
                return None
            
            # Step 2: Get course link
            course_link = self.fast_course_link(rubrica_result['personal_page_url'], course_name)
            if not course_link:
                return None
            
            # Step 3: Extract course info
            course_info = self.fast_course_info()
            
            result = {
                'Facoltà': course_data.get('faculty', 'Economia'),
                'Tipo di laurea': course_info['tipo_laurea'],
                'Nome corso': course_info['nome_corso'],
                'Anno di corso': course_info['anno_corso'],
                'Percorso del corso': course_info['percorso_corso'],
                'Nome Esame': course_name,
                'Professore': all_professors,
                'Mail professore': rubrica_result['email'],
                'Programmi e testi': course_info['textbook_info'],
                'Link corso': course_link
            }
            
            # 💾 WRITE TO CSV IMMEDIATELY!
            self.write_to_csv_immediately(result)
            
            print(f"✅ Worker {self.worker_id}: SUCCESS Row {row_number} - SAVED TO CSV!")
            return result
            
        except Exception as e:
            print(f"❌ Worker {self.worker_id}: Error processing Row {row_number}: {e}")
            return None

    def process_batch_fixed(self, courses_batch):
        """Process a batch of courses with fixed Chrome setup"""
        if not self.setup_fixed_fast_driver():
            return []
        
        results = []
        try:
            for course_data in courses_batch:
                result = self.process_course_fast(course_data)
                if result:
                    results.append(result)
                
                time.sleep(0.5)  # MINIMAL delay between courses
                
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
        
        # Clean up temp directory
        if self.temp_dir and os.path.exists(self.temp_dir):
            try:
                shutil.rmtree(self.temp_dir)
            except:
                pass

def get_courses_from_department(department_name, department_url, faculty_name):
    """Get all courses from a specific department"""
    print(f"\n📊 Getting courses from {department_name}...")
    
    bot = FixedFastUnimoreBot(0)
    if not bot.setup_fixed_fast_driver():
        return []
    
    try:
        bot.driver.get(department_url)
        time.sleep(3)
        
        courses_data = []
        rows = bot.driver.find_elements(By.TAG_NAME, "tr")
        print(f"📊 Found {len(rows)} total rows in {department_name}")
        
        for row in rows:
            try:
                cells = row.find_elements(By.TAG_NAME, "td")
                if len(cells) < 6:
                    continue
                
                row_num_text = cells[0].text.strip()
                if not row_num_text.isdigit():
                    continue
                
                row_num = int(row_num_text)
                if row_num < 11:  # Start from row 11
                    continue
                
                course_name = cells[1].text.strip()
                professor_name = cells[4].text.strip()
                
                if course_name and professor_name:
                    professors = [prof.strip() for prof in professor_name.split('/')]
                    main_professor = professors[0] if professors else professor_name
                    
                    courses_data.append({
                        'course_name': course_name,
                        'professor_name': professor_name,
                        'main_professor': main_professor,
                        'row_number': row_num,
                        'department': department_name,
                        'faculty': faculty_name
                    })
                    
                    print(f"   📚 Row {row_num}: {course_name} - {professor_name}")
                    
            except Exception as e:
                continue
        
        print(f"✅ Found {len(courses_data)} courses in {department_name}")
        return courses_data
        
    except Exception as e:
        print(f"❌ Error getting courses from {department_name}: {e}")
        return []
    finally:
        bot.cleanup()

def process_single_department(department_info, max_workers=3):
    """Process a single department with parallel workers"""
    department_name = department_info['name']
    department_url = department_info['url']
    faculty_name = department_info['faculty']
    
    print(f"\n🎯 PROCESSING DEPARTMENT: {department_name}")
    print(f"� URL: {department_url}")
    print(f"🏛️ Faculty: {faculty_name}")
    print("=" * 80)
    
    dept_start_time = time.time()
    
    # Get all courses from this department
    all_courses = get_courses_from_department(department_name, department_url, faculty_name)
    if not all_courses:
        print(f"❌ No courses found in {department_name}")
        return 0
    
    print(f"📊 Total courses in {department_name}: {len(all_courses)}")
    
    # Split into batches for parallel processing
    batch_size = max(1, len(all_courses) // max_workers)
    course_batches = [
        all_courses[i:i + batch_size] 
        for i in range(0, len(all_courses), batch_size)
    ]
    
    print(f"📦 Created {len(course_batches)} batches for {department_name}")
    
    department_results = []
    
    # Process batches in parallel
    with concurrent.futures.ThreadPoolExecutor(max_workers=max_workers) as executor:
        future_to_worker = {}
        
        for i, batch in enumerate(course_batches):
            if batch:
                bot = FixedFastUnimoreBot(i, csv_filename)  # Pass CSV filename
                future = executor.submit(bot.process_batch_fixed, batch)
                future_to_worker[future] = i
        
        # Collect results
        for future in concurrent.futures.as_completed(future_to_worker):
            worker_id = future_to_worker[future]
            try:
                batch_results = future.result(timeout=900)  # 15 minute timeout per batch
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
    
    # CSV is already saved in real-time!
    if department_results:
        print(f"💾 {department_name} results already saved in real-time: {csv_filename}")
        print(f"🎉 SUCCESS: {len(department_results)} courses extracted from {department_name}!")
    else:
        print(f"❌ No courses were successfully processed from {department_name}")
    
    return len(department_results)

def main():
    """MULTI-DEPARTMENT PROCESSING - All 3 Departments"""
    print("🚀🚀🚀 UNIMORE MULTI-DEPARTMENT BOT STARTING 🚀🚀🚀")
    print("🎯 Processing ALL 3 departments with separate CSV outputs")
    
    # Define all departments to process
    departments = [
        {
            'name': 'Economia_Marco_Biagi',
            'url': 'https://www.orariolezioni.unimore.it/Orario/Dipartimento_di_Economia_Marco_Biagi/2025-2026/2270/ttHtml.html',
            'faculty': 'Economia'
        },
        {
            'name': 'Giurisprudenza',
            'url': 'https://www.orariolezioni.unimore.it/Orario/Dipartimento_di_Giurisprudenza/2025-2026/',
            'faculty': 'Giurisprudenza'
        },
        {
            'name': 'Ingegneria_Enzo_Ferrari',
            'url': 'https://www.orariolezioni.unimore.it/Orario/Dipartimento_di_Ingegneria_Enzo_Ferrari/2025-2026/',
            'faculty': 'Ingegneria'
        }
    ]
    
    max_workers = 4  # INCREASED workers for faster processing (adjust for your RAM)
    print(f"🔧 Using {max_workers} parallel workers per department")
    
    total_start_time = time.time()
    total_courses_processed = 0
    
    # Process each department sequentially (but each department uses parallel processing internally)
    for i, dept_info in enumerate(departments, 1):
        print(f"\n{'='*20} DEPARTMENT {i}/{len(departments)} {'='*20}")
        
        courses_processed = process_single_department(dept_info, max_workers)
        total_courses_processed += courses_processed
        
        # MINIMAL break between departments
        if i < len(departments):
            print(f"\n⏸️ Quick transition to next department...")
            time.sleep(2)  # REDUCED pause
    
    total_end_time = time.time()
    total_processing_time = total_end_time - total_start_time
    
    print(f"\n🎉🎉🎉 ALL DEPARTMENTS PROCESSING COMPLETE! 🎉🎉🎉")
    print(f"⏱️ Total time for all departments: {total_processing_time/60:.1f} minutes")
    print(f"📊 Total courses processed across all departments: {total_courses_processed}")
    print(f"🏛️ Departments processed: {len(departments)}")
    print(f"📁 Separate CSV files created for each department")
    if total_processing_time > 0:
        print(f"🚀 Overall speed: {total_courses_processed/total_processing_time*60:.1f} courses/minute")
    
    print(f"\n🎯 SUMMARY:")
    for dept in departments:
        print(f"   ✅ {dept['name']} ({dept['faculty']}) - Processed and saved to CSV")
    
    print(f"\n💾 Check your directory for CSV files named: unimore_[Department]_[Timestamp].csv")

if __name__ == "__main__":
    main()