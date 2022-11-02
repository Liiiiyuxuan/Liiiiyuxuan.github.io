from selenium import webdriver

driverPath = 'chromedrivermac'

driver = webdriver.Chrome(driverPath)

driver.get('http://www.google.ca')

print(driver.page_source)