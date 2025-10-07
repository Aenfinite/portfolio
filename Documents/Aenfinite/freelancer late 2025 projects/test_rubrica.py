from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service
import time

def search_professor(name: str):
    # Use webdriver manager to automatically handle ChromeDriver
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service)
    
    try:
        print(f"🔍 Searching for professor: {name}")
        
        # 1. Open the rubrica page
        print("📄 Opening rubrica page...")
        driver.get("https://www.unimore.it/it/rubrica")
        time.sleep(3)  # wait for page to load
        
        print(f"📍 Current URL: {driver.current_url}")
        print(f"📄 Page title: {driver.title}")
        
        # 2. Let's examine what input fields are available
        print("\n🔍 Looking for input fields...")
        inputs = driver.find_elements(By.TAG_NAME, "input")
        for i, inp in enumerate(inputs):
            print(f"Input {i+1}: type='{inp.get_attribute('type')}', name='{inp.get_attribute('name')}', id='{inp.get_attribute('id')}', placeholder='{inp.get_attribute('placeholder')}'")
        
        # 3. Let's look for buttons
        print("\n🔘 Looking for buttons...")
        buttons = driver.find_elements(By.TAG_NAME, "button")
        for i, btn in enumerate(buttons):
            print(f"Button {i+1}: text='{btn.text}', type='{btn.get_attribute('type')}', value='{btn.get_attribute('value')}', id='{btn.get_attribute('id')}'")
        
        # 4. Try to find the search input field
        input_elem = None
        
        # Try different approaches
        search_approaches = [
            ("placeholder", "//input[@placeholder*='nome']"),
            ("name attribute", "//input[@name='name_1']"),
            ("text type", "//input[@type='text']"),
            ("generic", "//input[contains(@class, 'form-control')]")
        ]
        
        for approach_name, xpath in search_approaches:
            try:
                input_elem = driver.find_element(By.XPATH, xpath)
                print(f"✅ Found input using {approach_name}: {xpath}")
                break
            except:
                print(f"❌ Failed with {approach_name}")
                continue
        
        if not input_elem:
            print("❌ Could not find search input field")
            return None
        
        # 5. Type the professor name
        print(f"⌨️ Typing professor name: {name}")
        input_elem.clear()
        input_elem.send_keys(name)
        time.sleep(1)
        
        # 6. Try to find and click the "Cerca" button
        search_button = None
        
        button_approaches = [
            ("exact ID", "//button[@id='edit-submit-rubrica-role']"),
            ("drupal selector", "//button[@data-drupal-selector='edit-submit-rubrica-role']"),
            ("submit with value", "//button[@type='submit' and @value='Cerca']"),
            ("submit with class", "//button[contains(@class, 'form-submit') and @value='Cerca']"),
            ("value Cerca", "//button[@value='Cerca']"),
            ("text Cerca", "//button[contains(text(), 'Cerca')]"),
            ("submit type", "//button[@type='submit']")
        ]
        
        for approach_name, xpath in button_approaches:
            try:
                search_button = driver.find_element(By.XPATH, xpath)
                print(f"✅ Found button using {approach_name}: {xpath}")
                print(f"   Button ID: {search_button.get_attribute('id')}")
                print(f"   Button class: {search_button.get_attribute('class')}")
                print(f"   Button visible: {search_button.is_displayed()}")
                print(f"   Button enabled: {search_button.is_enabled()}")
                break
            except:
                print(f"❌ Failed with {approach_name}")
                continue
        
        if not search_button:
            print("❌ Could not find search button")
            return None
        
        # 7. Click the search button
        print("🔘 Clicking search button...")
        
        # Try multiple click methods
        click_methods = [
            ("direct click", lambda: search_button.click()),
            ("JavaScript click", lambda: driver.execute_script("arguments[0].click();", search_button)),
            ("scroll and click", lambda: (driver.execute_script("arguments[0].scrollIntoView(true);", search_button), time.sleep(1), search_button.click())),
            ("form submit", lambda: input_elem.submit())
        ]
        
        clicked = False
        for method_name, click_func in click_methods:
            try:
                print(f"   Trying {method_name}...")
                click_func()
                print(f"   ✅ {method_name} successful!")
                clicked = True
                break
            except Exception as e:
                print(f"   ❌ {method_name} failed: {e}")
                continue
        
        if not clicked:
            print("❌ All click methods failed!")
            return None
        
        # Wait for results to load
        time.sleep(5)
        
        print(f"📍 URL after search: {driver.current_url}")
        print(f"📄 Title after search: {driver.title}")
        
        # 8. Look for results
        print("\n🔍 Looking for search results...")
        
        # Check for rubrica cards
        rubrica_cards = driver.find_elements(By.CSS_SELECTOR, ".rubrica__wrapper")
        print(f"📋 Found {len(rubrica_cards)} rubrica cards")
        
        if rubrica_cards:
            for i, card in enumerate(rubrica_cards):
                try:
                    name_elem = card.find_element(By.CSS_SELECTOR, ".rubrica__name")
                    email_elem = card.find_element(By.CSS_SELECTOR, ".rubrica__email a")
                    
                    prof_name = name_elem.text.strip()
                    prof_email = email_elem.get_attribute('href').replace('mailto:', '')
                    
                    print(f"👤 Professor {i+1}: {prof_name}")
                    print(f"📧 Email: {prof_email}")
                    print("---")
                except Exception as e:
                    print(f"⚠️ Error processing card {i+1}: {e}")
        
        # Return page source for inspection
        return driver.page_source

    except Exception as e:
        print(f"❌ Error during search: {e}")
        return None
    
    finally:
        print("🔒 Keeping browser open for 10 seconds to inspect...")
        time.sleep(10)
        driver.quit()

if __name__ == "__main__":
    prof_name = "Forni Mario"
    print("🤖 RUBRICA EXPLORATION SCRIPT")
    print("=" * 40)
    
    html = search_professor(prof_name)
    
    if html:
        print(f"\n📄 Page source length: {len(html)} characters")
        print("✅ Search completed successfully!")
    else:
        print("❌ Search failed!")