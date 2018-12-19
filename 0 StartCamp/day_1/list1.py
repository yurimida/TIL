numbers = [1, 2, 3] #변수 이름은 뜻을 담아서 짓자!
family = ['mom', 1.64, 'dad', 1.75, 'sister',1.78]  

# 인덱스 접근 할때 family[2] = dad가 나옴
#python은 0 부터 시작. family[-1] = 1.78 거꾸로 나오는 경우

mcu = [
    ['ironman','captain','dr.strange'],
    ['xmen','deadpool'],
    ['spiderman']
]

disney = mcu[0]
disney[2] #Dr.strange가 나옴 
mcu[0][2] #Dr.strange가 나옴 

[
    'iron'+'man',
    'spider'+'man'
]

['a','b', 'c','c']

numbers = list(range(1,46))
int ('123')
numbers[5:10] #부분 추출해서 사용하려는 거구나. start:end => start는 포함하며 end는 불포함

x = ['x','y','z',True, 123,['a','b','c']]
my_bool = x[3]