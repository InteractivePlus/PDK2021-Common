import {UserEntityFormatSetting} from "../User/UserEntityFormatSetting";
import { UserPermission } from "../User/UserPermission";
import { UserSetting } from "../User/UserSetting";
import {UserTokenFormatSetting} from "../User/UserTokenFormatSetting";
import {UserGroupFormatSetting} from "../UserGroup/UserGroupFormatSetting";

interface UserSystemSetting{
    userEntityFormatSetting: UserEntityFormatSetting,
    userGroupFormatSetting: UserGroupFormatSetting,
    userTokenFormatSetting: UserTokenFormatSetting,
    userTokenAvailableDuration: {
        accessToken: number,
        refreshToken: number
    },
    baseUserPermission: UserPermission,
    baseUserSetting: UserSetting,
}

export type {UserSystemSetting};