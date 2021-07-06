import Joi from "joi";
import { generateIsTypeItemFunction, generateParseFunction } from "../../../Utilities/JoiCheckFunctions";
import { getJoiTypeFromMinMaxRegex } from "../../../Utilities/JoiTypeUtil";
import { MaskUID, MaskUIDJoiType } from "../../MaskID/MaskIDEntity";
import { APPClientID, APPUID, APPUIDJoiType, getAPPClientIDJoiType } from "../../RegisteredAPP/APPEntityFormat";
import {APPEntityFormatSetting} from "../../RegisteredAPP/APPEntityFormatSetting";
import { OAuthAuthorizationMethod, OAuthAuthorizationMethods } from "../OAuthAuthorizationMethod";
import { OAuthScope, OAuthScopes } from "../OAuthScope";
import { AuthCodeChallengeType, AuthCodeChallengeTypes } from "./AuthCodeFormat";
import {AuthorizationCodeEntityFormatSetting} from "./AuthorizationCodeEntityFormatSetting";

type AuthCode = string;
function getAuthCodeJoiType(charNum? : number){
    if(charNum !== undefined){
        return Joi.string().length(charNum);
    }else{
        return Joi.string();
    }
}

export type {AuthCode};
export {getAuthCodeJoiType};

interface AuthorizationCodeEntity{
    authCode: string,
    authMethod: OAuthAuthorizationMethod,
    issueTimeGMT: number,
    expireTimeGMT: number,
    grantUserRemoteAddr: string,
    appUID?: APPUID,
    clientID: APPClientID,
    maskUID: MaskUID,
    challengeType: AuthCodeChallengeType,
    used: boolean,
    scopes: OAuthScope[],
    codeChallenge?: string
}

export type {AuthorizationCodeEntity};

function getAuthorizationCodeEntityJoiType(formatSetting?: AuthorizationCodeEntityFormatSetting, appEntityFormatSetting? : APPEntityFormatSetting) : Joi.Schema{
    return Joi.object({
        authCode: getAuthCodeJoiType(formatSetting?.authCodeCharNum).required(),
        authMethod: Joi.allow(...OAuthAuthorizationMethods).required(),
        issueTimeGMT: Joi.number().required(),
        expireTimeGMT: Joi.number().required(),
        grantUserRemoteAddr: Joi.string().max(45), //IPV6 = 45
        appUID: APPUIDJoiType.optional(),
        clientID: getAPPClientIDJoiType(appEntityFormatSetting?.clientIDCharNum).required(),
        maskUID: MaskUIDJoiType.required(),
        challengeType: Joi.allow(...AuthCodeChallengeTypes).required(),
        used: Joi.boolean().required(),
        scopes: Joi.array().items(...OAuthScopes).required(),
        codeChallenge: getJoiTypeFromMinMaxRegex(undefined,formatSetting?.codeChallengeMaxLen,undefined).optional()
    });
}

function parseAuthorizationCodeEntity(formatSetting? : AuthorizationCodeEntityFormatSetting, appEntityFormatSetting?: APPEntityFormatSetting) {
    return generateParseFunction<AuthorizationCodeEntity>(getAuthorizationCodeEntityJoiType(formatSetting,appEntityFormatSetting));
}

function isAuthorizationCodeEntity(formatSetting?: AuthorizationCodeEntityFormatSetting, appEntityFormatSetting?: APPEntityFormatSetting){
    return generateIsTypeItemFunction(getAuthorizationCodeEntityJoiType(formatSetting,appEntityFormatSetting));
}

export {getAuthorizationCodeEntityJoiType, parseAuthorizationCodeEntity, isAuthorizationCodeEntity};
