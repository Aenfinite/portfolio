#!/usr/bin/env python3
"""
University of Modena Web Scraping Bot - OPTIMIZED PARALLEL VERSION
Processes multiple courses simultaneously with multiple Chrome instances
"""

import time
import datetime
import threading
import queue
import concurrent.futures
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import pandas as pd
import re
import os

class OptimizedUnimoreBot:
    def __init__(self, worker_id=0, max_workers=3):
        self.worker_id = worker_id
        self.max_workers = max_workers
        self.driver = None
        self.results = []
        self.processed_count = 0
        
    def setup_driver(self):
        """Initialize Chrome WebDriver with OPTIMIZED options"""
        chrome_options = Options()
        # SPEED OPTIMIZATIONS
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")
        chrome_options.add_argument("--disable-blink-features=AutomationControlled")
        chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])
        chrome_options.add_experimental_option('useAutomationExtension', False)
        chrome_options.add_argument("--disable-extensions")
        chrome_options.add_argument("--disable-plugins")
        chrome_options.add_argument("--disable-images")  # Faster loading
        chrome_options.add_argument("--disable-javascript")  # Disable non-essential JS
        chrome_options.add_argument("--disable-css")  # Disable CSS loading
        chrome_options.add_argument("--disable-fonts")  # Disable font loading
        chrome_options.add_argument("--disable-background-timer-throttling")
        chrome_options.add_argument("--disable-backgrounding-occluded-windows")
        chrome_options.add_argument("--disable-renderer-backgrounding")
        chrome_options.add_argument("--aggressive-cache-discard")
        chrome_options.add_argument("--memory-pressure-off")
        
        # HEADLESS for better performance (optional)
        # chrome_options.add_argument("--headless")  # Uncomment for headless mode
        
        # Different window positions for multiple workers
        x_pos = (self.worker_id * 400) % 1200
        y_pos = (self.worker_id * 200) % 600
        chrome_options.add_argument(f"--window-position={x_pos},{y_pos}")
        chrome_options.add_argument("--window-size=800,600")  # Smaller windows for better performance
        
        # Different user data directories for each worker
        user_data_dir = f"chrome_profile_worker_{self.worker_id}"
        chrome_options.add_argument(f"--user-data-dir={user_data_dir}")
        
        try:
            self.driver = webdriver.Chrome(options=chrome_options)
            self.driver.execute_script("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})")
            print(f"✅ Worker {self.worker_id}: Chrome WebDriver initialized")
            return True
        except Exception as e:
            print(f"❌ Worker {self.worker_id}: Failed to initialize Chrome: {e}")
            return False

    def clean_text(self, text):
        """Clean text - OPTIMIZED version"""
        if not text:
            return ""
        
        # Fast replacements
        replacements = {
            '\u00a0': ' ', '\u2013': '-', '\u2014': '-', '\u2018': "'", '\u2019': "'",
            '\u201c': '"', '\u201d': '"', '\u2022': '•'
        }
        
        for old, new in replacements.items():
            text = text.replace(old, new)
        
        # Clean control characters and normalize spaces
        text = re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f\x7f-\x84\x86-\x9f]', '', text)
        text = re.sub(r'\s+', ' ', text).strip()
        
        return text

    def get_schedule_data_batch(self, start_row, end_row):
        """Get course data for a specific row range - OPTIMIZED"""
        print(f"📅 Worker {self.worker_id}: Loading rows {start_row}-{end_row}...")
        
        schedule_url = "https://www.orariolezioni.unimore.it/Orario/Dipartimento_di_Economia_Marco_Biagi/2025-2026/2270/ttHtml.html"
        
        try:
            self.driver.get(schedule_url)
            # REDUCED wait time
            time.sleep(2)  # Reduced from 5 to 2 seconds
            
            courses_data = []
            rows = self.driver.find_elements(By.TAG_NAME, "tr")
            
            for row in rows:
                try:
                    cells = row.find_elements(By.TAG_NAME, "td")
                    if len(cells) < 6:
                        continue
                    
                    row_num_text = cells[0].text.strip()
                    if not row_num_text.isdigit():
                        continue
                    
                    row_num = int(row_num_text)
                    if row_num < start_row or row_num > end_row:
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
                            'row_number': row_num
                        })
                        
                        print(f"   ✅ Worker {self.worker_id}: Row {row_num} - {course_name}")
                        
                except Exception as e:
                    continue
            
            print(f"✅ Worker {self.worker_id}: Found {len(courses_data)} courses in range {start_row}-{end_row}")
            return courses_data
            
        except Exception as e:
            print(f"❌ Worker {self.worker_id}: Error loading schedule: {e}")
            return []

    def clean_professor_name(self, professor_name):
        """Clean professor name - OPTIMIZED"""
        if not professor_name:
            return ""
        
        name = professor_name.strip()
        name = re.sub(r'^(Prof\.?\s*|Dott\.?\s*|Dr\.?\s*)', '', name, flags=re.IGNORECASE)
        name = re.sub(r'\s*\([^)]*\)\s*', '', name)
        return name.strip()

    def search_professor_rubrica_fast(self, professor_name):
        """OPTIMIZED rubrica search with faster loading"""
        try:
            clean_name = self.clean_professor_name(professor_name)
            
            self.driver.get("https://www.unimore.it/it/rubrica")
            time.sleep(1)  # Reduced wait time
            
            name_input = WebDriverWait(self.driver, 5).until(
                EC.presence_of_element_located((By.XPATH, "//input[@name='name_1']"))
            )
            name_input.clear()
            name_input.send_keys(clean_name)
            
            search_button = self.driver.find_element(By.XPATH, "//button[@id='edit-submit-rubrica-role']")
            self.driver.execute_script("arguments[0].click();", search_button)
            time.sleep(2)  # Reduced wait time
            
            cards = self.driver.find_elements(By.CSS_SELECTOR, ".rubrica__wrapper")
            
            for card in cards:
                try:
                    name_elem = card.find_element(By.CSS_SELECTOR, ".rubrica__name")
                    card_name = name_elem.text.strip()
                    
                    professor_parts = clean_name.split()
                    if len(professor_parts) >= 2:
                        surname = professor_parts[-1].upper()
                        if surname in card_name.upper():
                            
                            # Fast email extraction
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
            
            return None
            
        except Exception as e:
            print(f"❌ Worker {self.worker_id}: Error searching {professor_name}: {e}")
            return None

    def get_course_link_fast(self, personal_page_url, target_course):
        """OPTIMIZED course link extraction"""
        try:
            self.driver.get(personal_page_url)
            time.sleep(1)  # Reduced wait time
            
            # Quick cookie handling
            try:
                cookie_button = WebDriverWait(self.driver, 2).until(
                    EC.element_to_be_clickable((By.XPATH, "//button[contains(text(), 'Accetta')]"))
                )
                self.driver.execute_script("arguments[0].click();", cookie_button)
            except:
                pass
            
            # Fast tab clicking
            try:
                insegnamenti_tab = WebDriverWait(self.driver, 3).until(
                    EC.element_to_be_clickable((By.XPATH, "//a[@href='#insegnamenti']"))
                )
                self.driver.execute_script("arguments[0].click();", insegnamenti_tab)
                time.sleep(1)  # Reduced wait time
            except:
                return None
            
            # Fast H3 matching
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
                try:
                    child_link = best_match.find_element(By.TAG_NAME, "a")
                    self.driver.execute_script("arguments[0].click();", child_link)
                except:
                    self.driver.execute_script("arguments[0].click();", best_match)
                
                time.sleep(2)  # Reduced wait time
                return self.driver.current_url
            
            return None
                
        except Exception as e:
            return None

    def extract_course_info_fast(self):
        """OPTIMIZED course info extraction"""
        try:
            course_info = {
                'nome_corso': '', 'tipo_laurea': '', 'anno_corso': '', 
                'percorso_corso': '', 'textbook_info': ''
            }
            
            # Fast dropdown clicking
            try:
                info_elem = WebDriverWait(self.driver, 3).until(
                    EC.element_to_be_clickable((By.XPATH, "//dt[contains(text(), 'Informazioni generali')]"))
                )
                self.driver.execute_script("arguments[0].click();", info_elem)
                time.sleep(1)  # Reduced wait time
                
                # Fast data extraction
                dt_elements = self.driver.find_elements(By.XPATH, "//dt[@title]")
                extracted_data = {}
                
                for dt in dt_elements[:15]:  # Limit to first 15 for speed
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
                                extracted_data[title] = self.clean_text(value)
                                
                    except Exception as e:
                        continue
                
                # Map data quickly
                course_info['nome_corso'] = extracted_data.get('Corso di studi', '')
                course_info['tipo_laurea'] = extracted_data.get('Tipo di corso', '')
                course_info['anno_corso'] = extracted_data.get('Anno di corso', '')
                course_info['percorso_corso'] = (
                    extracted_data.get('Percorso', '') or 
                    extracted_data.get('Tipo Attività Formativa', '')
                )
                
            except:
                pass
            
            # Fast Testi extraction
            try:
                testi_elem = WebDriverWait(self.driver, 2).until(
                    EC.element_to_be_clickable((By.XPATH, "//*[contains(text(), 'Testi')]"))
                )
                self.driver.execute_script("arguments[0].click();", testi_elem)
                time.sleep(1)
                
                content_elem = self.driver.find_element(By.XPATH, "//dt[contains(., 'Testi')]/following-sibling::dd[1]")
                textbook_content = content_elem.text.strip()
                if textbook_content:
                    course_info['textbook_info'] = self.clean_text(textbook_content)
                    
            except:
                pass
            
            return course_info
            
        except Exception as e:
            return {
                'nome_corso': '', 'tipo_laurea': '', 'anno_corso': '', 
                'percorso_corso': '', 'textbook_info': ''
            }

    def process_course_fast(self, course_data):
        """OPTIMIZED single course processing"""
        course_name = course_data['course_name']
        all_professors = course_data['professor_name']
        main_professor = course_data['main_professor']
        row_number = course_data['row_number']
        
        print(f"🎯 Worker {self.worker_id}: Processing Row {row_number} - {course_name}")
        
        try:
            # Step 1: Fast rubrica search
            rubrica_result = self.search_professor_rubrica_fast(main_professor)
            if not rubrica_result:
                print(f"⚠️ Worker {self.worker_id}: Professor not found - {main_professor}")
                return None
            
            # Step 2: Fast course link
            course_link = self.get_course_link_fast(rubrica_result['personal_page_url'], course_name)
            if not course_link:
                print(f"⚠️ Worker {self.worker_id}: Course link not found - {course_name}")
                return None
            
            # Step 3: Fast course info
            course_info = self.extract_course_info_fast()
            
            result = {
                'Facoltà': 'Economia',
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
            
            print(f"✅ Worker {self.worker_id}: SUCCESS Row {row_number}")
            return result
            
        except Exception as e:
            print(f"❌ Worker {self.worker_id}: Error processing Row {row_number}: {e}")
            return None

    def process_batch(self, courses_batch):
        """Process a batch of courses"""
        if not self.setup_driver():
            return []
        
        results = []
        try:
            for course_data in courses_batch:
                result = self.process_course_fast(course_data)
                if result:
                    results.append(result)
                
                # MINIMAL delay between courses
                time.sleep(0.5)  # Very short delay
                
        except Exception as e:
            print(f"❌ Worker {self.worker_id}: Batch error: {e}")
        finally:
            if self.driver:
                self.driver.quit()
        
        return results

    def close(self):
        if self.driver:
            self.driver.quit()

class ParallelUnimoreProcessor:
    def __init__(self, max_workers=3):
        self.max_workers = max_workers
        self.all_results = []
    
    def run_parallel_processing(self):
        """Run parallel processing with multiple workers"""
        print(f"\n🚀 STARTING OPTIMIZED PARALLEL PROCESSING")
        print(f"🔥 Using {self.max_workers} parallel workers")
        print("=" * 60)
        
        # First, get all course data with one worker
        temp_bot = OptimizedUnimoreBot(0, self.max_workers)
        if not temp_bot.setup_driver():
            print("❌ Failed to setup initial driver")
            return
        
        all_courses = temp_bot.get_schedule_data_batch(11, 200)  # Get all courses from row 11-200
        temp_bot.close()
        
        if not all_courses:
            print("❌ No courses found")
            return
        
        print(f"📊 Total courses to process: {len(all_courses)}")
        
        # Split courses into batches for parallel processing
        batch_size = max(1, len(all_courses) // self.max_workers)
        course_batches = [
            all_courses[i:i + batch_size] 
            for i in range(0, len(all_courses), batch_size)
        ]
        
        print(f"📦 Split into {len(course_batches)} batches")
        
        # Process batches in parallel
        start_time = time.time()
        
        with concurrent.futures.ThreadPoolExecutor(max_workers=self.max_workers) as executor:
            # Submit all batches
            future_to_worker = {}
            for i, batch in enumerate(course_batches):
                if batch:  # Only submit non-empty batches
                    bot = OptimizedUnimoreBot(i, self.max_workers)
                    future = executor.submit(bot.process_batch, batch)
                    future_to_worker[future] = i
            
            # Collect results as they complete
            for future in concurrent.futures.as_completed(future_to_worker):
                worker_id = future_to_worker[future]
                try:
                    batch_results = future.result()
                    self.all_results.extend(batch_results)
                    print(f"✅ Worker {worker_id} completed: {len(batch_results)} courses processed")
                except Exception as e:
                    print(f"❌ Worker {worker_id} failed: {e}")
        
        end_time = time.time()
        processing_time = end_time - start_time
        
        print(f"\n🎉 PARALLEL PROCESSING COMPLETE!")
        print(f"⏱️ Total time: {processing_time:.1f} seconds")
        print(f"📊 Total courses processed: {len(self.all_results)}")
        print(f"🚀 Speed: {len(self.all_results)/processing_time*60:.1f} courses/minute")
        
        # Save results
        if self.all_results:
            self.save_results()
    
    def save_results(self):
        """Save all results to CSV"""
        try:
            timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f'unimore_optimized_batch_{timestamp}.csv'
            
            df = pd.DataFrame(self.all_results)
            df.to_csv(filename, index=False, encoding='utf-8-sig')
            
            print(f"💾 Results saved to: {filename}")
            
        except Exception as e:
            print(f"❌ Error saving results: {e}")

def main():
    # Configure number of parallel workers (adjust based on your system)
    # For 8GB RAM, 3-4 workers should be optimal
    max_workers = 4  # You can increase this for more speed
    
    processor = ParallelUnimoreProcessor(max_workers)
    processor.run_parallel_processing()

if __name__ == "__main__":
    main()