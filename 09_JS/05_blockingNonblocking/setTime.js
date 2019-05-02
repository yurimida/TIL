function sleep_3s() {
    setTimeout(() => console.log('Wake Up!'), 3000)
}

const logEnd = () => {
    console.log('end');
};

console.log('Start Sleeping');
sleep_3s();
console.log('End of Program');

/*
 https://nodejs.org/ko/docs/guides/blocking-vs-non-blocking/
 bloking vs nonblocking
 */