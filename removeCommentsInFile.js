const fs = require('fs');

//Удаление всех комментариев
function removeCommentsInFile(inputFilePath, outputFilePath) {
    let fileData = fs.readFileSync(inputFilePath, 'utf8');
    const commentRegex = /\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm;
    const removedComments = fileData.replace(commentRegex, '');
    fs.writeFileSync(outputFilePath, removedComments, 'utf8');
}

//removeCommentsInFile('script.js','scriptObf.js');

module.exports = {
    removeCommentsInFile
}