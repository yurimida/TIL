const numbers = [1, 2, 3, 4];

numbers[0]; // 1
numbers[-1]; // undefined
numbers.length;

/* 원본이 달라지는 methods */

numbers.reverse(); // [4,3,2,1]
numbers; // [4,3,2,1]
numbers.reverse();// [1,2,3,4]

numbers.push('a'); // 5 new length
numbers; // [1,2,3,4,'a']

numbers.pop();
numbers; // [1,2,3,4]

numbers.unshift(items:'a'); // 5 new length
numbers; // ['a',1,2,3,4]

numbers.shift();// 'a'
numbers; // [1,2,3,4]

/* copy 복사본 return */

numbers.includes(1); // true
numbers.includes(0); // false

numbers.push('a','a'); // test [1,2,3,4,'a','a']
numbers.indexOf('a'); // 4
numbers.indexOf('b'); // -1  => 없다라는 이야기
numbers.join('-'); // '1-2-3-4-a-a'
numbers.join(''); // '1234aa'
numbers.join(); // '1,2,3,4,a,a'
