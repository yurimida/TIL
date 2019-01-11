import random
from flask import Flask, jsonify

# Flask 라는 class를 빼겠다.


app = Flask(__name__)

@app.route('/')    # @ 데코레이터에 route라는 메서드가 있음. '/' 루트 : 모든 것의 최상단.
def index():
    return 'Hi!'

@app.route('/ssafy')
def ssafy():
    return 'sssssssafy'

@app.route('/hi/<string:name>')
def hi(name):
    return(f'hi {name}!')



@app.route('/pick_lotto')
def pick_lotto():
    numbers = random.sample(range(1,46),6)
    return jsonify(numbers)

@app.route('/dictionary/<string:word>')
def my_word(word):

    word_first = {'apple':'사과','banana':'바나나'}
        
    for key, val in word_first.items():

        if word in word_first:
            return (f'{key}은{val}')

        else:
            return (f'{word}은(는) 나만의 단어장에 없는 단어입니다!')
            
if __name__ == '__main__':
    app.run(debug=True)

# class Flask:
#     def run(self, debug=False, host='127.0.0.1', port=5000):


# class Flask:
#     def run(self,*)