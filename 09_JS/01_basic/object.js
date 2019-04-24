 const me = {
      name  :'YuRim',
      phoneNumber :'01012341234', // 띄어쓰기가 있으면, '' 안에 넣어준다.
     appleProducts: {
         ipad : '201?',
         iphone : '7',
         macbook : '2017 pro',

     }
};

 me.name; // 'YuRim'
 me.['name']; //'Yurim'
 me.phoneNumber; // '01012341234'
 me.appleProducts; // {ipad: "201?", iphone: "7", macbook: "2017 pro"}  이 자료구조를 js에서는 오브젝트라고 부른다.
 me.appleProducts.ipad ; // '201?'