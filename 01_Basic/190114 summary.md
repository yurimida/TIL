# 190114 summary



단어들에 대해서 알고있어야함



## 식별자

말그대로 이름임 

치면 거기밑에 뭐가 나오는 

예약어들이 있고 그외에 우리가 함수 디파인하고 

이이름은 쓸수 없다.

대소문자 구분있음



## 인코딩선언

외울필요없음

손에 익혀놓는게 마음에 편함

코드 칠때 편함



## 주석

기계는 못 읽고 사람이 읽으라고

docstring 특별함

```python
print(ss3.__doc__)
```

더블쿼터 세개짜리 특별.  주석처럼 처리됨



## 코드라인

옳은 문법 

틀린 문법

; 이거 써도 돌긴 도는데 거의 안쓴다.

 줄을 여러줄 작성할 때는 역슬래시`\`를 사용하여 아래와 같이 할 수 있다. 

```PYTHON
a = 'longlongword'
if a\
== 'longlongword':
    print (a)
    
a = 'longlongword'
if a
== 'longlongword':
    print (a)
```



위에 두개 비교



## 변수

리스트 , 튜플 ,딕셔너리 

전체를 저장하는것처럼 보이지만 (튜터에서 보면 화살표로 향함)

걔네가 진짜 들어가는게 아니라 걔네는 멀리있고 변수가 저장하는것은 그 위치 

소화기 자체를 안고있는게 아니라 소화기의 위치를 가리킴.

변수는 `=`을 통해 할당(assignment) 된다. (주소를 잡은걸수도 있고 진짜 그 값을 잡은 걸수도있음.)



해당 변수의 메모리 주소를 확인하기 위해서는 `id()`를 활용한다.

나 자체도 모눈종이 안에 들어와있는 애임.

모눈종이라고 얘기하는 이게 메모리라고 부르는것. 램이라고 함.

얼만큼 많은 일을 할 수있느냐는



```python
a, b = 1, 2
print (a, b)

print(a)
print(b)

a, b = b, a
print(a, b)
```



```PYTHON
# 이건 될까요?  안돼요
x, y = 1
print(x)
print(y)
```



## 수치형

int와 float

```python
# 파이썬은 기존 C 계열 프로그래밍 언어와 다르게 정수 자료형에서 오버플로우가 없다.
# arbitrary-precision arithmetic를 사용하기 때문이다. 
import sys 
max_int = sys.maxsize
print(max_int)
max_int = sys.maxsize * sys.maxsize
print(max_int)
```

cpu에서 계산할수있는 가장 큰 숫자

파이썬에서는 엄청 큰 정수도 담을수있구나.



```python
# n진수 2, 8, 10, 16


binary_number = 0b100
octal_number = 0o777
print(binary_number)
print(octal_number)

decimal_number = 2019 
hexadecimal_number = 0xfff
print('''
2진수: {},
8진수: {},
10진수: {},
16진수: {},
'''.format(binary_number, octal_number,decimal_number,hexadecimal_number))

```

10진수만 쓰는게 아니라 다양한 숫자를 쓸수 있다.



## float

부동소수점을 사용한다.

이게 왜 나는지? 

우리가 의도하지 않은데로 동작한다는게 포인트

이상한 놈들 몇개 있음

```python
3.5 - 3.12 
```

 

우리가 생각한데로 동작하지 않음.



```python
# 처리방법 2. math 모듈을 통해 근사한 값인지 비교
# python 3.5부터는 math 모듈을 활용할 수 있다.
import math
math.isclose(a, b)
```

## complex

1j 제곱하면 -1 

이게 허수임.

```python


a = 3 - 4j 
type(a)
print(a.img)
print(a.real)
```



a라고 하는 오브젝트가 잡고있는 변수들 중에 img , real임.

피카츄와 같음



## bool



파이썬에는 `True`와 `False`로 이뤄진 `bool` 타입이 있다.

비교/논리 연산을 수행 등에서 활용된다.

다음은 `False`로 변환됩니다.
```
0, 0.0, (), [], {}, '', None
```



없으면 False라고 생각하면됨.



## None

정말 아무것도 없다.

대표적으로 return문 없는 함수는 None이 나옴.



## String

역슬래시 ' 가 하나임.



## string interpolation

```python
print("""
말하는대로,
쓰는대로,
다 써져요!
""")
```

주석의 역할과 string의 역할을 같이함.

f string(3.6이상에서만 지원됨.)

```python
print("""
my name is {}, nice to meet you {}
""".format(name, year))

