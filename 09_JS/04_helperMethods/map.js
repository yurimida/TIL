// ES5 for loop
// var numbers = [1,2,3];
// var doubleNumbers = [];
//
//
// for(var i = 0; i < numbers.length; i++){
//     doubleNumbers.push(numbers[i] * 2);
// }

// console.log(doubleNumbers);
// ES6+
const numbers = [1, 2, 3];
function double(n){
    return n * 2;
}
const doubleNumbers = numbers.map(double);
const tripleNumbers = numbers.map(number=>{
    return number * 3;
});

// console.log(tripleNumbers);
/*
    아래의 pluck라는 함수를 완성하세요.
    pluck 함수는 배열(array)과 요소 이름(key)의 문자열을 받으며
*/

const paints =  [
    { color : 'red'},
    { color : 'blue' },
    { color : 'white'},
    { smell : 'ughh' }
];

//
function pluck(array, property){
    const newArray = array.map(e=> {

        if (e[property]) return e[property];
    });
    return newArray
}
// pluck(paints, 'color'); // ['red','blue','white']
// pluck(paints, 'smell'); // ['ughh']
console.log(pluck(paints, 'color'));
