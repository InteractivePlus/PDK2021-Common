import UserEntityFormatSetting from "../User/UserEntityFormatSetting";
import { UserGroupGroupID } from "../UserGroup/UserGroup";
import UserGroupFormatSetting from "../UserGroup/UserGroupFormatSetting";

interface UserSystemSetting{
    userEntityFormatSetting: UserEntityFormatSetting,
    userGroupFormatSetting: UserGroupFormatSetting,
    defaultNewUserGroupId: UserGroupGroupID
}

export default UserSystemSetting;