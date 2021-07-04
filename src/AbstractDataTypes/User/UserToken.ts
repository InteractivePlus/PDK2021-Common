import Joi from "joi";
import { UserEntityUID, UserEntityUIDJoiType } from "./UserEntity";
import UserTokenFormatSetting from "./UserTokenFormatSetting";

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
    tokenOriginalIssueTimeGMT: number,
    tokenRecentRefreshedTimeGMT?: number,
    tokenExpireTimeGMT: number,
    refreshTokenExpireTimeGMT: number,
    valid: boolean,
    invalidDueToRefresh: boolean,
    issueRemoteAddr: string,
    renewRemoteAddr?: string
}

export default UserToken;

function getUserTokenJoiType(formatSetting?: UserTokenFormatSetting) : Joi.Schema{
    return Joi.object({
        userId: UserEntityUIDJoiType.required(),
        accessToken: getUserAccessTokenJoiType(formatSetting?.acessTokenCharNum).required(),
        refreshToken: getUserRefreshTokenJoiType(formatSetting?.refreshTokenCharNum).required(),
        tokenOriginalIssueTimeGMT: Joi.number().required(),
        
    })
}

