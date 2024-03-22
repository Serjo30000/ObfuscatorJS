function filterIntegers(num) {
    return num % 1 != 0;
}

function filterDoubles(num) {
    return num % 1 == 0;
}

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }
    return result;
}

function stringToHex(str) {
    let hex = 'h_';
    for (let i = 0; i < str.length; i++) {
        hex += str.charCodeAt(i).toString(16).padStart(2, '0');
    }
    return hex;
}

module.exports = {
    filterIntegers,
    filterDoubles,
    generateRandomString,
    stringToHex
}