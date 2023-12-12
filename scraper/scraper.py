import os
import re
import shutil
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from datetime import datetime, timedelta
from pymongo import MongoClient 
import pandas as pd
import time
import random
import requests
from time import sleep

userName = '' # email or phone number
passWord = '' # password
pageNumber = 10
mongoURI = 'mongodb+srv://adminPBL4:admin@pbl4.xemvqhk.mongodb.net/PBL4?retryWrites=true&w=majority'
DATABASE_NAME = "PBL4"
today = datetime.now().strftime("%Y-%m-%d")

def save_excel_to_mongoDB(path):
    try:
        # connect to mongodb
        client = MongoClient(mongoURI)
        db = client[DATABASE_NAME]
        collection = db['posts']
        if client.server_info():
            print("Connected to MongoDB!")
        # read excel file
        df = pd.read_excel(path)
        data = df.to_dict('records')
        # insert data to mongodb
        collection.delete_many({}) #delete old posts
        collection.insert_many(data)
        print("Inserted ", len(data), " posts to MongoDB!")
    except Exception as e:
        print(f"Error: {e}")
    finally:
        client.close()
        print("Connection closed!")

def save_to_excel(post_list, filename, folderPath):
    path = folderPath + filename
    if os.path.exists(path):
        # load the existing data from the file
        post_df_full = pd.read_excel(path)
    else:
        # create a new DataFrame if the file doesn't exist
        post_df_full = pd.DataFrame(columns=[])
        
    for post in post_list:
        post_entry = post
        fb_post_df = pd.DataFrame.from_dict(post_entry, orient='index')
        fb_post_df = fb_post_df.transpose()
        post_df_full = post_df_full._append(fb_post_df)

    post_df_full.to_excel(path, index=False)    
    print("Saved ", len(post_list))
    save_excel_to_mongoDB(path)

def writeFileTxt(fileName, content):
    with open(fileName, 'a') as f1:
        f1.write(content + '\n')

def readData(fileName):
    f = open(fileName, 'r', encoding='utf-8')
    data = []
    for i, line in enumerate(f):
        try:
            line = repr(line)
            line = line[1:len(line) - 3]
            data.append(line)
        except:
            print("err")
    return data

def initDriverProfile():
    # Đường dẫn đến thư mục chứa file python hiện tại
    current_directory = os.path.dirname(os.path.abspath(__file__))
    # Đường dẫn đến file chromedriver.exe
    CHROMEDRIVER_PATH = current_directory + "\chromedriver.exe"
    Service = webdriver.chrome.service.Service(CHROMEDRIVER_PATH)
    Options = webdriver.ChromeOptions()
    Options.add_argument('--no-sandbox')
    Options.add_argument("--disable-blink-features=AutomationControllered")
    Options.add_experimental_option('useAutomationExtension', False)
    prefs = {"profile.default_content_setting_values.notifications": 2}
    Options.add_experimental_option("prefs", prefs)
    Options.add_argument("--disable-dev-shm-usage")
    Options.add_experimental_option("excludeSwitches", ["enable-automation"])
    # Ẩn chrome
    Options.add_argument('--disable-headless')
    # không hiển thị thông báo đăng nhập chrome
    Options.add_argument("--disable-infobars")
    # Hiển thị lớn nhất trình duyệt
    Options.add_argument("--start-minimized")
    # không hiển thị thông báo extensions
    Options.add_argument("--disable-extensions")
    driver = webdriver.Chrome(service=Service, options=Options,keep_alive=True)
    return driver

def convert_time(t):
    date = "Failed to fetch!"
    if(len(t) > 10):
        if "," in t:
            date = datetime.strptime(t, "%B %d, %Y at %I:%M %p")
        else:
            t = t.replace(" at", f", {datetime.now().year} at")
            date = datetime.strptime(t, '%B %d, %Y at %I:%M %p')
        return date.strftime("%Y-%m-%d %H:%M:%S")
    
    if 'h' in t.lower() or "hr" in t.lower() or "hrs" in t.lower():
        hours_to_subract = re.sub(r"\D", '', t)
        date = datetime.today() - timedelta(hours=int(hours_to_subract))
        return date.strftime("%Y-%m-%d %H:%M:%S")

    if 'm' in t.lower() or "min" in t.lower() or "mins" in t.lower():
        minutes_to_subtract = re.sub(r"\D", '', t)
        date = datetime.now() - timedelta(minutes=int(minutes_to_subtract))
        return date.strftime("%Y-%m-%d %H:%M:%S")

    if 's' in t.lower():
        seconds_to_subtract = re.sub(r"\D", '', t)
        date = datetime.now() - timedelta(seconds=int(seconds_to_subtract))
        return date.strftime("%Y-%m-%d %H:%M:%S")

    elif 'd' in t.lower() or "ds" in t.lower():
        days_to_subtract = re.sub(r"\D", '', t)
        date = datetime.today() - timedelta(days=int(days_to_subtract))
        return date.strftime("%Y-%m-%d %H:%M:%S")

    return date

def checkLiveClone(driver):
    try:
        driver.get("https://mbasic.facebook.com/")
        time.sleep(2)
        driver.get("https://mbasic.facebook.com/")
        time.sleep(1)
        elementLive = driver.find_elements(by='name', value="view_post")
        if (len(elementLive) > 0):
            print("Live")
            return True

        return False
    except:
        print("view fb err")
        
