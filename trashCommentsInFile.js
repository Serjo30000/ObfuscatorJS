const fs = require('fs');

//Изменение комментариев на мусорные
function trashCommentsInFile(inputFilePath, outputFilePath) {
    let fileData = fs.readFileSync(inputFilePath, 'utf8');
    const commentRegex = /\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm;

    function shiftCharactersRight(match) {
        return match.split('').map(char => {
            if (char.match(/[a-zA-Zа-яА-ЯёЁ]/g)) {
                return String.fromCharCode(char.charCodeAt(0) + 1);
            } else {
                return char;
            }
        }).join('');
    }
    const shiftedContent = fileData.replace(commentRegex, shiftCharactersRight);

    fs.writeFileSync(outputFilePath, shiftedContent, 'utf8');
}

//trashCommentsInFile('script.js','scriptObf.js');

module.exports = {
    trashCommentsInFile
}