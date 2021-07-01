import * as Joi from "joi";

type APPUID = number | string;
let APPUIDJoiType = Joi.alternatives([
    Joi.string(),
    Joi.number()
]);

export {APPUID, APPUIDJoiType};

type APPClientID = string;
function getAPPClientIDJoiType(appClientIDCharNum? : number){
    if(appClientIDCharNum !== undefined){
        return Joi.string().length(appClientIDCharNum);
    }else{
        return Joi.string();
    }
}

export {APPClientID, getAPPClientIDJoiType};

type APPClientSecret = string;
function getAPPClientSecretJoiType(appClientSecretCharNum? : number){
    if(appClientSecretCharNum !== undefined){
        return Joi.string().length(appClientSecretCharNum);
    }else{
        return Joi.string();
    }
}

export {APPClientSecret, getAPPClientSecretJoiType};
