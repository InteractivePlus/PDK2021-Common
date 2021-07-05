import UserEntityFormatSetting from "../User/UserEntityFormatSetting";
import UserTokenFormatSetting from "../User/UserTokenFormatSetting";
import { UserGroupGroupID } from "../UserGroup/UserGroup";
import UserGroupFormatSetting from "../UserGroup/UserGroupFormatSetting";

interface UserSystemSetting{
    userEntityFormatSetting: UserEntityFormatSetting,
    userGroupFormatSetting: UserGroupFormatSetting,
    userTokenFormatSetting: UserTokenFormatSetting,
    defaultNewUserGroupId: UserGroupGroupID,
    passwordEncrypt(passwordToEncrypt : string) : string;
}

export default UserSystemSetting;