const fs = require('fs');
const additional = require("./additional");

// Создание маски для числа
function maskNumberInFile(inputFilePath, outputFilePath) {
    let fileData = fs.readFileSync(inputFilePath, 'utf8');
    const regex = /\-?\b\d+(\.\d+)?\b|\btrue\b|\bfalse\b/g;
    if (!fileData.match(regex)) {
        return fileData;
    }

    const identifiers = fileData.match(regex).sort((a, b) => a - b);
    const uniqueIdentifiers = [...new Set(identifiers)];
    const replacementMap = {};

    uniqueIdentifiers.forEach(identifier => {
        let replacement = '(-~[]-(-~[]))';
        if ('' + identifier == 'true') {
            replacement = '!-[]';
        }
        else if ('' + identifier == 'false') {
            replacement = '!!-[]';
        }
        else if (identifier >= 0) {
            if (identifier % 1 == 0) {
                for (let i = 0; i < identifier; i++) {
                    replacement = '-~' + replacement;
                }
            }
            else {
                let k = 0;
                let ide = identifier;
                while (ide % 1 != 0) {
                    k++;
                    ide *= 10;
                }
                for (let i = 0; i < identifier * Math.pow(10, k); i++) {
                    replacement = '-~' + replacement;
                }
                let kdivizor = '[]'
                for (let i = 0; i < k; i++) {
                    kdivizor = '-~-~-~-~-~-~-~-~-~-~' + kdivizor;
                }
                replacement = replacement + ' / ' + kdivizor;
            }
        }
        else if (identifier < 0) {
            if (identifier % 1 == 0) {
                for (let i = 0; i < identifier * (-1); i++) {
                    if (i == identifier * (-1) - 1) {
                        replacement = '~' + replacement;
                    }
                    else {
                        replacement = '-~' + replacement;
                    }
                }
            }
            else {
                let k = 0;
                let ide = identifier * (-1);
                while (ide % 1 != 0) {
                    k++;
                    ide *= 10;
                }
                for (let i = 0; i < identifier * (-1) * Math.pow(10, k); i++) {
                    if (i == identifier * (-1) * Math.pow(10, k) - 1) {
                        replacement = '~' + replacement;
                    }
                    else {
                        replacement = '-~' + replacement;
                    }
                }
                let kdivizor = '[]'
                for (let i = 0; i < k; i++) {
                    kdivizor = '-~-~-~-~-~-~-~-~-~-~' + kdivizor;
                }
                replacement = replacement + ' / ' + kdivizor;
            }
        }
        replacementMap[identifier] = replacement;
    });

    let obfuscatedText = fileData;
    Object.keys(replacementMap).sort((a, b) => a - b).filter(additional.filterIntegers).forEach(identifier => {
        const regex = new RegExp(`[-+.]?\\b${identifier}\\b`, 'g');
        obfuscatedText = obfuscatedText.replace(regex, replacementMap[identifier]);
    });

    Object.keys(replacementMap).sort((a, b) => a - b).filter(additional.filterDoubles).forEach(identifier => {
        const regex = new RegExp(`[-+.]?\\b${identifier}\\b`, 'g');
        obfuscatedText = obfuscatedText.replace(regex, replacementMap[identifier]);
    });

    fs.writeFileSync(outputFilePath, obfuscatedText, 'utf8');
}

//maskNumberInFile('script.js', 'scriptObf.js');

module.exports = {
    maskNumberInFile
}