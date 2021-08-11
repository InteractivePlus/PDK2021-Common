import Joi from "joi";
import { generateRandomHexString } from "../../../Utilities/HEXString";
import { generateIsTypeItemFunction, generateParseFunction } from "../../../Utilities/JoiCheckFunctions";
import { getMaskIDEntityJoiType, MaskUID } from "../../MaskID/MaskIDEntity";
import { MaskIDEntityFormatSetting } from "../../MaskID/MaskIDEntityFormatSetting";
import { getOAuthAccessTokenJoiType, OAuthAccessToken } from "../../OAuth/Token/OAuthToken";
import { OAuthTokenFormatSetting } from "../../OAuth/Token/OAuthTokenFormatSetting";
import { APPClientID, APPUID, APPUIDJoiType, getAPPClientIDJoiType } from "../../RegisteredAPP/APPEntityFormat";
import { APPEntityFormatSetting } from "../../RegisteredAPP/APPEntityFormatSetting";
import { UserEntityUID, UserEntityUIDJoiType } from "../../User/UserEntity";
import { CommunicationMethodsWithNone, CommunicationMethodWithNone } from "../CommunicationMethod";
import { VerificationCodeEntityFormatSetting } from "./VerificationCodeEntityFormatSetting";

type VeriCodeEntityID = string;
function getVeriCodeEntityIDJoiType(veriCodeEntityIDCharNum? : number) : Joi.Schema{
    if(veriCodeEntityIDCharNum !== undefined){
        return Joi.string().length(veriCodeEntityIDCharNum);
    }else{
        return Joi.string();
    }
}
function generateVeriCodeEntityID(veriCodeEntityIDCharNum: number) : VeriCodeEntityID{
    return generateRandomHexString(veriCodeEntityIDCharNum);
}
export type {VeriCodeEntityID};
export {getVeriCodeEntityIDJoiType, generateVeriCodeEntityID};

interface VerificationCodeEntity<ParamType>{
    veriCodeID: VeriCodeEntityID,
    isShortID: boolean,
    relatedUser: UserEntityUID,
    relatedAPP: APPUID | null,
    relatedMaskID?: MaskUID,
    relatedAPPClientID: APPClientID | null,
    relatedOAuthToken?: OAuthAccessToken,
    param?: ParamType,
    triggerClientIP: string,
    issueUTCTime: number,
    expireUTCTime: number,
    useScope: string | number,
    used: boolean,
    sentMethod: CommunicationMethodWithNone
}
export type {VerificationCodeEntity};

function getVerificationCodeEntityJoiType(paramType : Joi.Schema = Joi.any().optional(), formatSetting?: VerificationCodeEntityFormatSetting, appEntityFormatSetting?: APPEntityFormatSetting, oAuthTokenFormatSetting?: OAuthTokenFormatSetting, maskIDFormatSetting?: MaskIDEntityFormatSetting){
    let baseJoiSchema : Joi.SchemaMap = {
        relatedUser: UserEntityUIDJoiType.required(),
        relatedAPP: APPUIDJoiType.required(),
        relatedMaskID: getMaskIDEntityJoiType(maskIDFormatSetting).optional(),
        relatedAPPClientID: getAPPClientIDJoiType(appEntityFormatSetting?.clientIDCharNum).optional(),
        relatedOAuthToken: getOAuthAccessTokenJoiType(oAuthTokenFormatSetting?.accessTokenCharNum).optional(),
        param: paramType.optional(),
        triggerClientIP: Joi.string().max(45).required(), //IPV6 45
        issueUTCTime: Joi.number().required(),
        expireUTCTime: Joi.number().required(),
        useScope: [
            Joi.string().required(),
            Joi.number().required()
        ],
        used: Joi.boolean().required(),
        sentMethod: CommunicationMethodsWithNone
    }
    return Joi.alternatives([
        Joi.object(Object.assign({
            veriCodeID: getVeriCodeEntityIDJoiType(formatSetting?.veriCodeEntityIDCharNum).required(),
            isShortID: Joi.boolean().valid(false).required()
        },baseJoiSchema)),
        Joi.object(Object.assign({
            veriCodeID: getVeriCodeEntityIDJoiType(formatSetting?.veriCodeEntityShortIDCharNum).required(),
            isShortID: Joi.boolean().valid(true).required()
        }))
    ]);
}
export {getVerificationCodeEntityJoiType};

function parseVerificationCodeEntity<ParamType>(paramType : Joi.Schema = Joi.any().optional(), formatSetting?: VerificationCodeEntityFormatSetting, appEntityFormatSetting?: APPEntityFormatSetting, oAuthTokenFormatSetting?: OAuthTokenFormatSetting, maskIDFormatSetting?: MaskIDEntityFormatSetting){
    return generateParseFunction<VerificationCodeEntity<ParamType>>(getVerificationCodeEntityJoiType(
        paramType,
        formatSetting,
        appEntityFormatSetting,
        oAuthTokenFormatSetting,
        maskIDFormatSetting
    ));
}

function isVerificationCodeEntity(paramType : Joi.Schema = Joi.any().optional(), formatSetting?: VerificationCodeEntityFormatSetting, appEntityFormatSetting?: APPEntityFormatSetting, oAuthTokenFormatSetting?: OAuthTokenFormatSetting, maskIDFormatSetting?: MaskIDEntityFormatSetting){
    return generateIsTypeItemFunction(getVerificationCodeEntityJoiType(
        paramType,
        formatSetting,
        appEntityFormatSetting,
        oAuthTokenFormatSetting,
        maskIDFormatSetting
    ));
}

export {parseVerificationCodeEntity, isVerificationCodeEntity};
