import Joi from "joi";
import { parseJoiTypeItems } from "../../Utilities/JoiCheckFunctions";

enum PDKExceptionCode{
    NO_ERROR = 0,
    UNKNOWN_INNER_ERROR = 1,
    STORAGE_ENGINE_ERROR = 2,
    INNER_ARGUMENT_ERROR = 3,
    SENDER_SERVICE_ERROR = 4,
    ITEM_NOT_FOUND_ERROR = 10,
    ITEM_ALREADY_EXIST_ERROR = 11,
    ITEM_EXPIRED_OR_USED_ERROR = 12,
    PERMISSION_DENIED = 13,
    CREDENTIAL_NOT_MATCH = 14,
    REQUEST_PARAM_FORMAT_ERROR = 20
}

const PDKExceptionCodes = [
    0,
    1,
    2,
    3,
    4,
    10,
    11,
    12,
    13,
    14,
    20
];

export {PDKExceptionCode, PDKExceptionCodes};

abstract class PDKException<ParamType> extends Error{
    params : ParamType;
    errCode: PDKExceptionCode;
    constructor(errCode : PDKExceptionCode, params : ParamType, message? : string){
        super(message);
        this.errCode = errCode;
        this.params = params;
    }
}

export {PDKException};

interface PDKExceptionOutput{
    params: any,
    errCode: PDKExceptionCode,
    message?: string
}
const PDKExceptionOutputJoiType = Joi.object({
    params: Joi.any().optional(),
    errCode: Joi.number().allow(...PDKExceptionCodes).required(),
    message: Joi.string().optional()
});

export type {PDKExceptionOutput};
export {PDKExceptionOutputJoiType};


class PDKNoError extends PDKException<undefined>{
    constructor(message?: string){
        super(PDKExceptionCode.NO_ERROR,undefined,undefined);
    }
}

export {PDKNoError}

class PDKUnknownInnerError extends PDKException<undefined>{
    constructor(message?: string){
        super(PDKExceptionCode.UNKNOWN_INNER_ERROR,undefined,message);
    }
}

export {PDKUnknownInnerError};

interface PDKStorageEngineErrorParamType {
    storageEngineName?: string,
    storageStatusCode?: number,
    storageErrorDescription?: string
};

export type {PDKStorageEngineErrorParamType};

class PDKStorageEngineError extends PDKException<PDKStorageEngineErrorParamType>{
    constructor(params : PDKStorageEngineErrorParamType, message?: string){
        super(PDKExceptionCode.STORAGE_ENGINE_ERROR,params,message);
    }
}

export {PDKStorageEngineError};

interface PDKArgumentErrorParamType<ArgumentNamePossibleTypes>{
    errorArgs: ArgumentNamePossibleTypes[]
}

export type {PDKArgumentErrorParamType};

class PDKInnerArgumentError<ArgumentNamePossibleTypes> extends PDKException<PDKArgumentErrorParamType<ArgumentNamePossibleTypes>>{
    constructor(errorArgs: ArgumentNamePossibleTypes[], message?: string){
        super(PDKExceptionCode.INNER_ARGUMENT_ERROR,{errorArgs:errorArgs},message);
    }
}

export {PDKInnerArgumentError};

class PDKSenderServiceError extends PDKException<undefined>{
    constructor(message?: string){
        super(PDKExceptionCode.SENDER_SERVICE_ERROR,undefined,message);
    }
}

export {PDKSenderServiceError};

interface ItemRelatedErrorParam<ItemNamePossibleTypes>{
    errorItems: ItemNamePossibleTypes[]
}

export type {ItemRelatedErrorParam};

class PDKItemNotFoundError<ItemNamePossibleTypes> extends PDKException<ItemRelatedErrorParam<ItemNamePossibleTypes>>{
    constructor(errorItems : ItemNamePossibleTypes[], message?: string){
        super(PDKExceptionCode.ITEM_NOT_FOUND_ERROR,{errorItems:errorItems},message);
    }
}

export {PDKItemNotFoundError};

class PDKItemAlreadyExistError<ItemNamePossibleTypes> extends PDKException<ItemRelatedErrorParam<ItemNamePossibleTypes>>{
    constructor(errorItems : ItemNamePossibleTypes[], message?: string){
        super(PDKExceptionCode.ITEM_ALREADY_EXIST_ERROR,{errorItems:errorItems},message);
    }
}

export {PDKItemAlreadyExistError};

class PDKItemExpiredOrUsedError<ItemNamePossibleTypes> extends PDKException<ItemRelatedErrorParam<ItemNamePossibleTypes>>{
    constructor(errorItems : ItemNamePossibleTypes[], message?: string){
        super(PDKExceptionCode.ITEM_EXPIRED_OR_USED_ERROR,{errorItems:errorItems},message);
    }
}

export {PDKItemExpiredOrUsedError};

class PDKPermissionDeniedError<PermissionItemPossibleTypes> extends PDKException<ItemRelatedErrorParam<PermissionItemPossibleTypes>>{
    constructor(permissionErrorItems : PermissionItemPossibleTypes[], message?: string){
        super(PDKExceptionCode.PERMISSION_DENIED, {errorItems: permissionErrorItems}, message);
    }
}

