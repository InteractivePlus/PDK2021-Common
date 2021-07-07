import {UserEntityFormatSetting} from "../User/UserEntityFormatSetting";
import { UserPermission } from "../User/UserPermission";
import { UserSetting } from "../User/UserSetting";
import {UserTokenFormatSetting} from "../User/UserTokenFormatSetting";
import { UserGroupGroupID } from "../UserGroup/UserGroup";
import {UserGroupFormatSetting} from "../UserGroup/UserGroupFormatSetting";

interface UserSystemSetting{
    userEntityFormatSetting: UserEntityFormatSetting,
    userGroupFormatSetting: UserGroupFormatSetting,
    userTokenFormatSetting: UserTokenFormatSetting,
    defaultNewUserGroupId: UserGroupGroupID,
    userTokenAvailableDuration: {
        accessToken: number,
        refreshToken: number
    },
    baseUserPermission: UserPermission,
    baseUserSetting: UserSetting,
    passwordEncrypt(passwordToEncrypt : string) : string
}

export type {UserSystemSetting};