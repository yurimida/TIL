console.log(typeof 1); //number
typeof (typeof 1); // string
typeof (() => {}) //function
typeof (function(){}) //function
typeof (NaN) // number >> 'a' / 100 , 'a' - 100, 'a' * 100  예외) 'a' + 100 = 'a100' , '123' * 1, '123' / 1
100 / 0 //  Infinity
typeof (100/0) //number
typeof(Infinity) // number
const aa = { a: 1, b: 2};
aa.c // undefined
typeof undefined // undefined
null // 비어있다.
typeof null // object
typeof {} // object
typeof [] // object

