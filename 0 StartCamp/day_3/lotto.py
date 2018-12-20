import requests
import random

def get_lotto():
    url = 'https://www.nlotto.co.kr/common.do?method=getLottoNumber&drwNo=837'

    response = requests.get(url, verify=False)
    lotto_data = response.json()

    numbers = []
    for key, value in lotto_data.items():
        if 'drwtNo' in key:
            numbers.append(value)

    numbers.sort()
    bonus_number = lotto_data['bnusNo']
    
    final_dict = {
        'numbers': numbers,
        'bonus': bonus_number
    }
    
    return final_dict 

real_numbers = get_lotto()
print(real_numbers)