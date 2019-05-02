// function hi() {
//
// }
//
// const bye =()=>{
//
// };

const me = {
    name: 'Lee yurim',
    phone: '010123456789',
    email: 'tutu@dks.com',
    intro: function () {
        return `Hi my name is ${this.name}.`
    }
};

const name = 'hello';
const you = {
    name: 'Lee ',
    phone: '010123456789',
    email: 'tutu@dks.com',
    intro:  () => {
        return `Hi my name is ${this.name}.`
    },
    wait: function () {
        setTimeout(() =>{
            console.log(this.email)
        }, 1000)
    },
};

console.log(me.intro());
console.log(you.wait());