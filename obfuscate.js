const trashOperationInFile = require("./trashOperationInFile");
const removeCommentsInFile = require("./removeCommentsInFile");
const trashCommentsInFile = require("./trashCommentsInFile");
const replaceConsoleLogInFile = require("./replaceConsoleLogInFile");
const replaceValuesOnArrayValuesInFile = require("./replaceValuesOnArrayValuesInFile");
const obfuscateIdentifiersInFile = require("./obfuscateIdentifiersInFile");
const maskNumberInFile = require("./maskNumberInFile");
const compressionToOneLineInFile = require("./compressionToOneLineInFile");
const replaceFile = require("./replaceFile");

// replaceFile.replaceFile('script.js','scriptObf.js');
// trashOperationInFile.trashOperationInFile('script.js', 'scriptObf.js');
// removeCommentsInFile.removeCommentsInFile('script.js','scriptObf.js');
// trashCommentsInFile.trashCommentsInFile('script.js', 'scriptObf.js');
// replaceConsoleLogInFile.replaceConsoleLogInFile('script.js', 'scriptObf.js');
// replaceValuesOnArrayValuesInFile.replaceValuesOnArrayValuesInFile('script.js', 'scriptObf.js');
// obfuscateIdentifiersInFile.obfuscateIdentifiersInFile('script.js', 'scriptObf.js');
// maskNumberInFile.maskNumberInFile('script.js', 'scriptObf.js');
// compressionToOneLineInFile.compressionToOneLineInFile('script.js', 'scriptObf.js');

let arrFun = [() => replaceFile.replaceFile('script.js', 'scriptObf.js'), () => trashOperationInFile.trashOperationInFile('scriptObf.js', 'scriptObf.js'), () => trashCommentsInFile.trashCommentsInFile('scriptObf.js', 'scriptObf.js'),
    () => replaceConsoleLogInFile.replaceConsoleLogInFile('scriptObf.js', 'scriptObf.js'), () => replaceValuesOnArrayValuesInFile.replaceValuesOnArrayValuesInFile('scriptObf.js', 'scriptObf.js'),
    () => obfuscateIdentifiersInFile.obfuscateIdentifiersInFile('scriptObf.js', 'scriptObf.js'), () => maskNumberInFile.maskNumberInFile('scriptObf.js', 'scriptObf.js'),
    () => compressionToOneLineInFile.compressionToOneLineInFile('scriptObf.js', 'scriptObf.js')];
function runFunctions(){
    for (let i=0;i<arrFun.length;i++){
        arrFun[i]();
    }
}

//runFunctions();