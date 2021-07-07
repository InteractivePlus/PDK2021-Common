import Joi from "joi";
import { generateIsTypeItemFunction, generateParseFunction } from "../../Utilities/JoiCheckFunctions";
import { UserEntityUID, UserEntityUIDJoiType } from "./UserEntity";
import {UserTokenFormatSetting} from "./UserTokenFormatSetting";

type UserAccessToken = string;
function getUserAccessTokenJoiType(accessTokenCharNum? : number) : Joi.Schema{
    if(accessTokenCharNum !== undefined){
        return Joi.string().length(accessTokenCharNum);
    }else{
        return Joi.string();
    }
}

export type {UserAccessToken};
export {getUserAccessTokenJoiType};

type UserRefreshToken = string;
function getUserRefreshTokenJoiType(refreshTokenCharNum? : number) : Joi.Schema{
    if(refreshTokenCharNum !== undefined){
        return Joi.string().length(refreshTokenCharNum);
    }else{
        return Joi.string();
    }
}

export type {UserRefreshToken};
export {getUserRefreshTokenJoiType};

interface UserToken{
    userId: UserEntityUID,
    accessToken: UserAccessToken,
    refreshToken: UserRefreshToken,
    issueTimeGMT: number,
    refreshedTimeGMT?: number,
    expireTimeGMT: number,
    refreshExpireTimeGMT: number,
    valid: boolean,
    invalidDueToRefresh?: boolean,
    issueRemoteAddr?: string,
    renewRemoteAddr?: string
}

export type {UserToken};

function getUserTokenJoiType(formatSetting?: UserTokenFormatSetting) : Joi.Schema{
    return Joi.object({
        userId: UserEntityUIDJoiType.required(),
        accessToken: getUserAccessTokenJoiType(formatSetting?.acessTokenCharNum).required(),
        refreshToken: getUserRefreshTokenJoiType(formatSetting?.refreshTokenCharNum).required(),
        issueTimeGMT: Joi.number().required(),
        refreshedTimeGMT: Joi.number().optional(),
        expireTimeGMT: Joi.number().required(),
        refreshExpireTimeGMT: Joi.number().required(),
        valid: Joi.boolean().required(),
        invalidDueToRefresh: Joi.boolean().optional(),
        issueRemoteAddr: Joi.string().required(),
        renewRemoteAddr: Joi.string().required()
    });
}

function parseUserToken(formatSetting? : UserTokenFormatSetting){
    return generateParseFunction<UserToken>(getUserTokenJoiType(formatSetting));
}

function isUserToken(formatSetting?: UserTokenFormatSetting){
    return generateIsTypeItemFunction(getUserTokenJoiType(formatSetting));
}

export {getUserTokenJoiType, parseUserToken, isUserToken};
