const fs = require('fs');

//Изменение console.log
function replaceConsoleLogInFile(inputFilePath, outputFilePath) {
    let fileData = fs.readFileSync(inputFilePath, 'utf8');
    let outputData = ['console.info', 'console.warn', 'alert'];
    let regex = /\bconsole.log\b/gi;

    const modifiedData = fileData.replace(regex, function () { return outputData[Math.floor(Math.random() * outputData.length)] });

    fs.writeFileSync(outputFilePath, modifiedData, 'utf8');
}

//replaceConsoleLogInFile('script.js', 'scriptObf.js');

module.exports = {
    replaceConsoleLogInFile
}