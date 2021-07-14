import * as Joi from "joi";

function parseJoiTypeItems<OutputType>(item : any, JoiItem : Joi.AnySchema) : OutputType | undefined{
    let validationResult = JoiItem.validate(item);
    if(validationResult.error !== undefined){
        return undefined;
    }else{
        return validationResult.value;
    }
}

function getJoiValidationErrorPaths(validationError : Joi.ValidationError) : Array<Array<string|number>>{
    let resultArr : Array<Array<string|number>> = [];
    for(let i = 0; i<validationError.details.length; i++){
        let currentDetail = validationError.details[i];
        resultArr.push(currentDetail.path);
    }
    return resultArr;
}

export {getJoiValidationErrorPaths};

function getJoiValidationErrorLastPaths(validationError : Joi.ValidationError) : Array<string>{
    let resultArr = getJoiValidationErrorPaths(validationError);
    let returnArr : Array<string> = [];
    for(let i=0; i<resultArr.length;i++){
        let currentArr = resultArr[i];
        returnArr.push(currentArr[currentArr.length - 1].toString());
    }
    return returnArr;
}

function getJoiValidationErrorFirstPaths(validationError : Joi.ValidationError) : Array<string>{
    let resultArr = getJoiValidationErrorPaths(validationError);
    let returnArr : Array<string> = [];
    for(let i=0; i<resultArr.length;i++){
        let currentArr = resultArr[i];
        returnArr.push(currentArr[0].toString());
    }
    return returnArr;
}

export {getJoiValidationErrorLastPaths};
export {getJoiValidationErrorFirstPaths};

function isJoiTypeItem(item : any, JoiItem : Joi.AnySchema) : boolean{
    return parseJoiTypeItems(item,JoiItem) !== undefined;
}

function generateParseFunction<OutputType>(JoiItem : Joi.AnySchema) : (item : any) => OutputType|undefined{
    return (
        (item: any)=>{
            return parseJoiTypeItems<OutputType>(item,JoiItem);
        }
    );
}

function generateIsTypeItemFunction(JoiItem : Joi.AnySchema) : (item : any) => boolean{
    return (
        (item: any)=>{
            return isJoiTypeItem(item,JoiItem);
        }
    );
}

export {parseJoiTypeItems,isJoiTypeItem,generateIsTypeItemFunction,generateParseFunction};