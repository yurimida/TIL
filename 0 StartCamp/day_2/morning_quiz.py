# print('good morning')


# # 1. list에서 평균 구하기 

# my_score = [79, 84, 66, 93]

# def average(my_score):
#   if len(my_score) == 0:
#     return None
#   return sum(my_score, 0.0) / len(my_score)

# my_average = average(my_score) 
# print(my_average) #float


# # 2. dic에서 value값만 꺼내서 평균 구하기.

# your_score = {
#     '수학' : 87,
#     '국어' : 83,
#     '영어' : 76,
#     '도덕' : 100
# }

# count = 0
# _sum = 0
# for key in your_score:
#     count += 1
#     _sum += your_score[key]

# print('this is the mean:', _sum/count)


# # 3. 도시별 온도 평균 
# # 서울 : ?
# # 대전 : ?
# # 광주 : ?
# # 구미 : ?

# from statistics import mean   # statistics 모듈에서 변수 mean만 가져옴

# cities_temp = {
# '서울' : [-6,-10,5],
# '대전' : [-3, -5, 2],
# '광주' : [0, -5, 10],
# '구미' : [2, -2, 9]
# }

# for st,vals in cities_temp.items():  #반복문 st: 문자열 vals : values값  
#     # for 뒤에 st = key, vals = value
#     print("{} : {}".format(st,mean(vals)))

# #print("{1} : {0}".format(st,mean(vals))) 3.0 : 구미 
# #print("{0} : {1}".format(st,mean(vals))) 구미 : 3.0

# 4. 도시 중 최근 3일간 가장 추웠던 곳과 가장 더웠던 곳은?
# Hottest: ?? coldest: ??




cities_temp = {
    '서울' : [-6,-10,5],
    '대전' : [-3, -5, 2],
    '광주' : [0, -5, 10],
    '구미' : [2, -2, 9]
}

# all_temp 모든 온도를 모은다. 
all_temp = []
for key, value in cities_temp.items():
      all_temp += value

print(all_temp)



# all_temp에서 최대, 최소를 찾는다. 

highest = max(all_temp)
lowest = min(all_temp)

print(highest,lowest)

# cities_temp에서 max,min을 찾는다.

if highest in value:
    hottest = key

if lowest in value:
    coldest = key

    
# cities_temp에서  max,min 속한 도시를 찾는다.

hottest = []
coldest = []
for key,value in cities_temp.items():
     if highest in value:
        hottest.append(key)
     if lowest in value:
        coldest.append(key)

print(hottest,coldest)




# key_max = max(cities_temp.keys(), key=(lambda k: cities_temp[k]))
# key_min = min(cities_temp.keys(), key=(lambda k: cities_temp[k]))

# list_camp=[]

# for key, value in cities_temp.iteritems():
#     temp = [key,value]
#     dictlist.append(temp)

# list_temp = dictlist.append(temp)

# print(list_temp)

# print('Hottest :',key_max)

# print('Coldest:',key_min)