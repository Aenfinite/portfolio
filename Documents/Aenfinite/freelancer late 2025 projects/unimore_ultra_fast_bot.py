#!/usr/bin/env python3
"""
University of Modena ULTRA-FAST Bot
Maximum speed optimization with aggressive parallel processing
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
import multiprocessing as mp

class UltraFastUnimoreBot:
    def __init__(self, worker_id=0):
        self.worker_id = worker_id
        self.driver = None
        
    def setup_ultra_fast_driver(self):
        """ULTRA FAST Chrome setup - maximum speed optimizations"""
        chrome_options = Options()
        
        # MAXIMUM SPEED SETTINGS
        chrome_options.add_argument("--headless")  # HEADLESS = FASTEST
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")
        chrome_options.add_argument("--disable-gpu")
        chrome_options.add_argument("--disable-web-security")
        chrome_options.add_argument("--disable-features=VizDisplayCompositor")
        chrome_options.add_argument("--disable-extensions")
        chrome_options.add_argument("--disable-plugins")
        chrome_options.add_argument("--disable-images")
        chrome_options.add_argument("--disable-javascript")
        chrome_options.add_argument("--disable-css")
        chrome_options.add_argument("--disable-fonts")
        chrome_options.add_argument("--disable-background-networking")
        chrome_options.add_argument("--disable-background-timer-throttling")
        chrome_options.add_argument("--disable-backgrounding-occluded-windows")
        chrome_options.add_argument("--disable-renderer-backgrounding")
        chrome_options.add_argument("--disable-field-trial-config")
        chrome_options.add_argument("--disable-ipc-flooding-protection")
        chrome_options.add_argument("--memory-pressure-off")
        chrome_options.add_argument("--max_old_space_size=4096")
        
        # Network optimizations
        chrome_options.add_argument("--aggressive-cache-discard")
        chrome_options.add_argument("--enable-fast-unload")
        chrome_options.add_argument("--disable-default-apps")
        chrome_options.add_argument("--disable-sync")
        
        # Window settings for multiple instances
        chrome_options.add_argument("--window-size=400,300")  # Minimum size
        
        # Separate profile for each worker
        user_data_dir = f"ultra_fast_profile_{self.worker_id}"
        chrome_options.add_argument(f"--user-data-dir={user_data_dir}")
        
        try:
            self.driver = webdriver.Chrome(options=chrome_options)
            # ULTRA FAST page load timeout
            self.driver.set_page_load_timeout(10)  # 10 seconds max
            self.driver.implicitly_wait(2)  # 2 seconds max wait
            
            print(f"⚡ ULTRA Worker {self.worker_id}: READY")
            return True
        except Exception as e:
            print(f"❌ ULTRA Worker {self.worker_id}: Setup failed: {e}")
            return False

    def clean_text_ultra_fast(self, text):
        """ULTRA FAST text cleaning"""
        if not text:
            return ""
        
        # Single regex for all replacements
        text = re.sub(r'[\u00a0\u2013\u2014\u2018\u2019\u201c\u201d\u2022\x00-\x08\x0b\x0c\x0e-\x1f\x7f-\x84\x86-\x9f]', ' ', text)
        return re.sub(r'\s+', ' ', text).strip()

    def ultra_fast_rubrica_search(self, professor_name):
        """ULTRA FAST professor search"""
        try:
            # Clean name quickly
            clean_name = re.sub(r'^(Prof\.?\s*|Dott\.?\s*|Dr\.?\s*)', '', professor_name.strip(), flags=re.IGNORECASE)
            
            self.driver.get("https://www.unimore.it/it/rubrica")
            
            # ULTRA FAST element finding
            name_input = WebDriverWait(self.driver, 3).until(
                EC.presence_of_element_located((By.XPATH, "//input[@name='name_1']"))
            )
            name_input.clear()
            name_input.send_keys(clean_name)
            
            search_button = self.driver.find_element(By.XPATH, "//button[@id='edit-submit-rubrica-role']")
            self.driver.execute_script("arguments[0].click();", search_button)
            
            # MINIMAL wait
            time.sleep(1)
            
            # FAST card scanning
            cards = self.driver.find_elements(By.CSS_SELECTOR, ".rubrica__wrapper")
            
            # Quick surname matching
            surname = clean_name.split()[-1].upper() if clean_name.split() else ""
            
            for card in cards:
                try:
                    name_elem = card.find_element(By.CSS_SELECTOR, ".rubrica__name")
                    if surname in name_elem.text.upper():
                        
                        # LIGHTNING FAST email extraction
                        try:
                            email_elem = card.find_element(By.CSS_SELECTOR, ".rubrica__email a")
                            email = email_elem.get_attribute('href').replace('mailto:', '')
                        except:
                            email = card.find_element(By.CSS_SELECTOR, ".rubrica__email").text.replace('E-mail: ', '')
                        
                        personal_link = card.find_element(By.CSS_SELECTOR, ".rubrica__button a")
                        personal_page_url = personal_link.get_attribute('href')
                        
                        return {'email': email, 'personal_page_url': personal_page_url}
                        
                except:
                    continue
            
            return None
            
        except Exception as e:
            return None

    def ultra_fast_course_link(self, personal_page_url, target_course):
        """ULTRA FAST course link extraction"""
        try:
            self.driver.get(personal_page_url)
            
            # SKIP cookie popup handling for speed
            
            # INSTANT tab clicking
            try:
                insegnamenti_tab = WebDriverWait(self.driver, 2).until(
                    EC.element_to_be_clickable((By.XPATH, "//a[@href='#insegnamenti']"))
                )
                self.driver.execute_script("arguments[0].click();", insegnamenti_tab)
                time.sleep(0.5)  # MINIMAL wait
            except:
                return None
            
            # LIGHTNING FAST H3 scanning
            h3_elements = self.driver.find_elements(By.TAG_NAME, "h3")
            course_words = target_course.lower().split()
            
            # Find first reasonable match (don't wait for perfect match)
            for h3 in h3_elements[:10]:  # Only check first 10 H3s for speed
                try:
                    h3_text = h3.text.strip().lower()
                    # Quick match - if any significant word matches, use it
                    for word in course_words:
                        if len(word) > 3 and word in h3_text:
                            try:
                                child_link = h3.find_element(By.TAG_NAME, "a")
                                self.driver.execute_script("arguments[0].click();", child_link)
                            except:
                                self.driver.execute_script("arguments[0].click();", h3)
                            
                            time.sleep(1)  # MINIMAL wait
                            return self.driver.current_url
                except:
                    continue
            
            return None
                
        except Exception as e:
            return None

    def ultra_fast_course_info(self):
        """ULTRA FAST course info extraction"""
        course_info = {
            'nome_corso': '', 'tipo_laurea': '', 'anno_corso': '', 
            'percorso_corso': '', 'textbook_info': ''
        }
        
        try:
            # INSTANT dropdown clicking
            info_elem = WebDriverWait(self.driver, 2).until(
                EC.element_to_be_clickable((By.XPATH, "//dt[contains(text(), 'Informazioni generali')]"))
            )
            self.driver.execute_script("arguments[0].click();", info_elem)
            time.sleep(0.5)  # MINIMAL wait
            
            # FAST data extraction - only get essential fields
            try:
                corso_elem = self.driver.find_element(By.XPATH, "//dt[@title='Corso di studi']/following-sibling::dd[1]")
                course_info['nome_corso'] = self.clean_text_ultra_fast(corso_elem.text)
            except:
                pass
            
            try:
                tipo_elem = self.driver.find_element(By.XPATH, "//dt[@title='Tipo di corso']/following-sibling::dd[1]")
                course_info['tipo_laurea'] = self.clean_text_ultra_fast(tipo_elem.text)
            except:
                pass
            
            try:
                anno_elem = self.driver.find_element(By.XPATH, "//dt[@title='Anno di corso']/following-sibling::dd[1]")
                course_info['anno_corso'] = self.clean_text_ultra_fast(anno_elem.text)
            except:
                pass
            
        except:
            pass
        
        # SKIP textbook extraction for maximum speed (or make it optional)
        # Textbook extraction adds significant time
        
        return course_info

    def ultra_fast_process_course(self, course_data):
        """ULTRA FAST single course processing"""
        course_name = course_data['course_name']
        all_professors = course_data['professor_name']
        main_professor = course_data['main_professor']
        row_number = course_data['row_number']
        
        try:
            # Step 1: ULTRA FAST rubrica
            rubrica_result = self.ultra_fast_rubrica_search(main_professor)
            if not rubrica_result:
                return None
            
            # Step 2: ULTRA FAST course link
            course_link = self.ultra_fast_course_link(rubrica_result['personal_page_url'], course_name)
            if not course_link:
                return None
            
            # Step 3: ULTRA FAST course info
            course_info = self.ultra_fast_course_info()
            
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
            
            print(f"⚡ ULTRA Worker {self.worker_id}: ✅ Row {row_number}")
            return result
            
        except Exception as e:
            print(f"⚡ ULTRA Worker {self.worker_id}: ❌ Row {row_number}")
            return None

def worker_process_courses(worker_id, courses_batch):
    """Worker process function for multiprocessing"""
    bot = UltraFastUnimoreBot(worker_id)
    
    if not bot.setup_ultra_fast_driver():
        return []
    
    results = []
    try:
        for course_data in courses_batch:
            result = bot.ultra_fast_process_course(course_data)
            if result:
                results.append(result)
            
            # NO DELAY between courses for maximum speed
        
    except Exception as e:
        print(f"❌ ULTRA Worker {worker_id}: Process error: {e}")
    finally:
        if bot.driver:
            bot.driver.quit()
    
    print(f"⚡ ULTRA Worker {worker_id}: COMPLETED {len(results)} courses")
    return results

def get_all_courses():
    """Get all courses with a single quick scan"""
    print("📊 Getting all courses...")
    
    bot = UltraFastUnimoreBot(0)
    if not bot.setup_ultra_fast_driver():
        return []
    
    try:
        schedule_url = "https://www.orariolezioni.unimore.it/Orario/Dipartimento_di_Economia_Marco_Biagi/2025-2026/2270/ttHtml.html"
        bot.driver.get(schedule_url)
        time.sleep(2)
        
        courses_data = []
        rows = bot.driver.find_elements(By.TAG_NAME, "tr")
        
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
                        'row_number': row_num
                    })
                    
            except Exception as e:
                continue
        
        print(f"📊 Found {len(courses_data)} total courses")
        return courses_data
        
    except Exception as e:
        print(f"❌ Error getting courses: {e}")
        return []
    finally:
        bot.driver.quit()

def main():
    """ULTRA FAST main execution"""
    print("⚡⚡⚡ ULTRA FAST UNIMORE BOT STARTING ⚡⚡⚡")
    
    # MAXIMUM WORKERS for your system
    max_workers = 6  # Increase this for even more speed (monitor your RAM)
    
    print(f"🚀 Using {max_workers} ULTRA FAST workers")
    
    # Get all courses
    all_courses = get_all_courses()
    if not all_courses:
        print("❌ No courses found")
        return
    
    # Split into batches for parallel processing
    batch_size = max(1, len(all_courses) // max_workers)
    course_batches = [
        all_courses[i:i + batch_size] 
        for i in range(0, len(all_courses), batch_size)
    ]
    
    print(f"📦 Split into {len(course_batches)} batches")
    print(f"⏱️ Starting ULTRA FAST processing...")
    
    start_time = time.time()
    all_results = []
    
    # Use multiprocessing for maximum speed
    with mp.Pool(processes=max_workers) as pool:
        # Submit all batches
        futures = []
        for i, batch in enumerate(course_batches):
            if batch:
                future = pool.apply_async(worker_process_courses, (i, batch))
                futures.append(future)
        
        # Collect results
        for future in futures:
            try:
                batch_results = future.get(timeout=300)  # 5 minute timeout per batch
                all_results.extend(batch_results)
            except Exception as e:
                print(f"❌ Batch failed: {e}")
    
    end_time = time.time()
    processing_time = end_time - start_time
    
    print(f"\n⚡⚡⚡ ULTRA FAST PROCESSING COMPLETE! ⚡⚡⚡")
    print(f"⏱️ Total time: {processing_time:.1f} seconds")
    print(f"📊 Courses processed: {len(all_results)}")
    print(f"🚀 Speed: {len(all_results)/processing_time*60:.1f} courses/minute")
    
    # Save results immediately
    if all_results:
        timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f'unimore_ultra_fast_{timestamp}.csv'
        
        df = pd.DataFrame(all_results)
        df.to_csv(filename, index=False, encoding='utf-8-sig')
        
        print(f"💾 ULTRA FAST results saved: {filename}")
        print(f"🎉 SUCCESS: {len(all_results)} courses extracted!")

if __name__ == "__main__":
    main()