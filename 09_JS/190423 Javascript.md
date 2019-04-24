# 190423 Javascript

```javascript
alert('hihi')
undefined
window.alert('??')
undefined
clap = '<p> 짝 </p>'
for (i = 1; i <= 10; i++) {
    if ( i % 3 == 0) {
        window.document.write(clap)
    }
    else {
        window.document.write(`<p> ${i} </p>`) }
}
undefined
confirm('김볶 먹을래?')
true
confirm('김볶 먹을래?')
false

document.querySelector('h1') => 다음과 같은 query로 select 하겠다.
```

```html
  /*

         python long comment

         */


        // alert('hihi');
```

```javascript
/* console */
document.querySelector('h1')
<h1>​ Happy World ! ​</h1>​
h1 = document.querySelector('h1')
<h1>​ Happy World ! ​</h1>​
h1.innerText
"Happy World !"
document.querySelector('h1').innerText
"Happy World !"
document.querySelector('h1').innerText = 'Goodbye World'
"Goodbye World"
```

```javascript
100/0;
Infinity
100/-0
-Infinity
typeof Infinity;
"number"
typeof -Infinity;
"number"
Infinity - Infinity;
NaN
```

```javascript
js에서는 === 으로 비교를 해야한다.

1==true;
true

1===true;
false

null == undefined;
true

null === undefined;
false
```

* ##  if  , for, while 은  끝날때  {  } 뒤에   ; 을 안씀

* ## 할당 끝은 무조건 ; 을 붙여야함. 

  ```javascript
  const myObject = {
      coffee : 'Americano',
      iceCream : 'Cookie and Cream',
      
  };
  undefined
  typeof myObject
  "object"
  const jsonData = JSON.stringify(myObject);
  undefined
  jsonData
  "{"coffee":"Americano","iceCream":"Cookie and Cream"}"
  typeof jsonData
  "string"
  json.coffee
  VM190:1 Uncaught ReferenceError: json is not defined
      at <anonymous>:1:1
  
  => json은 단지string이기 때문에 위에 처럼 쓸수없는것.
  ```

  