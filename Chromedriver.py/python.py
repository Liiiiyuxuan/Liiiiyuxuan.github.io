from selenium import webdriver

driverPath = 'chromedriver.exe'

driver = webdriver.Chrome(driverPath)

driver.get('http://www.google.com')

print(driver.page_source)