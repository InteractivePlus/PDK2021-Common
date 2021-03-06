import * as Joi from "joi";
import { generateIsTypeItemFunction, generateParseFunction } from "../../Utilities/JoiCheckFunctions";
import { getJoiTypeFromMinMaxRegex } from "../../Utilities/JoiTypeUtil";
import { UserPermission, UserPermissionJoiType } from "../User/UserPermission";
import { UserSetting, UserSettingJoiType } from "../User/UserSetting";
import {UserGroupFormatSetting} from "./UserGroupFormatSetting";

type UserGroupGroupID = string;

function getUserGroupGroupIDJoiType(formatSetting?: UserGroupFormatSetting){
    return getJoiTypeFromMinMaxRegex(formatSetting?.groupIdMinLen,formatSetting?.groupIdMaxLen,formatSetting?.groupIdRegex);
}

export type {UserGroupGroupID};
export {getUserGroupGroupIDJoiType};

interface UserGroup{
    groupId: UserGroupGroupID,
    nickname?: string,
    description?: string,
    permissions: UserPermission,
    settings: UserSetting,
    avatarSalt?: string
}

export type {UserGroup};

function getUserGroupJoiType(formatSetting? : UserGroupFormatSetting){
    return Joi.object({
        groupId: getUserGroupGroupIDJoiType(formatSetting).required(),
        nickname: getJoiTypeFromMinMaxRegex(formatSetting?.nicknameMinLen, formatSetting?.nicknameMaxLen, formatSetting?.nicknameRegex).optional(),
        description: getJoiTypeFromMinMaxRegex(formatSetting?.descriptionMinLen,formatSetting?.descriptionMaxLen, formatSetting?.descriptionRegex).optional(),
        permissions: UserPermissionJoiType.required(),
        settings: UserSettingJoiType.required(),
        avatarSalt: Joi.string().optional()
    });
}

function parseUserGroup(formatSetting? : UserGroupFormatSetting){
    return generateParseFunction<UserGroup>(getUserGroupJoiType(formatSetting));
}
function isUserGroup(formatSetting? : UserGroupFormatSetting){
    return generateIsTypeItemFunction(getUserGroupJoiType(formatSetting));
}

export {getUserGroupJoiType, parseUserGroup, isUserGroup};