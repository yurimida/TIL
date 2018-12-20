# my_numbers = [1,45,3,35,5,7]
# real_numbers = [1,2,3,4,5,6]

# bonus_number = [7]


# b3 = list(set(my_numbers).intersection(real_numbers))
# b4 = list(set(my_numbers).intersection(bonus_number))


# print(b3)
# print("맞춘 번호 갯수:", len(b3))

# print(b4)
# print("보너스 번호 갯수:", len(b4))

# if(len(b3)==6):
#     print("1등입니다.")

# elif(len(b3)==5,len(b4)==1):
#     print("2등입니다.")

# elif(len(b3)==5):
#     print("3등입니다.")

# elif(len(b3)==4):
#     print("4등입니다.")

# elif(len(b3)==3):
#     print("5등입니다.")

# else:
#     print("꽝!!!!")






# import requests
# import random

# def pick_lotto():
  
#     numbers = random.sample(list(range(1,46)),6)  #((range(1,46)),6)  이렇게 해도 가능.
#     numbers.sort()
#     numbers = set(numbers)
#     return numbers  # 결괏값을 뱉어달라는 이야기. 함수는 return 하거나 None이거나.

# my_numbers = pick_lotto()
# print(my_numbers)   #None은 아무것도 없어



import requests
import random

def get_lotto():   # def 는 정의를 내리는 것임. 따라서 밑에를 바꾸고 싶으면 def 부터 바꿔야함.
   

    url = 'https://www.nlotto.co.kr/common.do?method=getLottoNumber&drwNo=837'

    response = requests.get(url, verify = False)
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
         

real_numbers = get_lotto()

print(real_numbers)

# result = am_I_lucky(my_numbers, real_numbers)

#     return 
#     {
#      'numbers' : numbers, 
#      'bonus' : bonus_number
#     }

# print(numbers.sort, bonus_number)


# real_numbers = get_lotto()
# result = am_I_lucky(my_numbers, real_numbers)








# my_numbers = random.sample(numbers,6)
# my_numbers.sort()