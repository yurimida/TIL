my_numbers = [1,45,3,35,5,7]
real_numbers = [1,2,3,4,5,6]
bonus = 7
count = 0
for my_number in my_numbers:
     for real_number in real_numbers:
        if my_number == real_number:
          count += 1

print(count,"개")

if count == 6:
     print(1)

elif count == 5 and bonus in my_numbers:
     print(2)

elif count == 5:
     print(3)

elif count ==3:
     print("5","등")

print("-----------------------------------------------------")

#두번째 방법

my_numbers = [1,45,3,35,5,7]
real_numbers = [1,2,3,4,5,6]
bonus = 7

match_count = len(my_numbers & real_numbers)
print(match_count)

if match_count == 6:
    print('1등')

elif match_count == 5 and bonus in my_numbers:
    print('2등')