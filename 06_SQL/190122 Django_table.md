sqlite3 my_db.sqlite3

스키마 문법 만들기 = create table

.import users.csv(파일명) users(테이블명)





CREATE TABLE "users"(
​    id INTEGER PRIMARY KEY, AUTOINCREMENT,
​    first_name TEXT NOT NULL,
​    last_name TEXT NOT NULL,
​    age INTEGER NOT NULL,
​    country TEXT,
​    phone TEXT,
​    balance INTEGER NOT NULL
);

INSERT INTO users (first_name, last_name,age,country,phone, balance) 



테이블 생성(timetables)
스키마: id(INT PK), 
​        subject(TEXT, NOTNULL), 
​        calender(TEXT, NOTNULL), 
​        -- test(TEXT, NOTNULL)
​        

1. 레코드: 오늘 ~ 금까지 내용 추가 c 

2. subject에 'sql' 이라는 문자열이 있는 레코드 추출.
   토요일 관련 레코드 추가 c
   토요일 레코드 삭제 U
   토요일 레코드 삭제 D

3. test 컬럼 추가

4. 각 record의 test를 0 으로 바꾼다.

5. project 컬럼 추가 

6. project 컬럼을 알맞게 수정