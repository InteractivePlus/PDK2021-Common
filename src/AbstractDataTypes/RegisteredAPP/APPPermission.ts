import * as Joi from "joi";
import SettingValue, { getSettingValueJoiType, SettingBoolean, SettingBooleanJoiType, SettingNumber, SettingNumberJoiType, SettingObject } from "../../InternalDataTypes/SettingValue";
import { generateIsTypeItemFunction, generateParseFunction } from "../../Utilities/JoiCheckFunctions";
import OAuthAuthorizationMethod from "../OAuth/OAuthAuthorizationMethod";
import OAuthScope from "../OAuth/OAuthScope";

interface APPStorageScopePermission extends SettingObject{
    canStoreData: SettingBoolean,
    userNumberLimit: SettingNumber,
    perUserLimits : {
        maxDataSizeInBytes: SettingNumber,
        maxJSONLevel: SettingNumber
    }
}

const APPStorageScopePermissionJoiType = Joi.object({
    canStoreData: SettingBooleanJoiType.required(),
    userNumberLimit: SettingNumberJoiType.required(),
    perUserLimits: {
        maxDataSizeInBytes: SettingNumberJoiType.required(),
        maxJSONLevel: SettingNumberJoiType.required()
    }
});

export {APPStorageScopePermission, APPStorageScopePermissionJoiType};

interface APPTicketSystemPermission extends SettingObject{
    canOpenTicket: SettingBoolean,
    canAcceptNoOAuthTokenTicket: SettingBoolean,
    ticketLimit: SettingNumber,
    userNumberLimit: SettingNumber,
    perUserNumberLimit: SettingNumber
}

const APPTicketSystemPermissionJoiType = Joi.object({
    canOpenTicket: SettingBooleanJoiType.required(),
    canAcceptNoOAuthTokenTicket: SettingBooleanJoiType.required(), //If this is set to TRUE, no authorization is required before submitting a ticket
    ticketLimit: SettingNumberJoiType.required(),
    userNumberLimit: SettingNumberJoiType.required(),
    perUserNumberLimit: SettingNumberJoiType.required()
});

export {APPTicketSystemPermission, APPTicketSystemPermissionJoiType};

interface APPOAuthSystemPermission extends SettingObject{
    canOAuth: SettingBoolean,
    oAuthScopes: SettingValue<Array<OAuthScope>>,
    oAuthAllowedMethods: SettingValue<Array<OAuthAuthorizationMethod>>,
    oAuthTokenLimit: SettingNumber,
    storagePermission: APPStorageScopePermission,
    ticketPermission: APPTicketSystemPermission
}


const APPOAuthSystemPermissionJoiType = Joi.object({
    canOAuth: SettingBooleanJoiType.required(),
    oAuthScopes: getSettingValueJoiType(Joi.array()).required(),
    oAuthAllowedMethods: getSettingValueJoiType(Joi.array()).required(),
    oAuthTokenLimit: SettingNumberJoiType.required(),
    storagePermission: APPStorageScopePermissionJoiType.required(),
    ticketPermission: APPTicketSystemPermissionJoiType.required()
})

export {APPOAuthSystemPermission, APPOAuthSystemPermissionJoiType};


interface APPPermission extends SettingObject{
    oAuthPermission: APPOAuthSystemPermission,
    isProtectedAPP: SettingBoolean,
    isTrustedAPP: SettingBoolean,
    isOfficialAPP: SettingBoolean
}

const APPPermissionJoiType = Joi.object({
    oAuthPermission: APPOAuthSystemPermissionJoiType.required(),
    isProtectedAPP: SettingBooleanJoiType.required(),
    isTrustedAPP: SettingBooleanJoiType.required(),
    isOfficialAPP: SettingBooleanJoiType.required()
});

let parseAPPPermission = generateParseFunction<APPPermission>(APPPermissionJoiType);
let isAPPPermission = generateIsTypeItemFunction(APPPermissionJoiType);
export default APPPermission;
export {APPPermissionJoiType, parseAPPPermission, isAPPPermission};
