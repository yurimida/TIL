# 181220 summary

## 1.HTML

* h1은 가장 큰 제목 
* 스타일 시트를 통해서 스타일을 변경해야함.
* <*br> 가진 의미가 완전히 다르다. (**앞에 별표 빼고 생각.)
*  API는 통로같은 느낌. (ex: api를 통해서 data를 받음)

## 2. 함수 결과값

```python
- a = sorted([3,2,1])
- def sorted():
- ​       blahblahblah
- return ask



b =  [3,2,1].sort()
def sort()

​      blahblahblah
```

* 두 개의 차이점을 유심히 보기.
* return이 나오고 안나오고에 따라 결과값이 바뀜.

## 3. lottery 

* https://gist.github.com/eduyu/ab7805c984f7576baf5c6f8d7c73c270

* ```python
  import requests
  import random
  
  def get_lotto():   # def 는 정의를 내리는 것임. 따라서 밑에를 바꾸고 싶으면 def 부터 바꿔야함.
     
  
      url = 'https://www.nlotto.co.kr/common.do?method=getLottoNumber&drwNo=837'
  
      response = requests.get(url, verify = False)
      lotto_data = response.json()
  
      numbers = []
  
      for key, value in lotto_data.items():    
          
          #if key에 drwtNo가 있다면 value값을 numbers.append(추가하다)에 넣겠다.
         if 'drwtNo' in key:
            numbers.append(value)
  
      numbers.sort() #numbers의 값을 정리.
      bonus_number = lotto_data['bnusNo'] # json으로 정리해준 lotto_data에 있는 'bnusNo'를 bonus_number에 넣는다.
  
      final_dict = {
          'numbers' : numbers ,
          'bonus' : bonus_number
      }
      
      #final dict에 number과 bonus를 넣을꺼고
  
      return final_dict
          
      # 함수를 return 받는다.
  real_numbers = get_lotto()
  
  #get lotto라는 함수를 real_numbers안에 넣고 print한다.
  print(real_numbers)
  
  ```

* ### lottery  완성

* ```python
  import requests
  import random
  
  def get_lotto(draw_no):   # def 는 정의를 내리는 것임. 따라서 밑에를 바꾸고 싶으면 def 부터 바꿔야함.
     
  
      url = 'https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=' + str(draw_no)
  
      response = requests.get(url)
      lotto_data = response.json()
  
      numbers = []
  
      for key, value in lotto_data.items():
         if 'drwtNo' in key:
            numbers.append(value)
  
      numbers.sort()
      bonus_number = lotto_data['bnusNo']
  
      final_dict = {
          'numbers' : numbers ,
          'bonus' : bonus_number
      }
  
      return final_dict
  
  
  # real_numbers = get_lotto(3)
  
  # print(real_numbers)
  
  
  import requests
  import random
  
  def pick_lotto():
      return random.sample(range(1, 46), 6)
  
  my_numbers = pick_lotto()
  print(my_numbers)
  
  
  
  #am_I_lucky?
  
  def am_I_lucky(pick, draw):
      match = set(pick) & set(draw['numbers'])
      bonus = draw['bonus']
              
      print(match)
      print("맞춘 번호 갯수:", len(match))
  
      print("보너스 번호:", bonus)
  
      if(len(match) == 6):
          print("1등입니다.")
      elif(len(match) ==5 and bonus == set(pick)):
          print("2등입니다.")
          
      elif(len(match)==5):
          print("3등입니다.")
          
          
      elif(len(match)==4):
          print("4등입니다.")
  
      elif(len(match)==3):
          print("2등입니다.")
  
      
      else:
          print("꽝")
  
     
  
      
  
  am_I_lucky(pick_lotto(), get_lotto(1))
  # 밑에 이 함수를 위에 정의된 def am_I_lucky(pick, draw)에 알맞게 넣어줘서 돌아가는 것.
  ```


