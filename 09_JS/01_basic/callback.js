// 숫자로 이루어진 배열의 요소들은 각각 [???] 한다. [???]는 알아서 해라.
const numbersEach = (numbers, callback) =>{


    let acc;  // js 에서는 변수 선언만 할 수 있다.
    for(const num of numbers){
        acc = callback (num, acc);
    }
    return acc;
};

my_array = [1,2,3,4,5];
const adder =  (number,sum=0) => {
    return sum + number;
};
numbersEach(my_array,adder);

console.log(numbersEach([1,2,3,4,5],(number,sum=0) => sum += number));
console.log(numbersEach([1,2,3,4,5],(number,sum=0) => sum += number));
numbersEach([1,2,3,4],(number,acc=1) => acc *= number);



const muler = (number,sum=1)=>{
    return sum *= number;
};

numbersEach([1,2,3,4,5],muler);




numbersEach([1,2,3,4,5],adder);

// 인자로 배열을 받는다. 해당 배열의 모든 요소를 더한 숫자를 return

const numbersEachAdd = numbers => {
    let acc = 0;
    for (const number of numbers){
        acc += number;
    }
    return acc;
};
console.log(numbersEachAdd([1,2,3,4,5]));

// 인자로 배열을 받는다. 해당 배열의 모든 요소를 뺀 숫자를 return
const numbersEachSub = numbers => {
    let acc = 0;
    for (const number of numbers){
        acc -= number;

    }
    return acc;
};
console.log(numbersEachSub([1,2,3,4,5]));

//  인자로 배열을 받는다. 해당 배열의 모든 요소를 곱한 숫자를 return
const numbersEachMul = numbers => {
    let acc =1;
    for (const number of numbers){
        acc *= number;
    }
    return acc;
};
console.log(numbersEachMul([1,2,3]));

