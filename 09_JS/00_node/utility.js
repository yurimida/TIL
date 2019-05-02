function addAll(numbers=[]) {
    let sum = 0;
    numbers.forEach(number => sum += number);
    return sum;
}

function subAll(){}
function mulAll(){}

module.exports = {
    addAll(numbers=[]) {
        let sum = 0;
        numbers.forEach(number => sum += number);
        return sum;
    },
    subAll,  /* key 와 value 가 같을 때는 이와 같이 쓸수있다. */
    mulAll:mulAll,
    name: 'yurim',
};

phoneNumber = '01012341234';
module.exports.phoneNumber = phoneNumber;