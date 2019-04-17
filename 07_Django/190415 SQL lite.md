# 190415 SQL lite

1. pip install 'ipython[notebook]'

2. python manage.py shell_plus --notebook

   

  

## OnetoOneModel

### User

| id     | email           | password  |
| ------ | --------------- | --------- |
| PK_INT | CharField       | CharField |
| 1      | yurimf@jskd.com | 123123    |

### Profile

| id     | u_id        | first_name | last_name |
| ------ | ----------- | ---------- | --------- |
| PK_INT | PK,User,INT | Charfield  | CharField |
| 1      | 1           | Yurim      | Lee       |

ctrl + / 누르고 복사해서 notebook에 붙여넣기 하기



## ONE TO MANY MODEL



## Writer

| id     | name      |
| ------ | --------- |
| PK,INT | CharField |

## Book

| id     | author        | title     | description |
| ------ | ------------- | --------- | ----------- |
| PK,INT | PK,Writer.INT | CharField | TextField   |

## Chapter

| id     | book_id     | title     | description |
| ------ | ----------- | --------- | ----------- |
| PK,INT | PK,Book,INT | CharField | TextField   |

