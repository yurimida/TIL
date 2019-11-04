import requests
import json

API_URL = 'http://localhost:8000/api/'
headers = {'content-type': 'application/json'}

def create_users(num_users):
    user_data = open('./users.dat', 'r', encoding='ISO-8859-1')
    request_data = {'params': []}
    occupation_map = {
        0: "other", 1: "academic/educator", 2: "artist", 3: "clerical/admin", 4: "college/grad student",
        5: "customer service", 6: "doctor/health care", 7: "executive/managerial", 8: "farmer", 9: "homemaker",
        10: "K-12 student", 11: "lawyer", 12: "programmer", 13: "retired", 14: "sales/marketing",
        15: "scientist", 16:  "self-employed", 17: "technician/engineer", 18: "tradesman/craftsman",
        19: "unemployed", 20: "writer"
    }

    for line in user_data.readlines():
        [userid, gender, age, occupation, zipcode] = line.split('::')
        username = 'user' + userid
        age = int(age)
        occupation = occupation_map[int(occupation)]
        if gender == 'M':
            images = ['https://i.imgur.com/NLL5Wop.png','https://i.imgur.com/XsrbaXg.png', 'https://i.imgur.com/YwioUo7.png','https://i.imgur.com/yS9Qq3c.png']
        else:
            images = ['https://i.imgur.com/7cf1GCh.png','https://i.imgur.com/YwioUo7.png','https://i.imgur.com/wflKtsz.png','https://i.imgur.com/sJXD3UJ.png']
        image = images[int(userid) % 4]
        request_data['params'].append({
            'username': username,
            'password': username,
            'age': age,
            'gender': gender,
            'occupation': occupation,
            'image': image,
        })

        if len(request_data['params']) >= num_users:
            break
    # print(request_data)
    response = requests.post(API_URL + 'auth/signup-many/', data=json.dumps(request_data), headers=headers)
    print(response.text)


def create_movies():
    movie_data = open('./movies_new3.dat', 'r', encoding='ISO-8859-1')
    request_data = {'movies': []}
    for line in movie_data.readlines():
        [id, title, posterurl, trailer, genres] = line.split('::')
        genres = genres[:-1].split('|')

        request_data['movies'].append({
            'id': id,
            'title': title,
            'poster_url': posterurl,
            'trailer': trailer,
            'genres': genres,
        })
    # print(request_data)
    response = requests.post(API_URL + 'movies/', data=json.dumps(request_data), headers=headers)
    print(response.text)


def create_summary():
    movie_summary = open('./ml_plot.dat', 'r', encoding='ISO-8859-1')
    request_data = {'summaries': []}
    for line in movie_summary.readlines():
        # print
        [id, body] = line.split('::')
        if int(id) > 3952:
            break
        body = ' '.join(body.split('\t'))[:-2]
        # print(body)
        request_data['summaries'].append({
            'id': id,
            'body': body
        })

    # print(request_data)
    response = requests.post(API_URL + 'summaries/', data=json.dumps(request_data), headers=headers)
    print(response.text)


def create_ratings(num_users):
    rating_data = open('./ratings.dat', 'r', encoding='ISO-8859-1')
    request_data = {'ratings': []}
    for line in rating_data.readlines():
        [userid, movieid, rating, timestamp] = line.split('::')
        if int(userid) > num_users:
            break
        if int(movieid) == 1795:
            continue
        request_data['ratings'].append({
            'user_id': userid,
            'movie_id': movieid,
            'rating_value': rating,
            'timestamp': timestamp,
        })
    # print(request_data)
    response = requests.post(API_URL + 'ratings/', data=json.dumps(request_data), headers=headers)
    print(response.text)


if __name__ == '__main__':
    num_users = 1000
    num_movies = 3952
    create_users(num_users)
    create_summary()
    create_movies()
    create_ratings(num_users)
