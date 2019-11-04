import requests
from bs4 import BeautifulSoup
import sys
import io
import time
sys.stdout = io.TextIOWrapper(sys.stdout.detach(), encoding = 'utf-8')
sys.stderr = io.TextIOWrapper(sys.stderr.detach(), encoding = 'utf-8')

API_URL = 'http://localhost:8000/api/'
headers = {'content-type': 'application/json'}

# def create_movies():
#     movie_data = open('./movies.dat', 'r', encoding='ISO-8859-1')
#     for line in movie_data.readlines():
#         [id, title, genres] = line.split('::')
#         url = "https://movie-database-imdb-alternative.p.rapidapi.com/"
#         querystring = {"page": "1", "y": title[-5:-1], "r": "json", "s": title[:title.find('(')-1]}
#         header = {
#             'x-rapidapi-host': "movie-database-imdb-alternative.p.rapidapi.com",
#             'x-rapidapi-key': "e93e0f916emsh99a143f8a609020p12e705jsn9acbd3cb0e27"
#         }
#         response = requests.request("GET", url, headers=header, params=querystring)
#         # print(response.text[response.text.find('https://'):response.text.find('.jpg') + 4])
#         poster_url = response.text[response.text.find('https://'):response.text.find('.jpg') + 4]
#         if not poster_url:
#             poster_url = 'https://i.imgur.com/2RWrx80.png'
#         file = open('movies_new2.dat', "a")
#         data = id+'::'+title+'::'+poster_url+'::'+genres
#         # print(title[-5:-1])
#         print(id)
#         file.write(data)
#         file.close()

def create_trailer():
    movie_data = open('./movies_new2.dat', 'r', encoding='ISO-8859-1')

    for line in movie_data.readlines():
        [id, title, poster_url, genres] = line.split('::')

        try:
            URL = 'https://www.youtube.com/results?search_query='
            # HTTP request
            response = requests.get(URL + title + ' trailer')
            # parsing
            y_html = response.text
            y_soup = BeautifulSoup(y_html, 'html.parser')
            watch_url = y_soup.find_all(class_='yt-uix-sessionlink spf-link')[0]['href']
            watch_index = watch_url.find('=')
            watch_url = watch_url[watch_index + 1:]
            youtube_url = 'https://www.youtube.com/embed/' + watch_url
        except IndexError:
            youtube_url = 'no trailer'
            # print("x")
        data = id+'::'+title+'::'+poster_url+'::'+youtube_url+'::'+genres
    # print(title[-5:-1])
        file = open('movies_new3.dat', "a")
        file.write(data)
        # time.sleep(2)
        file.close()


if __name__ == '__main__':
    # create_movies()
    create_trailer()
