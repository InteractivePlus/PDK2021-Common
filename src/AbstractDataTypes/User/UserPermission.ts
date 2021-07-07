import * as Joi from "joi";
import { getPermissionItemJoiType, PermissionItem } from "../../InternalDataTypes/PermissionItem";
import { SettingBoolean, SettingBooleanJoiType, SettingNumber, SettingNumberJoiType, SettingObject } from "../../InternalDataTypes/SettingValue";
import { generateIsTypeItemFunction, generateParseFunction } from "../../Utilities/JoiCheckFunctions";

interface IndividualSectionManagementPermissions extends SettingObject{
    user: {
        normalUsers: PermissionItem<SettingBoolean> & SettingObject,
        protectedUsers: PermissionItem<SettingBoolean> & SettingObject,
        adminUsers: PermissionItem<SettingBoolean> & SettingObject,
        superAdminUsers: PermissionItem<SettingBoolean> & SettingObject
    },
    app: {
        normalAPPs: PermissionItem<SettingBoolean> & SettingObject,
        protectedAPPs: PermissionItem<SettingBoolean> & SettingObject,
        trustedAPPs: PermissionItem<SettingBoolean> & SettingObject,
        officialAPPs: PermissionItem<SettingBoolean> & SettingObject
    }
}

const IndividualSectionManagementPermissionsJoiType = Joi.object({
    user: {
        normalUsers: getPermissionItemJoiType(SettingBooleanJoiType).required(),
        protectedUsers: getPermissionItemJoiType(SettingBooleanJoiType).required(),
        adminUsers: getPermissionItemJoiType(SettingBooleanJoiType).required(),
        superAdminUsers: getPermissionItemJoiType(SettingBooleanJoiType).required()
    },
    app: {
        normalAPPs: getPermissionItemJoiType(SettingBooleanJoiType).required(),
        protectedAPPs: getPermissionItemJoiType(SettingBooleanJoiType).required(),
        trustedAPPs: getPermissionItemJoiType(SettingBooleanJoiType).required(),
        officialAPPs: getPermissionItemJoiType(SettingBooleanJoiType).required(),
    }
})

let parseIndividualSectionManagementPermissions = generateParseFunction<IndividualSectionManagementPermissions>(IndividualSectionManagementPermissionsJoiType);
let isIndividualSectoinManagementPermissions = generateIsTypeItemFunction(IndividualSectionManagementPermissionsJoiType);

interface UserPermission extends SettingObject{
    canCreateAPP: SettingBoolean;
    isProtectedUser: SettingBoolean,
    isAdmin: SettingBoolean;
    isSuperAdmin: SettingBoolean;
    individualManagementSegments: IndividualSectionManagementPermissions,
    maxMaskIDNum: SettingNumber,
    maxAvatarSize: SettingNumber
}

const UserPermissionJoiType = Joi.object({
    canCreateAPP: SettingBooleanJoiType.required(),
    isProtectedUser: SettingBooleanJoiType.required(),
    isAdmin: SettingBooleanJoiType.required(),
    isSuperAdmin: SettingBooleanJoiType.required(),
    individualManagementSegments: IndividualSectionManagementPermissionsJoiType.required(),
    maxMaskIDNum: SettingNumberJoiType.required(),
    maxAvatarSize: SettingNumberJoiType.required()
});

let parseUserPermission = generateParseFunction<UserPermission>(UserPermissionJoiType);
let isUserPermission = generateIsTypeItemFunction(UserPermissionJoiType);

export type {UserPermission};
export type {IndividualSectionManagementPermissions};
export { IndividualSectionManagementPermissionsJoiType, parseIndividualSectionManagementPermissions, isIndividualSectoinManagementPermissions, UserPermissionJoiType, parseUserPermission, isUserPermission};
