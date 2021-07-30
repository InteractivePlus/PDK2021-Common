import Joi from "joi";
import { generateIsTypeItemFunction, generateParseFunction } from "../../../Utilities/JoiCheckFunctions";
import { MaskUID, MaskUIDJoiType } from "../../MaskID/MaskIDEntity";
import { APPClientID, APPUID, APPUIDJoiType, getAPPClientIDJoiType } from "../../RegisteredAPP/APPEntityFormat";
import {APPEntityFormatSetting} from "../../RegisteredAPP/APPEntityFormatSetting";
import { UserEntityUID, UserEntityUIDJoiType } from "../../User/UserEntity";
import { OAuthScope, OAuthScopes } from "../OAuthScope";
import {OAuthTokenFormatSetting} from "./OAuthTokenFormatSetting";

type OAuthAccessToken = string;
function getOAuthAccessTokenJoiType(accessTokenCharNum? : number){
    if(accessTokenCharNum !== undefined){
        return Joi.string().length(accessTokenCharNum);
    }else{
        return Joi.string();
    }
}

export type {OAuthAccessToken};
export { getOAuthAccessTokenJoiType};

type OAuthRefreshToken = string;
function getOAuthRefreshTokenJoiType(refreshTokenCharNum?: number){
    if(refreshTokenCharNum !== undefined){
        return Joi.string().length(refreshTokenCharNum);
    }else{
        return Joi.string();
    }
}

export type {OAuthRefreshToken};
export {getOAuthRefreshTokenJoiType};

interface OAuthToken{
    maskUID: MaskUID,
    userUID: UserEntityUID,
    clientID: APPClientID,
    appUID: APPUID,
    accessToken: OAuthAccessToken,
    refreshToken: OAuthRefreshToken,
    issueTimeGMT: number,
    refreshedTimeGMT: number,
    expireTimeGMT: number,
    refreshExpireTimeGMT: number,
    valid: boolean,
    invalidDueToRefresh?: boolean,
    userSideRemoteAddr?: string,
    appSideRemoteAddr?: string,
    scopes: OAuthScope[]
}

export type {OAuthToken};

function getOAuthTokenJoiType(formatSetting?: OAuthTokenFormatSetting, appEntityFormatSetting?: APPEntityFormatSetting){
    return Joi.object({
        maskUID: MaskUIDJoiType.required(),
        userUID: UserEntityUIDJoiType.optional(),
        clientID: getAPPClientIDJoiType(appEntityFormatSetting?.clientIDCharNum).required(),
        appUID: APPUIDJoiType.optional(),
        accessToken: getOAuthAccessTokenJoiType(formatSetting?.accessTokenCharNum).required(),
        refreshToken: getOAuthRefreshTokenJoiType(formatSetting?.refreshTokenCharNum).required(),
        issueTimeGMT: Joi.number().required(),
        refreshedTimeGMT: Joi.number().required(),
        expireTimeGMT: Joi.number().required(),
        refreshExpireTimeGMT: Joi.number().required(),
        valid: Joi.boolean().required(),
        invalidDueToRefresh: Joi.boolean().optional(),
        userSideRemoteAddr: Joi.string().optional(),
        appSideRemoteAddr: Joi.string().optional(),
        scopes: Joi.valid(...OAuthScopes).required()
    });
}

export {getOAuthTokenJoiType};

function parseOAuthToken(formatSetting?: OAuthTokenFormatSetting, appEntityFormatSetting? : APPEntityFormatSetting){
    return generateParseFunction<OAuthToken>(getOAuthTokenJoiType(formatSetting,appEntityFormatSetting));
}

function isOAuthToken(formatSetting?: OAuthTokenFormatSetting, appEntityFormatSetting?: APPEntityFormatSetting){
    return generateIsTypeItemFunction(getOAuthTokenJoiType(formatSetting,appEntityFormatSetting));
}

export {parseOAuthToken, isOAuthToken};