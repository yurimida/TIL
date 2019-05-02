// ES5 for loop
// var avensers = [
//     { name: 'Tony Stark'},
//     { name: 'Steve Rogers'},
//     { name: 'Thor'},
// ];
// var avenger;
//
//
// for(var i = 0; i < avengers.length; i++){
//     if (avensers[i].name === 'Tony Stark'){
//         avenger = avensers[i];
//         break
//     }
// }
// ES6+
var avensers = [
    { name: 'Tony Stark'},
    { name: 'Steve Rogers'},
    { name: 'Thor'},
];
const a = avensers.find(avenser => avenser.name === 'Tony Stark');
console.log(a);

