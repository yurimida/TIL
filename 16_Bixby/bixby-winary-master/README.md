# Backend (Django)

- requirements 설치

```bash
pip install -r requirements.txt
```

- runserver

```bash
python manage.py runserver
```

- API URL(Wines)

```
http://13.125.235.118:8000/api/wines/
```

- API URL(Users)

```
http://13.125.235.118:8000/api/users/
```

- query 요청 예시(bixby)

```json
// wine 정보를 요청할 때
// POST http://13.125.235.118:8000/api/wines/
{
    "bixby": true,
    "userId": "userId",
    "query": {
        "tasting_sweetness": "5"
    }
}


// user 정보를 요청할 때(전체 user 정보)
// GET http://13.125.235.118:8000/api/users/


// user 정보를 요청할 때(내 와인함 확인)
// GET http://13.125.235.118:8000/api/users/?userId=userId


// user 정보에 와인 추가
// POST http://13.125.235.118:8000/api/users/
{
    "bixby": true,
    "userId": "userId",
    "wine": "와인 이름" or "와인 Id"
}

// user 정보에서 와인 제거
// DELETE http://13.125.235.118:8000/api/users/
{
    "bixby": true,
    "userId": "userId",
    "wine": "와인 이름" or "와인 Id"
}
```

- 응답 예시(bixby)

```json
// wine 정보를 요청할 때
{
    "wine": [
        {
            "wine_name": "http://",
            "FOOD": [
                "해산물",
                "흰 살 생선",
                "채소"
            ],
            "wine_en_name": "Press House Vidal Icewine",
            "BRAND": "Canada",
            "REGION": [
                "캐나다",
                "온타리오주"
            ],
            "_id": "5d8d",
            "TEMP": "7-10℃",
            "CATEGORIES": "화이트와인",
            "tasting_sweetness": 5,
            "SIZE": "375ml",
            "wine_ko_name": "프레스 하우스 비달 아이스와인",
            "ALCOHOL": "11%",
            "tasting_note": "2014년 1월",
            "tasting_body": 1,
            "VARIETAL": "비달 100%",
            "favorite": false
        },
        ...
    ],
    "count": 684
}


// user 정보를 요청할 때(전체 user 정보)
{
    "count": 11,
    "user": [
        {
            "_id": "3d8d",
            "wine": [
                "프레스 하우스 비달 아이스와인"
            ],
            "userId": "wooner"
        },
        ...
    ]
}


// user 정보를 요청할 때(내 와인함 확인)
{
	"count": 1,
    "user": [
        {
            "_id": "3d8d",
            "wine": [
                "프레스 하우스 비달 아이스와인"
            ],
            "userId": "wooner"
        }
    ]
}


// user 정보에 와인 추가
{
    "count": 1,
    "user": [
       {
           "_id": "3d8d",
           "wine": [
               "프레스 하우스 비달 아이스와인",
               "프레스 하우스 비달 와인1"
           ],
           "userId": "wooner"
       }
    ]
}


// user 정보에서 와인 제거
{
	"count": 1,
    "user": [
        {
            "_id": "3d8d",
            "wine": [
                "프레스 하우스 비달 아이스와인"
            ],
            "userId": "wooner"
        }
    ]
}
```







# Frontend (Vue.js)

- package.json 설치

```bash
npm install
```

- runserver

```bash
npm run dev
```

- URL

```
http://localhost:8080
```
