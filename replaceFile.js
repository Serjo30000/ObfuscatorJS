const fs = require('fs');

//Замена файла
function replaceFile(inputFilePath, outputFilePath) {
    let fileData = fs.readFileSync(inputFilePath, 'utf8');
    fs.writeFileSync(outputFilePath, fileData, 'utf8');
}

//replaceFile('script.js','scriptObf.js');

module.exports = {
    replaceFile
}