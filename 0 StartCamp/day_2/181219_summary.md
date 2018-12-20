# 181219 수업정리

## 1.git  

*  git add . : 사진기 보세요
* git status : 현재 상황 보여줌
* git commit -m 'start 181218' : 사진을 찍고 -m은 메세지 남김. 
* git push : git에 올려줌
* git log : 로그를 보여줌
* shift+ctrl+R : 새로고침 



### 2. list에서 평균 구하기 & dictionary에서 평균 구하기

```python
my_score = []
my_total = sum(my_score)
my_average  = sum(my_score)/len(my_score)
print(my_average)
```

```python
sum(your_score.values()) #your_score.values [87,83,76,100] 로 나오는 것이 아닐까?
your_total = sum(your_score.values())
your_average = your_total/len(your_score)
print('this is the mean:', your_average)
```



### 3. dictionery -> list 변환

```python
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
coldest git  []
for key,value in cities_temp.items():
     if highest in value:
        hottest.append(key)
     if lowest in value:
        coldest.append(key)

print(hottest,coldest)
```

#### cloud9에 github 연동

```
git init
git add README.md
git commit -m "first commit"
git remote add origin https://github.com/yurimida/yurimida.github.io.git
git push -u origin master
```