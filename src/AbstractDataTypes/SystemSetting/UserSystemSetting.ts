import UserEntityFormatSetting from "../User/UserEntityFormatSetting";
import { UserGroupGroupID } from "../UserGroup/UserGroup";

interface UserSystemSetting{
    userEntityFormatSetting: UserEntityFormatSetting,
    userGroupFormatSetting: UserGroupFormatSetting,
    defaultNewUserGroupId: UserGroupGroupID
}