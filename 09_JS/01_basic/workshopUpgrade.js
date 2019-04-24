const concat = (str1, str2) => `${str1} - ${str2}`;

const checkLongStr = string => string.length > 10;

checkLongStr(concat('Happy', 'Hacking')) ? console.log('LONG') : console.log('SHORT');

console.log(
    checkLongStr(concat('Happy', 'Hacking')) ? 'LONG' : 'SHORT'
);