export {PDKPermissionDeniedError};

class PDKCredentialNotMatchError<CredentialItemPossibleTypes> extends PDKException<ItemRelatedErrorParam<CredentialItemPossibleTypes>>{
    constructor(credentialErrorItems : CredentialItemPossibleTypes[], message?: string){
        super(PDKExceptionCode.CREDENTIAL_NOT_MATCH, {errorItems: credentialErrorItems}, message);
    }
}

export {PDKCredentialNotMatchError};

class PDKRequestParamFormatError<ArgumentNamePossibleTypes> extends PDKException<PDKArgumentErrorParamType<ArgumentNamePossibleTypes>>{
    constructor(argumentNames: ArgumentNamePossibleTypes[], message?: string){
        super(PDKExceptionCode.REQUEST_PARAM_FORMAT_ERROR, {errorArgs: argumentNames}, message);
    }
}

export {PDKRequestParamFormatError};

function generatePDKExceptionOutputObj(exception: PDKException<any>) : PDKExceptionOutput{
    let returnObj : PDKExceptionOutput = {
        errCode: exception.errCode,
        params: undefined,
        message: exception.message
    };
    if(exception.params !== undefined){
        returnObj.params = Object.assign({},exception.params);
    }
    return returnObj;
}

export {generatePDKExceptionOutputObj};


function checkParamInExceptionOutput(parsedOutput : PDKExceptionOutput, paramName : string) : boolean{
    return parsedOutput.params !== undefined && paramName in parsedOutput.params;
}

function parsePDKExceptionOutputObj(exceptionObject : any) : PDKNoError | PDKInnerArgumentError<any> | PDKStorageEngineError | PDKUnknownInnerError | PDKSenderServiceError | PDKItemNotFoundError<any> | PDKItemAlreadyExistError<any> | PDKItemExpiredOrUsedError<any> | PDKPermissionDeniedError<any> | PDKCredentialNotMatchError<any> | PDKRequestParamFormatError<any> | undefined{
    //try parse exception
    let parsedOutput = parseJoiTypeItems<PDKExceptionOutput>(exceptionObject,PDKExceptionOutputJoiType);
    if(parsedOutput === undefined){
        return undefined;
    }
    switch(parsedOutput.errCode){
        case PDKExceptionCode.NO_ERROR:
            return new PDKNoError(parsedOutput.message);
        case PDKExceptionCode.UNKNOWN_INNER_ERROR:
            return new PDKUnknownInnerError(parsedOutput.message);
        case PDKExceptionCode.STORAGE_ENGINE_ERROR:
            let parsedParams : PDKStorageEngineErrorParamType = {};
            if(parsedOutput.params !== undefined){
                parsedParams = parsedOutput.params as PDKStorageEngineErrorParamType;
            }
            return new PDKStorageEngineError(parsedParams,parsedOutput.message);
        case PDKExceptionCode.INNER_ARGUMENT_ERROR:
            if(!checkParamInExceptionOutput(parsedOutput,'errorArgs')){
                return undefined;
            }
            return new PDKInnerArgumentError(parsedOutput.params.errorArgs,parsedOutput.message);
        case PDKExceptionCode.SENDER_SERVICE_ERROR:
            return new PDKSenderServiceError(parsedOutput.message);
        case PDKExceptionCode.ITEM_NOT_FOUND_ERROR:
            if(!checkParamInExceptionOutput(parsedOutput,'errorItems')){
                return undefined;
            }
            return new PDKItemNotFoundError(parsedOutput.params.errorItems,parsedOutput.message);
        case PDKExceptionCode.ITEM_ALREADY_EXIST_ERROR:
            if(!checkParamInExceptionOutput(parsedOutput,'errorItems')){
                return undefined;
            }
            return new PDKItemAlreadyExistError(parsedOutput.params.errorItems,parsedOutput.message);
        case PDKExceptionCode.ITEM_EXPIRED_OR_USED_ERROR:
            if(!checkParamInExceptionOutput(parsedOutput,'errorItems')){
                return undefined;
            }
            return new PDKItemExpiredOrUsedError(parsedOutput.params.errorItems,parsedOutput.message);
        case PDKExceptionCode.PERMISSION_DENIED:
            if(!checkParamInExceptionOutput(parsedOutput,'errorItems')){
                return undefined;
            }
            return new PDKPermissionDeniedError(parsedOutput.params.errorItems, parsedOutput.message);
        case PDKExceptionCode.CREDENTIAL_NOT_MATCH:
            if(!checkParamInExceptionOutput(parsedOutput,'errorItems')){
                return undefined;
            }
            return new PDKCredentialNotMatchError(parsedOutput.params.errorItems,parsedOutput.message);
        case PDKExceptionCode.REQUEST_PARAM_FORMAT_ERROR:
            if(!checkParamInExceptionOutput(parsedOutput,'errorArgs')){
                return undefined;
            }
            return new PDKRequestParamFormatError(parsedOutput.params.errorArgs,parsedOutput.message);
        default:
            return undefined;
    }
}

export {parsePDKExceptionOutputObj};