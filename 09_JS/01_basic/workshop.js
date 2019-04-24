// This is Comment

const concat = (str1, str2) => `${str1} - ${str2}`;

const checkLongStr = string => {
    if (string.length > 10) {
        return true;
    } else {
        return false;
    }
};

if (checkLongStr(concat('Happy', 'Hacking'))) {
    console.log('LONG STRING');
} else {
    console.log('SHORT STRING');
}