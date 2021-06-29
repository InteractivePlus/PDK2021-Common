import * as Joi from "joi";

function parseJoiTypeItems<OutputType>(item : any, JoiItem : Joi.AnySchema) : OutputType | undefined{
    let validationResult = JoiItem.validate(item);
    if(validationResult.error !== undefined){
        return undefined;
    }else{
        return validationResult.value;
    }
}

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