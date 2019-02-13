## 06_SQL

## SQLite3 전용 명령어.

| 명령어                             | 설명                                        |
| ---------------------------------- | ------------------------------------------- |
| `.mode csv`                        | csv 모드                                    |
| `.mode column`                     | 컬럼 모드                                   |
| `.headers on`                      | 헤더(컬럼이름) 같이 출력                    |
| `.read <file.sql>`                 | 해당 sql 스크립트 실행                      |
| `.import <file.name> <tabel_name>` | 해당 파일의 데이터를 지정한 테이블에 import |
| `.schema`                          | 스키마 전체 보기;                           |

## TABLE 조작 관련

### Table 생성

```
CREATE TABLE <table_name> (
	<col> DATA_TYPE PRIMARY KEY AUTOINCREMENT,
    <col> DATA_TYPE NOT NULL,
    <col> DATA_TYPE DEFAULT <value>,
    ...
);
```

### Table ( + 레코드 모두) 삭제

```
DROP TABLE <table_name>;
```

### Table 이름 수정

```
ALTER TABLE <table_name>
RENAME TO <new_table_name>;
```

### Table 컬럼 추가

```sql
ALTER TABLE <table_name>
ADD COLUMN < col_name> DATATYPE;
```



## Data 조작 관련

### Data 생성 (Create)

```
INSERT INTO <table_name> (<col_name_1>, <col_name_2>, ...)
VALUES
(<value_1>, <value_2>, ...),
(<value_1>, <value_2>, ...),
...
(<value_1>, <value_2>, ...);
```

### Data 조회 (Read, Retrieve)

#### 테이블에서 데이터 전체를 모든 col 에 대하여 조회..

```
SELECT * FROM <table_name>;
```

#### 테이블에서 특정 컬럼만 조회

```
SELECT <col_1>, <col_2>, ... FROM <table_name>;
```

#### 특정 조건으로 전체 컬럼 조회

```
SELECT * FROM <table_name> WHERE [condition];
```

### Data 수정 (Update)

```
UPDATE <table_name>
SET <col_1>=<val_1>, <col_2>=<val_2>, ...
WHERE [condition]; -- 보통 primary key (id) 로 선택
```

### Data 삭제 (Delete, Destroy)

```
DELETE FROM <table_name>
WHERE [condtion]; -- 보통 primary key (id) 로 선택
```

## Expression

### 해당 컬럼의 갯수

```
SELECT COUNT(<col>) FROM <table_name>;
```

### 해당 컬럼의

```
-- 평균
SELECT AVG(<col>) FROM <table_name>;
-- 총합
SELECT SUM(<col>) FROM <table_name>
-- 최소
SELECT MIN(<col>) FROM <table_name>
-- 최대
SELECT MAX(<col>) FROM <table_name>
```

## 정렬(order)

```
SELECT <col> FROM <table_name>
ORDER BY <col_1>, <col_2> [ASC | DESC];
```

## 제한(Limit)

```
SELECT <col> FROM <table_name>
LIMIT <num>
```

## 패턴(Pattern)

```
SELECT * FROM <table_name>
WHERE <col> LIKE '<pattern>'
```

| 시작 | 예시    | 설명                                 |
| ---- | ------- | ------------------------------------ |
| `%`  | `2%`    | 2로 시작하는 값                      |
|      | `%2`    | 2로 끝나는 값                        |
|      | `%2%`   | 2가 들어가는 값                      |
| `_`  | `_2`    | 두번쨰 글자가 2 인 값                |
|      | `1___`  | 1로 시작하며 4자리                   |
|      | `_2%`   | 한글자 뒤에 2가오고 뒤에 이어지는 값 |
|      | `2_%_%` | 2로 시작하는데 최소 3자리인 값       |