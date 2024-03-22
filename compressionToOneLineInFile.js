const fs = require('fs');

//Сжатие до одной строки
function compressionToOneLineInFile(inputFilePath, outputFilePath) {
    let fileData = fs.readFileSync(inputFilePath, 'utf8');
    const oldRegex = /\/\/(?:(?!\*\/).)*$/gm;
    const newRegex = '/*$&*/\n';
    const deleteRegex = /\/\//g;
    const compressionRegex = /\r?\n/g;
    const space = /\s+/g;
    const modifiedData = fileData.replace(oldRegex, newRegex).replace(deleteRegex, '').replace(compressionRegex, ' ').replace(space, ' ');

    fs.writeFileSync(outputFilePath, modifiedData, 'utf8');
}

//compressionToOneLineInFile('script.js','scriptObf.js');

module.exports = {
    compressionToOneLineInFile
}