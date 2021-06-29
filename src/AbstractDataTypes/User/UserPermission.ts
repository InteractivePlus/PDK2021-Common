import * as Joi from "joi";
import PermissionItem, { PermissionItemJoiType } from "../../InternalDataTypes/PermissionItem";
import SettingBoolean, { SettingBooleanJoiType } from "../../InternalDataTypes/SettingBoolean";
import { generateIsTypeItemFunction, generateParseFunction } from "../../Utilities/JoiCheckFunctions";

interface IndividualSectionManagementPermissions{
    user: {
        normalUsers: PermissionItem<SettingBoolean>,
        protectedUsers: PermissionItem<SettingBoolean>,
        adminUsers: PermissionItem<SettingBoolean>,
        superAdminUsers: PermissionItem<SettingBoolean>
    },
    app: {
        normalAPPs: PermissionItem<SettingBoolean>,
        protectedAPPs: PermissionItem<SettingBoolean>,
        trustedAPPs: PermissionItem<SettingBoolean>,
        officialAPPs: PermissionItem<SettingBoolean>
    }
}

const IndividualSectionManagementPermissionsJoiType = Joi.object({
    user: {
        normalUsers: PermissionItemJoiType,
        protectedUsers: PermissionItemJoiType,
        adminUsers: PermissionItemJoiType,
        superAdminUsers: PermissionItemJoiType
    },
    app: {
        normalAPPs: PermissionItemJoiType,
        protectedAPPs: PermissionItemJoiType,
        trustedAPPs: PermissionItemJoiType,
        officialAPPs: PermissionItemJoiType,
    }
})

let parseIndividualSectionManagementPermissions = generateParseFunction(IndividualSectionManagementPermissionsJoiType);
let isIndividualSectoinManagementPermissions = generateIsTypeItemFunction(IndividualSectionManagementPermissionsJoiType);

interface UserPermission{
    canCreateAPP: SettingBoolean;
    isAdmin: SettingBoolean;
    isSuperAdmin: SettingBoolean;
    individualManagementSegments: IndividualSectionManagementPermissions
}

const UserPermissionJoiType = Joi.object({
    canCreateAPP: SettingBooleanJoiType,
    isAdmin: SettingBooleanJoiType,
    isSuperAdmin: SettingBooleanJoiType,
    individualManagementSegments: IndividualSectionManagementPermissionsJoiType
});

let parseUserPermission = generateParseFunction(UserPermissionJoiType);
let isUserPermission = generateIsTypeItemFunction(UserPermissionJoiType);

export default UserPermission;
export {IndividualSectionManagementPermissions, IndividualSectionManagementPermissionsJoiType, parseIndividualSectionManagementPermissions, isIndividualSectoinManagementPermissions, UserPermissionJoiType, parseUserPermission, isUserPermission};
