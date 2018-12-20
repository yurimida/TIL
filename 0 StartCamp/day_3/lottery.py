# my_numbers = [1,45,3,35,5,7]
# real_numbers = [1,2,3,4,5,6]

# bonus_number = [7]


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

   

    
print(get_lotto(1))
am_I_lucky(pick_lotto(), get_lotto(1))



# # result = am_I_lucky(my_numbers, real_numbers)

# #     return 
# #     {
# #      'numbers' : numbers, 
# #      'bonus' : bonus_number
# #     }

# # print(numbers.sort, bonus_number)

# # result = am_I_lucky(my_numbers, real_numbers)








# # my_numbers = random.sample(numbers,6)
# # my_numbers.sort()