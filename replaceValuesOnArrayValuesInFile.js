const fs = require('fs');
const crypto = require("crypto");
const additional = require("./additional");

//Храненеие всех числовых, строковых и булевых значений в JSON
function replaceValuesOnArrayValuesInFile(inputFilePath, outputFilePath) {
    let fileData = fs.readFileSync(inputFilePath, 'utf8');
    let regex = /[a-zA-Zа-яА-ЯёЁ_]\w*/g;
    const identifiers = fileData.match(regex);

    const uniqueIdentifiers = [...new Set(identifiers)];

    let nameArray = additional.generateRandomString(8);

    for (let i = 0; i < uniqueIdentifiers.length; i++) {
        if (uniqueIdentifiers[i] == nameArray) {
            i = -1
            nameArray = additional.generateRandomString(8);
        }
    }

    regex = /(\-?\b\d+(\.\d+)?\b|".*?"|'.*?'|`.*?`|\btrue\b|\bfalse\b)/g;
    const matches = fileData.match(regex);
    let valuesArray = 'const ' + nameArray + ' = {';
    let hashArray = [];


    for (let i = 0; i < matches.length; i++) {
        const hash = crypto.createHash("sha256").update(matches[i]).digest("hex") + i;
        hashArray.push(hash);
        valuesArray += '"' + hash + '":' + matches[i];
        if (i != matches.length - 1) {
            valuesArray += ', ';
        }
    }
    valuesArray += '};';
    let ident = 0;

    let updatedData = fileData.replace(/(\-?\b\d+(\.\d+)?\b|".*?"|'.*?'|`.*?`|\btrue\b|\bfalse\b)/g, () => {
        hashForArray = hashArray[ident];
        ident++;
        return '' + nameArray + '["' + hashForArray + '"]';
    });

    updatedData = valuesArray + '\n' + updatedData;

    fs.writeFileSync(outputFilePath, updatedData, 'utf8');
}

//replaceValuesOnArrayValuesInFile('script.js', 'scriptObf.js');

module.exports = {
    replaceValuesOnArrayValuesInFile
}