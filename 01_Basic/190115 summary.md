# 190115 summary

### 04_recurcive_function

팩토리얼

치킨쿠폰 

피보나치수열

스퀘어루트 

위의 네개는 풀줄 알아야함.



## 재귀 함수

def fac(n):

​	if n == 1:

​		return 1

​	return n* fac(n-1)



### 05_data_structure

![1547515673538](C:\Users\student\AppData\Roaming\Typora\typora-user-images\1547515673538.png)

```a = 1

b = 'a'

c = True

d = {'a':1}

e = [1, 2, 3]


copy_a, copy_b, copy_c = a, b, c




def f():

    return 0

    

print(f)

    

l = lambda : 0


class Pikachu:

    def a():

        return 0 

        

pika = Pikachu()


print(f, l, Pikachu, pika)


print(l)


s = { 1, 2, 3}


t = (1, 2, 3)


r = range(10)


c_d,c_e,c_f = d, e, f



python tutor에 위의 코드 긁어보기.



## List comprehension 



pairs = [(boy,girl) for boy in boys for girl in girls] 이렇게 쓰면 두배정도 차이가 난다.



## 06_OOP_intro