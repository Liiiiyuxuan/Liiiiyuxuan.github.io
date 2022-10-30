from selenium import webdriver

driverPath = 'chromedriver.exe'

driver = webdriver.Chrome(driverPath)

driver.get('http://www.google.ca')

print(driver.page_source)