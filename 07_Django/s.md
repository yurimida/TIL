# 190416

## Student

| id(PK) | name          |
| ------ | ------------- |
| INT    | CharField(20) |

## Message

| id(PK) | content       | student(FK) |
| ------ | ------------- | ----------- |
| INT    | CharField(30) | INT         |

## Reply

| id(PK) | message(FK)-Message | student(FK)-Student | content       |
| ------ | ------------------- | ------------------- | ------------- |
| INT    | INT                 | INT                 | CharField(30) |

