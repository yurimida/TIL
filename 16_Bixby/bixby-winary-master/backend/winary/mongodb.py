import pymongo, json
from bson.objectid import ObjectId

url = ""
username = ""
password = ""
authSource = ""
authMechanism = ""
client = pymongo.MongoClient(url, username=username, password=password, authSource=authSource,
                             authMechanism=authMechanism)
database = client['winery_bixby']
collection = database['wine_collection']
collection_user = database['winery_user']


def find_query(queries={}):
    query = queries.get("query", None)
    bixby = queries.get("bixby", None)

    if not query:
        query = {}

    sweet = query.get("tasting_sweetness", None)
    body = query.get("tasting_body", None)
    alcohol = query.get("ALCOHOL", None)

    for key, val in query.items():
        if type(query[key]) == list:
            query[key] = val[0]

    if sweet:
        if type(query["tasting_sweetness"]) == list:
            query["tasting_sweetness"] = query["tasting_sweetness"][0]
        if query["tasting_sweetness"][0] == "{":
            query["tasting_sweetness"] = json.loads(query["tasting_sweetness"])

            for key, val in query["tasting_sweetness"].items():
                query["tasting_sweetness"][key] = int(val)
        else:
            query["tasting_sweetness"] = int(query["tasting_sweetness"])

    if body:
        if type(query["tasting_body"]) == list:
            query["tasting_body"] = query["tasting_body"][0]
        if query["tasting_body"][0] == "{":
            query["tasting_body"] = json.loads(query["tasting_body"])

            for key, val in query["tasting_body"].items():
                query["tasting_body"][key] = int(val)
        else:
            query["tasting_body"] = int(query["tasting_body"])

    if alcohol:
        if type(query["ALCOHOL"]) == list:
            query["ALCOHOL"] = query["ALCOHOL"][0]
        if query["ALCOHOL"][0] == "{":
            query["ALCOHOL"] = json.loads(query["ALCOHOL"])

            for key, val in query["ALCOHOL"].items():
                query["ALCOHOL"][key] = str(val)
        else:
            query["ALCOHOL"] = str(query["ALCOHOL"])

    find = list(collection.find(query))
    # 각 wine의 id가 Object 형식이라 문자열로 변환

    for wine in find:
        wine["_id"] = str(wine["_id"])

    if bixby == "true":
        user = list(collection_user.find({"userId": queries["userId"]}))
        if user:
            wines = user[0]["wine"]
        else:
            collection_user.insert({"userId": queries["userId"], "wine": []})
            wines = []

        for wine in find:
            wine["favorite"] = False
            if wines:
                for i in range(len(wines)):
                    if wine["_id"] == wines[i]:
                        wine["favorite"] = True
                        wines.pop(i)
                        break

    return find


def find_user(query={}):
    find = list(collection_user.find(query))

    for user in find:
        user["_id"] = str(user["_id"])

    return find


def insert_user(query={}):
    # user 정보가 있는지 확인
    user = find_user({"userId": query["userId"]})
    wine = query["wine"]

    # user 정보가 없을 경우 userid로 새 user 정보 생성, wine를 array로 생성
    if not user:
        collection_user.insert({"userId": query["userId"], "wine": []})

    # 중복 방지를 위해 user의 wine 정보에 입력할 wine이 없는 경우에만 등록
    user = find_user({"userId": query["userId"]})
    if wine not in user[0]["wine"]:
        # userid 정보에 들어온 query를 등록
        collection_user.update({"userId": query["userId"]}, {"$push": {"wine": query["wine"]}})


def delete_user(query={}):
    # user의 wine 정보 삭제
    collection_user.update({"userId": query["userId"]}, {"$pull": {"wine": query["wine"]}})


def find_user_wine(query={}):
    user = find_user(query)
    wines = user[0]["wine"]
    find = []
    for wine in wines:
        a = list(collection.find({"_id": ObjectId(wine)}))
        a[0]["_id"] = str(a[0]["_id"])
        a[0]["favorite"] = True
        find.append(a[0])

    return find