import * as Joi from "joi";
import { PermissionItemJoiType } from "../../InternalDataTypes/PermissionItem";
import { SettingBooleanJoiType } from "../../InternalDataTypes/SettingBoolean";
import { generateIsTypeItemFunction, generateParseFunction } from "../../Utilities/JoiCheckFunctions";
var IndividualSectionManagementPermissionsJoiType = Joi.object({
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
        officialAPPs: PermissionItemJoiType
    }
});
var parseIndividualSectionManagementPermissions = generateParseFunction(IndividualSectionManagementPermissionsJoiType);
var isIndividualSectoinManagementPermissions = generateIsTypeItemFunction(IndividualSectionManagementPermissionsJoiType);
var UserPermissionJoiType = Joi.object({
    canCreateAPP: SettingBooleanJoiType,
    isAdmin: SettingBooleanJoiType,
    isSuperAdmin: SettingBooleanJoiType,
    individualManagementSegments: IndividualSectionManagementPermissionsJoiType
});
var parseUserPermission = generateParseFunction(UserPermissionJoiType);
var isUserPermission = generateIsTypeItemFunction(UserPermissionJoiType);
export { IndividualSectionManagementPermissionsJoiType, parseIndividualSectionManagementPermissions, isIndividualSectoinManagementPermissions, UserPermissionJoiType, parseUserPermission, isUserPermission };
//# sourceMappingURL=UserPermission.js.map