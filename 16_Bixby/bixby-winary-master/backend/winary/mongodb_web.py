import pymongo, json, requests

# localhost 환경 설정 (성직)
# database = client['wine']
# collection = database['wine_collection']

url = ""
username = ""
password = ""
authSource = ""
authMechanism = ""
client = pymongo.MongoClient(url, username=username, password=password, authSource=authSource,
                             authMechanism=authMechanism)
database = client['winery_bixby']
collection = database['wine_collection']


# SQLite3 DB 설정
# TODO: 배포용 api url 설정 추가하기
api_url = "http://127.0.0.1:8000/api/"


def find(query={}):
    print(query)
    wine_data = list(collection.find(query))
    if len(wine_data) > 0:
        for wine in wine_data:
            wine["_id"] = str(wine["_id"])

    return wine_data


def extract_wine_name(wine_data):
    wine_list = []
    for wine in wine_data:
        wine_list.append(wine["_id"])

    data = {}
    data.update({'wine_list': wine_list })

    return data


# Sqlite3에 와인 아이디 데이터
def create_wine_data(wine_list):
    # print(wine_list)
    requests.post(api_url + "web/wines/", data=wine_list)



if __name__ == '__main__':
    wine_data = find()
    wine_list = extract_wine_name(wine_data)
    create_wine_data(wine_list)