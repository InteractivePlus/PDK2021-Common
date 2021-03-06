import * as Joi from "joi";
import { SettingValue, getSettingValueJoiType, SettingBoolean, SettingBooleanJoiType, SettingNumber, SettingNumberJoiType, SettingObject } from "../../InternalDataTypes/SettingValue";
import { generateIsTypeItemFunction, generateParseFunction } from "../../Utilities/JoiCheckFunctions";
import { AuthCodeChallengeType } from "../OAuth/AuthCode/AuthCodeFormat";
import {OAuthAuthorizationMethod} from "../OAuth/OAuthAuthorizationMethod";
import {OAuthScope} from "../OAuth/OAuthScope";

interface APPStorageScopePermission extends SettingObject{
    canStoreData: SettingBoolean,
    recordNumberLimit: SettingNumber,
    perUserLimits : {
        maxDataSizeInBytes: SettingNumber,
        maxJSONLevel: SettingNumber
    },
    noUserLimits: {
        maxDataSizeInBytes: SettingNumber,
        maxJSONLevel: SettingNumber
    }
}

const APPStorageScopePermissionJoiType = Joi.object({
    canStoreData: SettingBooleanJoiType.required(),
    recordNumberLimit: SettingNumberJoiType.required(),
    perUserLimits: {
        maxDataSizeInBytes: SettingNumberJoiType.required(),
        maxJSONLevel: SettingNumberJoiType.required()
    },
    noUserLimits: {
        maxDataSizeInBytes: SettingNumberJoiType.required(),
        maxJSONLevel: SettingNumberJoiType.required()
    }
});

export type {APPStorageScopePermission};
export {APPStorageScopePermissionJoiType};

interface APPTicketSystemPermission extends SettingObject{
    canOpenTicket: SettingBoolean,
    canAcceptNoOAuthTokenTicket: SettingBoolean,
    ticketLimit: SettingNumber,
    recordNumberLimit: SettingNumber,
    perUserNumberLimit: SettingNumber
}

const APPTicketSystemPermissionJoiType = Joi.object({
    canOpenTicket: SettingBooleanJoiType.required(),
    canAcceptNoOAuthTokenTicket: SettingBooleanJoiType.required(), //If this is set to TRUE, no authorization is required before submitting a ticket
    ticketLimit: SettingNumberJoiType.required(),
    recordNumberLimit: SettingNumberJoiType.required(),
    perUserNumberLimit: SettingNumberJoiType.required()
});

export type {APPTicketSystemPermission};
export {APPTicketSystemPermissionJoiType};

interface APPOAuthSystemPermission extends SettingObject{
    canOAuth: SettingBoolean,
    oAuthScopes: SettingValue<Array<OAuthScope>>,
    oAuthAllowedMethods: SettingValue<Array<OAuthAuthorizationMethod>>,
    oAuthAllowedChallengeTypes: SettingValue<Array<AuthCodeChallengeType>>,
    oAuthTokenLimit: SettingNumber,
    storagePermission: APPStorageScopePermission,
    ticketPermission: APPTicketSystemPermission
}


const APPOAuthSystemPermissionJoiType = Joi.object({
    canOAuth: SettingBooleanJoiType.required(),
    oAuthScopes: getSettingValueJoiType(Joi.array()).required(),
    oAuthAllowedMethods: getSettingValueJoiType(Joi.array()).required(),
    oAuthAllowedChallengeTypes: getSettingValueJoiType(Joi.array()).required(),
    oAuthTokenLimit: SettingNumberJoiType.required(),
    storagePermission: APPStorageScopePermissionJoiType.required(),
    ticketPermission: APPTicketSystemPermissionJoiType.required()
})

export type {APPOAuthSystemPermission};
export {APPOAuthSystemPermissionJoiType};


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
export type { APPPermission };
export {APPPermissionJoiType, parseAPPPermission, isAPPPermission};
