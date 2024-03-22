const fs = require('fs');
const additional = require("./additional");

// //Добавление мусорных операций
// function trashOperationInFile(inputFilePath, outputFilePath) {
//     let fileData = fs.readFileSync(inputFilePath, 'utf8');
//     let trashFunction = [`{
//     let x = true;
//     let y = false;
//     if (x==y){
//         x=true;
//     }
//     else{
//         y=false;
//     }
// }
// `, `{
//     let x = 0;
//     let y = 3;
//     if (x>y){
//         console.log('Hello world!');
//     }
// }
// `, `{
//     let x = 0;
//     let y = 3;
//     while (false){
//         x+=y;
//     }
// }
// `, `{
//     return 7;
// }
// `, `{
//     let x = 0;
//     if (x==1){
//         return false;
//     }
//     else if (x==2){
//         return false;
//     }
//     else if (x==3){
//         return false;
//     }
//     else if (x==4){
//         return false;
//     }
//     else if (x==5){
//         return false;
//     }
//     else{
//         return true;
//     }
// }
// `];
//     let paramsTrashFunction = ['()', '(a)', '(a, b)', '(a, b, c)', '(a, b, c, d)'];
//     let randTrashFunction = Math.floor(Math.random() * trashFunction.length);
//     let randParamsTrashFunction = Math.floor(Math.random() * paramsTrashFunction.length);
//     const regex = /[a-zA-Zа-яА-ЯёЁ_]\w*/g;
//     const identifiers = fileData.match(regex);

//     const uniqueIdentifiers = [...new Set(identifiers)];

//     let nameFunction = generateRandomString(8);

//     for (let i = 0; i < uniqueIdentifiers.length; i++) {
//         if (uniqueIdentifiers[i] == nameFunction) {
//             i = -1
//             nameFunction = generateRandomString(8);
//         }
//     }
//     trashFunction[randTrashFunction] = 'function ' + nameFunction + paramsTrashFunction[randParamsTrashFunction] + trashFunction[randTrashFunction];

//     const modifiedContent = fileData + '\n' + trashFunction[randTrashFunction];
//     fs.writeFileSync(outputFilePath, modifiedContent, 'utf8');
// }

