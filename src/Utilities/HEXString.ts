let HexStringMappingListUpper = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F'
];
function getMappedHEXStringForValue(valueInDec : number) : string {
    if(valueInDec < 0 || valueInDec >= HexStringMappingListUpper.length){
        throw new RangeError('index out of range!');
    }else{
        return HexStringMappingListUpper[valueInDec];
    }
}

let inspectRegex = new RegExp("^[1-9A-Za-z]*$",'g');

function isHexString(valueToInspect : string) : boolean{
    if(inspectRegex.exec(valueToInspect) !== null){
        return true;
    }else{
        return false;
    }
}

export {isHexString};

function isHexStringEqual(left : string, right : string) : boolean{
    return left.toUpperCase() === right.toUpperCase();
}

export {isHexStringEqual};

function generateRandomHexString(numCharacter : number, isUpperCase : boolean = true) : string{
    let generatedStr = '';
    for(let i=0;i<numCharacter;i++){
        let currentRandomData = Math.floor(Math.random() * 16);
        generatedStr += getMappedHEXStringForValue(currentRandomData);
    }
    if(!isUpperCase){
        generatedStr = generatedStr.toLowerCase();
    }
    return generatedStr;
}

function generateRandomHexStringWithBytesNum(numBytes: number, isUpperCase : boolean = true) : string{
    return generateRandomHexString(numBytes*2,isUpperCase);
}

export {generateRandomHexString, generateRandomHexStringWithBytesNum};