import * as Joi from "joi";

function getJoiTypeFromMinMaxRegex(min? : number, max? : number, regex? : string) {
    let type = Joi.string();
    if(min !== undefined){
        type = type.min(min);
    }
    if(max !== undefined){
        type = type.max(max);
    }
    if(regex !== undefined){
        type = type.regex(new RegExp(regex,'g'));
    }
    return type;
}

export {getJoiTypeFromMinMaxRegex};