def random_sleep(min_s, max_s):
    time.sleep(random.randint(min_s, max_s))

def loginFB(driver, username, password):
    driver.get("https://mbasic.facebook.com/login/?next&ref=dbl&fl&refid=8")
    random_sleep(10,12)
    userNameElement = driver.find_element(By.CSS_SELECTOR,"#m_login_email")#_by_css_selector("#m_login_email")
    userNameElement.send_keys(username)
    random_sleep(2,3)
    passwordElement = driver.find_element(By.CSS_SELECTOR,"#login_form > ul > li:nth-child(2) > section > input")#_by_css_selector("#login_form > ul > li:nth-child(2) > section > input")
    passwordElement.send_keys(password)
    random_sleep(2,3)
    btnSubmit = driver.find_element(By.CSS_SELECTOR,"#login_form > ul > li:nth-child(3) > input")
    btnSubmit.click()
    random_sleep(2,3)
    not_now = driver.find_element(By.CSS_SELECTOR, "#root > table > tbody > tr > td > div > div:nth-child(5) > a")
    not_now.click()
    print("login success")
    random_sleep(1,2)
    # end login


def getPostsID(driver, idGroup, numberId):
    try:
        fileIds = idGroup + '_ids.csv'
        driver.get('https://mbasic.facebook.com/groups/' + str(idGroup))
        file_exists = os.path.exists(fileIds)
        if (not file_exists):
            writeFileTxt(fileIds, '')

        sumLinks = readData(fileIds)
        while (len(sumLinks) < numberId):
            likeBtn = driver.find_elements(By.XPATH,'//*[contains(@id, "like_")]')
            if len(likeBtn):
                for id in likeBtn:
                    idPost = id.get_attribute('id').replace("like_", "")
                    if (idPost not in sumLinks):
                        sumLinks.append(idPost)
                        writeFileTxt(fileIds, idPost)
                        print(idPost)
            nextBtn = driver.find_elements(By.XPATH,'//a[contains(@href, "?bacr")]')
            if (len(nextBtn)):
                random_sleep(5,7)
                nextBtn[0].click()
            else:
                print('Next btn does not exist !')
                break
    except:
        print('Error')

def clonePostContent(driver, postId, groupname):
    try:
        postData = {"post_id": postId, "post_text" : "", "post_date": "", "post_url": "https://www.facebook.com/groups/" + groupname + "/posts/" + str(postId)}

        driver.get("https://mbasic.facebook.com/groups/" + groupname + "/posts/" + str(postId))
        
        posted_time = driver.find_element(By.TAG_NAME, 'abbr').text
        print(posted_time)
        if(len(posted_time)):
            postDate = convert_time(posted_time)
            print(postDate)
            postData["post_date"] = postDate

        contentElement = driver.find_elements(By.XPATH,"//div[@data-gt='{\"tn\":\"*s\"}']")
        if (len(contentElement) == 0):
            contentElement = driver.find_elements(By.XPATH,"//div[@data-ft='{\"tn\":\"*s\"}']")
            
        if (len(contentElement)):
            content = contentElement[0].text
            postData["post_text"] = content
        else:
            print("No text")
            return False

        return postData
    except:
        print("Fail clone Post")
        return False
        
def get_ID_List(driver, idGroup):
    try:
        page = 0
        idList = []
        fileIds = idGroup + '_ids.csv'
        driver.get('https://mbasic.facebook.com/groups/' + str(idGroup))
        file_exists = os.path.exists(fileIds)
        if (not file_exists):
            writeFileTxt(fileIds, '')

        sumLinks = readData(fileIds)
        
        while(page < pageNumber):
            likeBtn = driver.find_elements(By.XPATH,'//*[contains(@id, "like_")]')
            if len(likeBtn):
                for id in likeBtn:
                    idPost = id.get_attribute('id').replace("like_", "")
                    if (idPost not in sumLinks):
                        sumLinks.append(idPost)
                        idList.append(idPost)
                        writeFileTxt(fileIds, idPost)
                        print(idPost)
            page += 1
            nextBtn = driver.find_elements(By.XPATH,'//a[contains(@href, "?bacr")]')
            if (len(nextBtn)):
                random_sleep(5,7)
                nextBtn[0].click()
            else:
                print('Next btn does not exist !')
                break
        return idList
    except:
        print("Crawling failed")
        return False
    
def crawlPostData(driver, postIds, group):
    postList = []
    for id in postIds:
        try:
            time.sleep(2)
            dataPost = clonePostContent(driver, id, group)
            if (dataPost != False ):
                postList.append(dataPost)   
        except:
            print("Crawling failed")
            return False
    return postList

if __name__ == "__main__":
    driver = initDriverProfile()
    isLogin = checkLiveClone(driver)
    print(isLogin)
    if(isLogin == False):
        loginFB(driver, userName, passWord)
    
    group = input('Enter group name (e.g: vieclamCNTTDaNang): ')
    value = input('Enter 1 to start crawling, enter any other keys to exit: ')
    
    filename = group + "_" + today + "_posts.xlsx"
    folderPath = "./result/"
    if (int(value) == 1):
        # getPostsID(driver, group, 100)
        idList = get_ID_List(driver, group)
        postList = crawlPostData(driver, idList, group)
        if(postList != False):
            save_to_excel(postList, filename, folderPath)
            driver.close()
            print('Done!')
        else:
            driver.close()
            print("Crawling failed")
    else:
        print('Exit!')
        
# py scraper.py
