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
        normalUsers: PermissionItemJoiType.required(),
        protectedUsers: PermissionItemJoiType.required(),
        adminUsers: PermissionItemJoiType.required(),
        superAdminUsers: PermissionItemJoiType.required()
    },
    app: {
        normalAPPs: PermissionItemJoiType.required(),
        protectedAPPs: PermissionItemJoiType.required(),
        trustedAPPs: PermissionItemJoiType.required(),
        officialAPPs: PermissionItemJoiType.required(),
    }
})

let parseIndividualSectionManagementPermissions = generateParseFunction<IndividualSectionManagementPermissions>(IndividualSectionManagementPermissionsJoiType);
let isIndividualSectoinManagementPermissions = generateIsTypeItemFunction(IndividualSectionManagementPermissionsJoiType);

interface UserPermission{
    canCreateAPP: SettingBoolean;
    isAdmin: SettingBoolean;
    isSuperAdmin: SettingBoolean;
    individualManagementSegments: IndividualSectionManagementPermissions
}

const UserPermissionJoiType = Joi.object({
    canCreateAPP: SettingBooleanJoiType.required(),
    isAdmin: SettingBooleanJoiType.required(),
    isSuperAdmin: SettingBooleanJoiType.required(),
    individualManagementSegments: IndividualSectionManagementPermissionsJoiType.required()
});

let parseUserPermission = generateParseFunction<UserPermission>(UserPermissionJoiType);
let isUserPermission = generateIsTypeItemFunction(UserPermissionJoiType);

export default UserPermission;
export {IndividualSectionManagementPermissions, IndividualSectionManagementPermissionsJoiType, parseIndividualSectionManagementPermissions, isIndividualSectoinManagementPermissions, UserPermissionJoiType, parseUserPermission, isUserPermission};
