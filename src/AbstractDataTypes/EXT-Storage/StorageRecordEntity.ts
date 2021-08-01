import Joi from "joi";
import { generateIsTypeItemFunction, generateParseFunction } from "../../Utilities/JoiCheckFunctions";
import { MaskUID, MaskUIDJoiType } from "../MaskID/MaskIDEntity";
import { APPClientID, APPUID, APPUIDJoiType, getAPPClientIDJoiType } from "../RegisteredAPP/APPEntityFormat";
import { APPPermission } from "../RegisteredAPP/APPPermission";
import { UserEntityUID, UserEntityUIDJoiType } from "../User/UserEntity";

function getDataSizeInBytes(data: any) : number{
    return 0;
}

export {getDataSizeInBytes};

function getJSONMaxRecursiveLevel(data : any) : number{
    return 0;
}

export {getJSONMaxRecursiveLevel}

interface StorageRecordEntity<DataType>{
    firstStoredTimeGMT: number,
    lastUpdatedTimeGMT: number,
    storedData: DataType,
    relatedUID: UserEntityUID | null,
    relatedMaskUID?: MaskUID | null,
    relatedClientID: APPClientID | null,
    relatedAPPUID: APPUID | null,
    createIP: string,
    lastUpdatedIP: string
}

export type {StorageRecordEntity};

function getStorageRecordEntityJoiType(dataJoiType : Joi.Schema = Joi.any()) : Joi.Schema{
    return Joi.object({
        firstStoredTimeGMT: Joi.number().required(),
        lastUpdatedTimeGMT: Joi.number().required(),
        storedData: dataJoiType.required(),
        relatedUID: UserEntityUIDJoiType.allow(null).optional(),
        relatedMaskUID: MaskUIDJoiType.allow(null).optional(),
        relatedClientID: getAPPClientIDJoiType().allow(null).optional(),
        relatedAPPUID: APPUIDJoiType.allow(null).optional(),
        createIP: Joi.string().required(),
        lastUpdatedIP: Joi.string().required()
    });
}

export {getStorageRecordEntityJoiType};

function parseStorageRecordEntity<DataType>(dataJoiType : Joi.Schema = Joi.any()){
    return generateParseFunction<StorageRecordEntity<DataType>>(getStorageRecordEntityJoiType(dataJoiType));
}

function isStorageRecordEntity(dataJoiType : Joi.Schema = Joi.any()){
    return generateIsTypeItemFunction(getStorageRecordEntityJoiType(dataJoiType));
}

export {parseStorageRecordEntity, isStorageRecordEntity};

function checkAPPCanStoreData(data : any, isAnyUserRelated : boolean, appCombinedPermission : APPPermission, appStoredRecordNum? : number) : boolean{
    if(!appCombinedPermission.oAuthPermission.storagePermission.canStoreData){
        return false;
    }
    if(appCombinedPermission.oAuthPermission.storagePermission.recordNumberLimit.overrideValue !== undefined && appCombinedPermission.oAuthPermission.storagePermission.recordNumberLimit.overrideValue >= 0 && appStoredRecordNum !== undefined){
        if(appStoredRecordNum >= appCombinedPermission.oAuthPermission.storagePermission.recordNumberLimit.overrideValue){
            return false;
        }
    }
    let dataSpecificPermission = isAnyUserRelated ? appCombinedPermission.oAuthPermission.storagePermission.perUserLimits : appCombinedPermission.oAuthPermission.storagePermission.noUserLimits;
    if(dataSpecificPermission.maxDataSizeInBytes.overrideValue !== undefined && dataSpecificPermission.maxDataSizeInBytes.overrideValue >= 0){
        if(getDataSizeInBytes(data) >= dataSpecificPermission.maxDataSizeInBytes.overrideValue){
            return false;
        }
    }
    if(dataSpecificPermission.maxJSONLevel.overrideValue !== undefined && dataSpecificPermission.maxJSONLevel.overrideValue >= 0){
        if(getJSONMaxRecursiveLevel(data) >= dataSpecificPermission.maxJSONLevel.overrideValue){
            return false;
        }
    }
    return true;
}

export {checkAPPCanStoreData};