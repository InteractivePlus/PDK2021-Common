import * as Joi from "joi";
import SettingValue, { getSettingValueJoiType, SettingBoolean, SettingBooleanJoiType, SettingObject } from "../../InternalDataTypes/SettingValue";
import { generateIsTypeItemFunction, generateParseFunction } from "../../Utilities/JoiCheckFunctions";
import { combineObjectsWithMapping, getCompareSettingValueFunc } from "../../Utilities/PermissionUtil";
import OAuthAuthorizationMethod from "../OAuth/OAuthAuthorizationMethod";
import OAuthScope from "../OAuth/OAuthScope";
import APPPermission from "./APPPermission";

interface APPStorageScopeSetting extends SettingObject{
    canStoreData: SettingBoolean
}

const APPStorageScopeSettingJoiType = Joi.object({
    canStoreData: SettingBooleanJoiType.required()
});

export type {APPStorageScopeSetting};
export { APPStorageScopeSettingJoiType};

interface APPTicketSystemSetting extends SettingObject{
    canOpenTicket: SettingBoolean,
    canAcceptNoOAuthTokenTicket: SettingBoolean,
}

const APPTicketSystemSettingJoiType = Joi.object({
    canOpenTicket: SettingBooleanJoiType.required(),
    canAcceptNoOAuthTokenTicket: SettingBooleanJoiType.required()
});

export type {APPTicketSystemSetting};
export { APPTicketSystemSettingJoiType};

interface APPOAuthSetting extends SettingObject{
    canOAuth: SettingBoolean,
    oAuthScopes: SettingValue<Array<OAuthScope>>,
    oAuthAllowedMethods: SettingValue<Array<OAuthAuthorizationMethod>>,
    storageSetting: APPStorageScopeSetting,
    ticketSetting: APPTicketSystemSetting
}

const APPOAuthSettingJoiType = Joi.object({
    canOAuth: SettingBooleanJoiType.required(),
    oAuthScopes: getSettingValueJoiType(Joi.array()).required(),
    oAuthAllowedMethods: getSettingValueJoiType(Joi.array()).required(),
    storageSetting: APPStorageScopeSettingJoiType.required(),
    ticketSetting: APPTicketSystemSettingJoiType.required()
});

export type {APPOAuthSetting};
export { APPOAuthSettingJoiType};

interface APPSetting extends SettingObject{
    oAuthSetting: APPOAuthSetting
}

const APPSettingJoiType = Joi.object({
    oAuthSetting: APPOAuthSettingJoiType.required()
});

let parseAPPSetting = generateParseFunction<APPSetting>(APPSettingJoiType);
let isAPPSetting = generateIsTypeItemFunction(APPSettingJoiType);
export default APPSetting;
export {APPSettingJoiType, parseAPPSetting, isAPPSetting};

function combineSettingWithPermission(setting : APPSetting, perm : APPPermission) : APPPermission{
    let outputPerm : APPPermission = Object.assign({},perm);
    let conversionMaps : ({setting:string[], perm: string[], func:(setting : any, perm : any)=>any})[] = [
        {
            setting: ['oAuthSetting','canOAuth'],
            perm: ['oAuthPermission','canOAuth'],
            func: getCompareSettingValueFunc((obj1,obj2)=>{
                return obj1 && obj2;
            })
        },
        {
            setting: ['oAuthSetting','oAuthScopes'],
            perm: ['oAuthPermission','oAuthScopes'],
            func: getCompareSettingValueFunc((obj1,obj2)=>{
                if(obj1 !== undefined && obj2 !== undefined){
                    return (obj1 as Array<string>).filter(function(str){
                        return (obj2 as Array<string>).indexOf(str) !== -1;
                    });
                }else{
                    return [];
                }
            })
        },
        {
            setting: ['oAuthSetting','oAuthAllowedMethods'],
            perm: ['oAuthPermission','oAuthAllowedMethods'],
            func: getCompareSettingValueFunc((obj1,obj2)=>{
                if(obj1 !== undefined && obj2 !== undefined){
                    return (obj1 as Array<string>).filter(function(str){
                        return (obj2 as Array<string>).indexOf(str) !== -1;
                    })
                }else{
                    return [];
                }
            })
        },
        {
            setting: ['oAuthSetting','storageSetting','canStoreData'],
            perm: ['oAuthPermission','storagePermission','canStoreData'],
            func: getCompareSettingValueFunc((obj1,obj2) => {
                return obj1 && obj2;
            })
        },
        {
            setting: ['oAuthSetting','ticketSetting','canOpenTicket'],
            perm: ['oAuthPermission','ticketPermission','canOpenTicket'],
            func: getCompareSettingValueFunc((obj1,obj2) => {
                return obj1 && obj2;
            })
        },
        {
            setting: ['oAuthSetting','ticketSetting','canAcceptNoOAuthTokenTicket'],
            perm: ['oAuthPermission','ticketPermission','canAcceptNoOAuthTokenTicket'],
            func: getCompareSettingValueFunc((obj1,obj2) => {
                return obj1 && obj2;
            })
        }
    ];
    for(let i=0;i<conversionMaps.length;i++){
        let currentConv = conversionMaps[i];
        combineObjectsWithMapping(outputPerm,setting,perm,currentConv.perm,currentConv.setting,currentConv.perm,currentConv.func);
    }
    return outputPerm;
}

export {combineSettingWithPermission};