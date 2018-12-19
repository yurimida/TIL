

# 181218 수업정리

## 1. 개발 환경 설정

#### 1.visual studio code

* *하고  space 누르면 점으로 바뀜

* ls : list  보여주기

* cd/c ( change directory)

* cd users/

* cd ~/TIL/ :  til 파일로가기 .

* mkdir : 폴더 생성

* rmdir :  폴더 삭제 

* touch :  파일 생성

* python   파일이름 : 파이썬 파일 실행 

* exit(): python  실행 종료

* ctrl + / : 전체 주석처리 & 해제

  ```python
  >>> last_name = "Lee"
  >>> print(last_name)
  Lee
  >>> first_name='yurim'
  >>> full_name= last_name+first_name
  >>> full_name
  'Leeyurim'
  >>> type(full_name)
  <class 'str'>
  ```


* **2 : 제곱의 표시

* 100/10 = 10.0 : /로 하면 실수가 나옴.

* 10 % 3 = 1 : 나머지가 나오게 되는 것임.

  ```python
  if (15 % 2 == 1):
       print('홀수')
  else:
       print('짝수')
              
  ```

* ctrl + S : 저장

  ```python
   numbers = list(range(1,26))
  >>> numbers
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]
  
  ```

```python
>>> number  = '123'
>>> int(number)
123
>>> number
'123'
>>> number = int('123')
>>> number
123
```



* type cast라고 부른다.

```python
>>> float(100.0)
100.0
>>> int(100.0)
100
>>> str(100)
'100'
>>> bool(1)
True
>>> bool(0)
False
```





#### 2.python list

#### list 만들기

` `` 세개 하고 enter누르면 밑에 처럼 박스가 생김.

```python
mcu = [
    ['ironman','captain','dr.strange'],
    ['xmen','deadpool'],
    ['spiderman']
]

disney= mcu[0]
dr.strange = disney[2]
```

`` 하면 아래처럼 단어가 박스가 생긴다.

`dr.strange`에 접근하려면 어떻게 해야할까?

#### list 추출하기 

1. `[0]` 처럼 인덱스 접근하기
2. `[1],[10]` 처럼 잘라내기 
3. 접근은 무조건 [] 대괄호 



#### list  연산

```python
team = [
    'john',
    10000,
    'neo',
    100,
    'tak',
    40500
]

>>> new_member = ['js',10]
>>> team = team+ new_member # team += new_member
>>> team
['john', 10000, 'neo', 100, 'tak', 40500, 'js', 10]
```

#### list 삭제

```python
del(team[2]) : 그 부분만 삭제 
del(team[3:4]) : 연속해서 삭제 
```



#### dict 만들기 & 추출하기 

```python
work_people = [ # 띄어쓰기 할때 _ 안 붙이면 오류남.
    {
        'name' : 'john',
        'email': 'john@gmail'  #'key':'value'

    },
    {
        'name':'neo',
        'email':'neo@gmail'

    },
    {
        'name':'tak',
        'email':'tak@gmail'
    }
]
>>> p['name'] # work_people[2]['name']와 같은말임.
'tak'
>>> p['email']
'tak@gmail'
```



#### 내림차순 & 오름차순 정렬

```python
 first = [11.25,18.0,20.0]
 second = [10.75,9.50]
 full = second+first
 full_sorted = full.sort
  full_sorted = sorted(full)
  full_sorted
[9.5, 10.75, 11.25, 18.0, 20.0]
full_sorted = sorted(full, reverse = True)
full_sorted
[20.0, 18.0, 11.25, 10.75, 9.5]
```



#### method 

```python
dust = 100 #int
>>> language = 'python' #str
>>> samsung = ['elect','sds','s1'] #list
>>> samsung.index('sds')
1
>>> samsung.count('s1')
```

```python
>>> lang = 'python'
>>> lang.capitalize()
'Python'
>>> lang
'python'
>>> lang.replace('on','off')
'pythoff'
>>> lang
'python'

# 주어인 lang은 바뀌지 않음.
```

```python
samsung.append('bio') #원본이 바뀜.
>>> samsung
['elect', 's1', 'sds', 'bio']
```

* 표만들기 : shift + \
* 두껍게: ctrl + b 





#### web browser

```python
import webbrowser

url = 'http://naver.com'
webbrowser.open(url)
```



```python
keywords = [
    'python',
    'javascript',
    'java',
    'ruby'
]

for keyword in keywords:
    url = 'https://search.daum.net/search?w=tot&q='+keyword
    webbrowser.open_new(url)
```

```python
#url 요청 => 응답 => 복사 붙여넣기 

import requests

url = 'https://www.nlotto.co.kr/common.do?method=getLottoNumber&drwNo=837'

response = requests.get(url, verify=False)  #  verify=False 안전하지 않아도 받겠다.
print(response.text)  #response.text 텍스트만 받겠다.
```



#### lottery (**)?

```python
import requests
 
 url = 'https://www.nlotto.co.kr/common.do?method=getLottoNumber&drwNo=837'
 response = requests.get(url, verify = False)
 lotto_data = response.json()
 real_numbers = []

 for key, value in lotto_data.items():
     if 'drwtNo' in key:
          real_numbers.append(value)

real_numbers.sort()
bonus_number = lotto_data['bnusNo']
print(real_numbers)
```





#### lottery  homework

```python
#my_number, real_numbers, bonus_number
# 1등 : my_numbers == real_numbers
# 2등 : real & my 5개가 같고, my의 나머지 하나가 bonus_number
# 3등 : real & my가 5개가 같다 
# 4등 : real & my가 4개가 같다
# 5등 : real & my가 3개가 같다
# 꽝

#print (1,2,3,4,5등을 출력해 내기)
```



#### temperature

* darksky 라이브러리

```python
from darksky import forecast

multicampus = forecast('dc1ef520b6e2be5d5f4c2736256745ec', 37.501311, 127.037471)

print(multicampus['currently']['temperature'])
```





#### git ( git 추가 삭제하기)



```python
student@M70323 MINGW64 ~/TIL (master)
$ ls -a
 .   ..   .git  '0 StartCamp'

student@M70323 MINGW64 ~/TIL (master)
$ rm -rf .git/ # git 삭제

student@M70323 MINGW64 ~/TIL
$ ls -a
 .   ..  '0 StartCamp'

student@M70323 MINGW64 ~/TIL
$ git init #git에 넣기
Initialized empty Git repository in C:/Users/student/TIL/.git/

student@M70323 MINGW64 ~/TIL (master)
$ ls -a
 .   ..   .git  '0 StartCamp'

```

* git commit -m '~181218' : 버전이 하나 만들어짐.
