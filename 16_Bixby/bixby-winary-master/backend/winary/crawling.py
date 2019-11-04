# -*- coding: utf-8
import requests
from bs4 import BeautifulSoup


req = requests.get("http://www.keumyang.com/mall/KYDetail.ky?ps_goid=7942")
html = req.text
# print(html)
soup = BeautifulSoup(html, "html.parser")
info_ul = soup.select("div.detail_wine > div.detail_top > dl > dd > ul > li:nth-child(9) > span.txt")

print(info_ul)

