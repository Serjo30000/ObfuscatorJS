const fs = require('fs');
const additional = require("./additional");

//Замена идентификаторов на 16 код
function obfuscateIdentifiersInFile(inputFilePath, outputFilePath) {
    let fileData = fs.readFileSync(inputFilePath, 'utf8');
    const reservedWords = new Set([
        'break', 'case', 'catch', 'class', 'const', 'continue', 'debugger', 'default', 'delete',
        'do', 'else', 'export', 'extends', 'finally', 'for', 'if', 'import', 'in', 'instanceof',
        'new', 'return', 'super', 'switch', 'this', 'throw', 'try', 'typeof', 'var', 'void', 'while', 'with', 'yield', 'let', 'function', 'console', 'log', 'Infinity', 'null', 'true', 'false', 'constructor',
        'eval', 'parseInt', 'parseFloat', 'isNaN', 'isFinite',
        'decodeURI', 'decodeURIComponent', 'encodeURI', 'encodeURIComponent',
        'Array', 'Boolean', 'Date', 'Error', 'Function', 'JSON', 'Math', 'Number', 'Object', 'RegExp', 'String', 'push', 'sort', 'shift', 'length', 'warn', 'alert', 'info'
    ]);

    const regex = /["'`]\w+["'`]|[a-zA-Zа-яА-ЯёЁ_]\w*/g;
    const identifiers = fileData.match(regex);
    if (!identifiers) {
        return fileData;
    }

    const uniqueIdentifiers = [...new Set(identifiers)];
    const replacementMap = {};

    uniqueIdentifiers.forEach(identifier => {
        if (!reservedWords.has(identifier)) {
            const replacement = additional.stringToHex(identifier);
            replacementMap[identifier] = replacement;
        }
    });

    let obfuscatedText = fileData;
    Object.keys(replacementMap).forEach(identifier => {
        const regex = new RegExp(`\\b${identifier}\\b`, 'g');
        obfuscatedText = obfuscatedText.replace(regex, replacementMap[identifier]);
    });

    fs.writeFileSync(outputFilePath, obfuscatedText, 'utf8');
}

//obfuscateIdentifiersInFile('script.js', 'scriptObf.js');

module.exports = {
    obfuscateIdentifiersInFile
}