```



## 산술 연산자

## 비교 연산자

## 논리 연산자

## 복합 연산자

## 기타 연산자

### Concatenation

숫자가 아닌 자료형은 `+` 연산자를 통해 합칠 수 있다.

### Containment Test

`in` 연산자를 통해 속해있는지 여부를 확인할 수 있다.

### Slicing



세개에 어떤 연산자들이 있는지.





## 연산자 우선순위

1. `()`을 통한 grouping
2. Slicing
3. Indexing
4. 제곱연산자 **
5. 단항연산자 +, - (음수/양수 부호)
6. 산술연산자 *, /, %
7. 산술연산자 +, -
8. 비교연산자, `in`, `is`
9. `not`
10. `and`
11. `or`



## 암시적 형변환(Implicit Type Conversion)

사용자가 의도하지 않았지만, 파이썬 내부적으로 자동으로 형변환 하는 경우이다. 아래의 상황에서만 가능하다.

if  0 하면 자동으로 False로 바뀜



## 시퀀스(sequence) 자료형

`시퀀스`는 데이터의 순서대로 나열된 형식을 나타낸다.

**주의! 순서대로 나열된 것이 정렬되었다라는 뜻은 아니다.**

파이썬에서 기본적인 시퀀스 타입은 다음과 같다.

1. 리스트(list)
2. 튜플(tuple)
3. 레인지(range)
4. 문자열(string) : 글자하나하나가 한칸 'a','p' 이런식으로.
5. 바이너리(binary) : 따로 다루지는 않습니다.

set ( 주머니 안에 들어있기 때문에 순서가 없다)



통일되어있다는 전혀 중요하지 않다. 순서가 있다는 것도 중요하지 않음.



## `tuple`

**활용법**

```python
(value1, value2)
```

튜플은 리스트와 유사하지만, `()`로 묶어서 표현합니다.

그리고 tuple은 수정 불가능(immutable)하고, 읽을 수 밖에 없습니다.

직접 사용하는 것보다는 파이썬 내부에서 사용하고 있습니다.



index 접근이 되는것은 시퀀스 .



## 시퀀스에서 활용할 수 있는 연산자/함수

| operation  | 설명                    |
| ---------- | ----------------------- |
| x in s     | containment test        |
| x not in s | containment test        |
| s1 + s2    | concatenation           |
| s * n      | n번만큼 반복하여 더하기 |
| s[i]       | indexing                |
| s[i:j]     | slicing                 |
| s[i:j:k]   | k간격으로 slicing       |
| len(s)     | 길이                    |
| min(s)     | 최솟값                  |
| max(s)     | 최댓값                  |
| s.count(x) | x의 갯수                |



한번씩 다 돌려보기.



## set, dictionary

시퀀스 종류는 아니라는 얘기임!

기본적으로는 순서가 없음.

set은 집합



![1547511599733](C:\Users\student\AppData\Roaming\Typora\typora-user-images\1547511599733.png)

이거 그림 쭉 한번 보기 

sequence인 애들의 특징 : 순서가 있음.index 접근이 가능하다는게 포인트.

list 수정가능함.

mutable하게 만들고 싶었던 애들과

immutable 하게 만들고 싶었던 애들

어떻게 구현이 됐을까 생각을 해보면 메서드 중에 값이 바뀌는 애들이 있으면  mutable하기 때문에 바뀌는것.

원본이 바뀐것이 mutable한것.

mut immut의 차이 원본이 바뀌냐 안바뀌냐의 차이!!!!!





# 02 control of flow



## 조건문

어디로 진입을 하느냐

웃으면서 할수있어야함.



fizzbuzz 15의 배수를 먼저써야하는이유 생각.



## 조건 표현식(Conditional Expression)

복잡한거 쓸때는 안좋음

정말 짧게 쓸때만.

```python
value = return num if num >= 0 else return 0 
```

위에 처럼 생각하면 편함.



## 반복문

## for문

while은 우리가 그만두라고 얘기해야하지만 for문은 알아서 그만둠. 

while은 끝없이 해서 컴퓨터가 터짐.

for에 무한한 시퀀스라는 것은 존재하지 않기때문에 

언제 써야할까요? 어떤 조건에 도달했을때 끝내려면  for

나도 언제끝날지 몰라 는 while



## enumerate 

인덱스를 꺼내는 것 인덱스 접근이 가능한 애들한테만 쓰임. 언제써야 할지만 잡아둠 

```python
s  = {1, 2, 3}
s[0] 이런게 없음.

