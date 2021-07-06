import Joi from "joi";
import { generateRandomHexString } from "../../../Utilities/HEXString";
import { generateIsTypeItemFunction, generateParseFunction } from "../../../Utilities/JoiCheckFunctions";
import { MaskIDEntityJoiType, MaskUID } from "../../MaskID/MaskIDEntity";
import { getOAuthAccessTokenJoiType, OAuthAccessToken, OAuthTokenFormatSetting } from "../../OAuth/ALL";
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
    relatedAPP: APPUID,
    relatedMaskID?: MaskUID,
    relatedAPPClientID?: APPClientID,
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

function getVerificationCodeEntityJoiType(paramType : Joi.Schema = Joi.any().optional(), formatSetting?: VerificationCodeEntityFormatSetting, appEntityFormatSetting?: APPEntityFormatSetting, oAuthTokenFormatSetting?: OAuthTokenFormatSetting){
    let baseJoiSchema : Joi.SchemaMap = {
        relatedUser: UserEntityUIDJoiType.required(),
        relatedAPP: APPUIDJoiType.required(),
        relatedMaskID: MaskIDEntityJoiType.optional(),
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
            isShortID: Joi.boolean().allow([false]).required()
        },baseJoiSchema)),
        Joi.object(Object.assign({
            veriCodeID: getVeriCodeEntityIDJoiType(formatSetting?.veriCodeEntityShortIDCharNum).required(),
            isShortID: Joi.boolean().allow([true]).required()
        }))
    ]);
}
export {getVerificationCodeEntityJoiType};

function parseVerificationCodeEntity<ParamType>(paramType : Joi.Schema = Joi.any().optional(), formatSetting?: VerificationCodeEntityFormatSetting, appEntityFormatSetting?: APPEntityFormatSetting, oAuthTokenFormatSetting?: OAuthTokenFormatSetting){
    return generateParseFunction<VerificationCodeEntity<ParamType>>(getVerificationCodeEntityJoiType(
        paramType,
        formatSetting,
        appEntityFormatSetting,
        oAuthTokenFormatSetting
    ));
}

function isVerificationCodeEntity(paramType : Joi.Schema = Joi.any().optional(), formatSetting?: VerificationCodeEntityFormatSetting, appEntityFormatSetting?: APPEntityFormatSetting, oAuthTokenFormatSetting?: OAuthTokenFormatSetting){
    return generateIsTypeItemFunction(getVerificationCodeEntityJoiType(
        paramType,
        formatSetting,
        appEntityFormatSetting,
        oAuthTokenFormatSetting
    ));
}

export {parseVerificationCodeEntity, isVerificationCodeEntity};