//Добавление мусорных операций
function trashOperationInFile(inputFilePath, outputFilePath) {
    let fileData = fs.readFileSync(inputFilePath, 'utf8');

    const regex = /[a-zA-Zа-яА-ЯёЁ_]\w*/g;
    const identifiers = fileData.match(regex);

    const uniqueIdentifiers = [...new Set(identifiers)];

    let modifiedContent = 'function ';

    let nameFunction = additional.generateRandomString(8);

    for (let i = 0; i < uniqueIdentifiers.length; i++) {
        if (uniqueIdentifiers[i] == nameFunction) {
            i = -1;
            nameFunction = additional.generateRandomString(8);
        }
    }
    modifiedContent += nameFunction + '(';

    let randCountParams = Math.floor(Math.random() * 5);
    let arrRandParams = [];

    for (let i = 0; i < randCountParams; i++) {
        arrRandParams.push(additional.generateRandomString(8));
        for (let j = 0; j < arrRandParams.length; j++) {
            if (arrRandParams[j] == arrRandParams[i] && i != j) {
                arrRandParams.pop();
                i--;
                break;
            }
        }
    }
    for (let i = 0; i < arrRandParams.length; i++) {
        modifiedContent += arrRandParams[i];
        if (i != arrRandParams.length - 1) {
            modifiedContent += ', ';
        }
    }
    modifiedContent += '){\n';

    let randCountVariables = Math.floor(Math.random() * 3) + 2;
    let arrRandVariables = [];

    for (let i = 0; i < randCountVariables; i++) {
        arrRandVariables.push(additional.generateRandomString(8));
        for (let j = 0; j < arrRandVariables.length; j++) {
            if (arrRandVariables[j] == arrRandVariables[i] && i != j) {
                arrRandVariables.pop();
                i--;
                break;
            }
        }
        for (let j = 0; j < arrRandParams.length; j++) {
            if (arrRandParams[j] == arrRandVariables[i]) {
                arrRandVariables.pop();
                i--;
                break;
            }
        }
    }
    for (let i = 0; i < arrRandVariables.length; i++) {
        let arrRandTypeValues = ['boolean', 'string', 'int'];
        let randTypeValues = Math.floor(Math.random() * arrRandTypeValues.length);
        if (arrRandTypeValues[randTypeValues] == 'boolean') {
            modifiedContent += '    let ' + arrRandVariables[i] + ' = ' + Boolean(Math.floor(Math.random() * 2)) + ';\n';
        }
        else if (arrRandTypeValues[randTypeValues] == 'string') {
            modifiedContent += '    let ' + arrRandVariables[i] + ' = "' + additional.generateRandomString(8) + '";\n';
        }
        else if (arrRandTypeValues[randTypeValues] == 'int') {
            modifiedContent += '    let ' + arrRandVariables[i] + ' = ' + Math.floor(Math.random() * 100) + ';\n';
        }
    }

    let arrRandBlocks = ['if', 'for', 'while'];
    let randBlocks = Math.floor(Math.random() * arrRandBlocks.length);

    let arrRandSigns = ['==', '!=', '>=', '>', '<', '<='];
    let randSigns = Math.floor(Math.random() * arrRandSigns.length);
    let compar1 = Math.floor(Math.random() * arrRandVariables.length);
    let compar2 = Math.floor(Math.random() * arrRandVariables.length);
    let arrRandOperations = ['+', '-', '*', '/'];
    let randOperations = Math.floor(Math.random() * arrRandOperations.length);

    if (arrRandBlocks[randBlocks] == 'if') {
        modifiedContent += '    if (' + arrRandVariables[compar1] + arrRandSigns[randSigns] + arrRandVariables[compar2] + '){\n';
        modifiedContent += '        ' + arrRandVariables[compar1] + ' = ' + arrRandVariables[compar1] + arrRandOperations[randOperations] + arrRandVariables[compar2] + ';\n';
        modifiedContent += '    }\n';
    }
    else if (arrRandBlocks[randBlocks] == 'for') {
        let iter;
        for (let i = 0; i < 1; i++) {
            iter = additional.generateRandomString(8);
            for (let j = 0; j < arrRandVariables.length; j++) {
                if (arrRandVariables[j] == iter) {
                    i--;
                    break;
                }
            }
            for (let j = 0; j < arrRandParams.length; j++) {
                if (arrRandParams[j] == iter) {
                    i--;
                    break;
                }
            }
        }
        modifiedContent += '    for (let ' + iter + ' = 0; ' + iter + ' < ' + Math.floor(Math.random() * 10) + '; ' + iter + '++' + '){\n';
        modifiedContent += '        ' + arrRandVariables[compar1] + ' = ' + arrRandVariables[compar1] + arrRandOperations[randOperations] + arrRandVariables[compar2] + ';\n';
        modifiedContent += '    }\n';
    }
    if (arrRandBlocks[randBlocks] == 'while') {
        modifiedContent += '    while (' + Boolean(Math.floor(Math.random() * 2)) + '){\n';
        modifiedContent += '        ' + arrRandVariables[compar1] + ' = ' + arrRandVariables[compar1] + arrRandOperations[randOperations] + arrRandVariables[compar2] + ';\n';
        modifiedContent += '        break;\n';
        modifiedContent += '    }\n';
    }

    let arrRandOutputs = ['console.log', 'return', ''];
    let randOutputs = Math.floor(Math.random() * arrRandOutputs.length);
    if (arrRandOutputs[randOutputs] == 'console.log') {
        modifiedContent += '    console.log(' + arrRandVariables[compar1] + ');\n';
    }
    else if (arrRandOutputs[randOutputs] == 'return') {
        modifiedContent += '    return ' + arrRandVariables[compar1] + ';\n';
    }
    else if (arrRandOutputs[randOutputs] == '') {
    }

    modifiedContent = fileData + '\n' + modifiedContent + '}\n';
    fs.writeFileSync(outputFilePath, modifiedContent, 'utf8');
}

//trashOperationInFile('script.js', 'scriptObf.js');

module.exports = {
    trashOperationInFile
}