enumerate(s) 주소가 나옴
list(enumerate(s))

# 돌려보고 되지만 굳이 돌리지않음. 차라리 에러를 내야하는 부분을 돌려줌.!!!!!!!


```

### dictionary 반복문 활용하기

- dictionary에서 `for` 활용하는 4가지 방법

```python
# 0. dictionary (key 반복)
for key in dict:
    print(key)

# 1. key 반복
for key in dict.keys():
    print(key)

# 2. value 반복    
for val in dict.values():
    print(val)

# 3. key와 value 반복
for key, val in dict.items():
    print(key, val)
```

### `break`

`break`문은 반복문을 종료하는 표현입니다.

끝까지 가지말고 그자리에서 멈추는것 가능.

더이상 볼 필요 없을때



Slide Type-SlideSub-SlideFragmentSkipNotes

### `continue`

`continue`문은 continue 이후의 코드를 수행하지 않고 다음 요소를 선택해 반복을 계속 수행합니다.



### `else`

`else`문은 끝까지 반복문을 시행한 이후에 실행됩니다.

(`break`를 통해 중간에 종료되지 않은 경우만 실행) break  d있는 경우에는 else가 안먹힘

for문이 끝까지 가면 else 실행 .



# 03 function

함수는  return으로 끝나야함

print는 디버깅용

```python
def rectangle(width, height):
    area = width * height
    perimeter = (width+height) *2
    
    print(f'직사각형 둘레: {perimeter}, 면적: {area} 입니다.')
    return '퉤!'
    
rectangle(10,30)
```



## built-in function

dir(__builtins__)



## 함수의 return

return되는 값이 있을 수 있음.

```python
def yes_in_yes_out(x):

return x, x+1, x+2 
```



하나의 튜플임. 하나만 나오는거 저렇게 하면 안돼! 



## 기본값 설정

```python
def greeting(name='ssafy'):
    return f'{name},안녕?'


print(greeting('neo'))
print(greeting())
```



## 키워드 인자

greeting(name= '아홉수인생', age=29)

순서에 상관없이 알아서 자리 찾아감.



## 가변 인자 리스트

튜플로 묶어버리는게 포인트.



## 정의되지 않은 인자 처리하기

`**kwagrs`를 통해 인자를 받아 처리할 수 있습니다.

kwagrs는 `dict`형태로 처리가 됩니다.



다합해서 딕셔너리로 됨. 두 개의 에스터리스크 

단어는 큰 의미가 없음.

ester risk가 몇개냐가 큰 포인트.



## 이름공간 및 스코프(Scope)

그 공간 안에서 만큼은 유니크해야함.

하나의 공간안에선 하나의 이름이 하나의 객체만을 가리킴.

- `L`ocal scope: 정의된 함수
- `E`nclosed scope: 상위 함수
- `G`lobal scope: 함수 밖의 변수 혹은 import된 모듈  import가 먼저임.
- `B`uilt-in scope: 파이썬안에 내장되어 있는 함수 또는 속성

```python
def print_name(name):
    
    print(make_greeting(name))

def make_greeting(name):
    greeting = f'hello, {name}'
    return greeting 
```

각각의 name이 무엇을 지칭하는지 확인하기.

```python
def print_name(name):
    def make_greeting(name):
        greeting = f'hello, {name}'
        return greeting 
    
    print(make_greeting(name))
    
print_name('ssafy')
make_greeting('ss3')
```

밑의 make_greeting는 호출이 될수가 없음.

```python
def print_name(name):
    def make_greeting(name):

        return f'hihihi,{name}'
    
    print(make_greeting(name))
    

print_name('ssafy')
```

```python
stinrg ='bbdskflskfsdhfkj'

def print_name(string):
    def make_greeting(name):
#         string = 'aaa'
        print(string)
        return f'hihihi,{name}'
    
    print(make_greeting(string))
    

print_name('ssafy')
```

string = 'aaa'를 집어넣고 빼고 해봄.