import webbrowser

url = 'http://naver.com'
webbrowser.open(url)

import webbrowser

url = 'https://search.daum.net/search?w=tot&q=bts'
webbrowser.open(url)

https://search.daum.net/search?q=bts


keywords = [
    'python',
    'javascript',
    'java',
    'ruby'
]

for keyword in keywords:
    url = 'https://search.daum.net/search?w=tot&q='+keyword
    webbrowser.open_new(url)