/*
    def my_function(arg1,arg2):
        ...
        return value

       func * lambda arg1,arg2: value

*/

// 1. 함수 키워드 정의
    function add(num1,num2){
        return num1 + num2;
    }

// 2. 변수에 함수 로직 할당 ***** 함수는 const *****
const sub = function (num1,num2) {
        return num1 - num2;
};



// 3. 함수 표현식 2가지
const mul = function(num1,num2){
    return num1 * num2;
};

/*

   step 1: function 키워드를 없앤다.
   step 2: () 와 {} 사이에 => 를 넣는다.

 */
mul = (num1,num2) => {
    return num1 * num2 ;
};





let square = function (num) {
    return num ** 2;
};

/*
   step 1: 인자가 단 하나라면, ()가 생략 가능하다.
   step 2: 함수 블록안에 코드가 return문 한 줄이라면, {} & return 키워드 삭제 가능하다.

*/
square = (num) => {
    return num ** 2;
};

square = num => num ** 2;
square(num:3); // 9

let noArgs = () => {
    return 'nothing';
};

noArgs = () => 'nothing';
oneArgs = a => 'one';
manArgs = (a,b,c,d,e) => 'many';


/* Default Args */
function sayHello(name='ssafy') {
    return `hi ${name} !`;
}

const sayHello = (name='ssafy') => `hi ${name}!`;


sayHello(); // hi ssafy
sayHello(name: 'Yurim') // hi Yurim


(num => num ** 2)(4) ; // 16  앞을 () 로 감싸주면 함수가 되니까 4를 num으로 넘겨줘서 16이 나옴.... 익명함수 실행