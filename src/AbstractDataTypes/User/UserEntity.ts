import * as Joi from "joi";
import parsePhoneNumber,  { CountryCode, PhoneNumber} from "libphonenumber-js";
import { UserPermission, UserPermissionJoiType } from "./UserPermission";
import { UserSetting, UserSettingJoiType } from "./UserSetting";
import { generateIsTypeItemFunction, generateParseFunction } from "../../Utilities/JoiCheckFunctions";
import { UserGroupGroupID, UserGroupGroupIDJoiType } from "../UserGroup/UserGroup";
import {UserEntityFormatSetting} from "./UserEntityFormatSetting";
import { getJoiTypeFromMinMaxRegex } from "../../Utilities/JoiTypeUtil";
import {countries} from 'i18n-codes-js';

export {PhoneNumber, parsePhoneNumber};

type UserEntityUID = number | string;
const UserEntityUIDJoiType = Joi.alternatives([
    Joi.number(),
    Joi.string()
]);



export {UserEntityUIDJoiType};
export type {UserEntityUID};

interface UserEntityCommon{
    uid: UserEntityUID,
    username : string,
    nickname? : string,
    signature? : string,
    passwordHash? : string,
    email?: string,
    emailVerified: boolean,
    phoneNumVerified: boolean,
    accountCreateTimeGMT: number,
    accountCreateIP?: string,
    accountCreateArea?: countries.CountryCode,
    accountFrozen: boolean,
    faceRecognitionData?: any,
    fingerprintData?: any,
    permissions: UserPermission,
    settings: UserSetting,
    groupId: UserGroupGroupID,
    avatarSalt?: string,
    lastLoginTimeGMT: number,
    lastActiveTimeGMT: number
}

interface UserEntity extends UserEntityCommon{
    phoneNumber?: PhoneNumber
}

export type {UserEntity};

interface UserEntityOutput extends UserEntityCommon{
    phoneNumber?: string
}

export type {UserEntityOutput};

function getUserEntityCommonJoiSchema(formatSetting? : UserEntityFormatSetting) : Joi.SchemaMap{
    return {
        uid: UserEntityUIDJoiType.required(),
        username : getJoiTypeFromMinMaxRegex(formatSetting?.usernameMinLen,formatSetting?.usernameMaxLen,formatSetting?.usernameRegex).required(),
        nickname : getJoiTypeFromMinMaxRegex(formatSetting?.nicknameMinLen,formatSetting?.nicknameMaxLen,formatSetting?.nicknameRegex).optional(),
        signature : getJoiTypeFromMinMaxRegex(formatSetting?.signatureMinLen,formatSetting?.signatureMaxLen,formatSetting?.signatureRegex).optional(),
        passwordHash : Joi.string().optional(),
        email: getJoiTypeFromMinMaxRegex(formatSetting?.emailMinLen,formatSetting?.emailMaxLen,formatSetting?.emailRegex).optional(),
        emailVerified: Joi.boolean().required(),
        phoneNumVerified: Joi.boolean().required(),
        accountCreateTimeGMT: Joi.number().min(0).required(),
        accountCreateIP: Joi.string().max(45).optional(), // = 45, IPV4 = 15
        accountCreateArea: Joi.valid(...countries.allCountryCode).optional(),
        accountFrozen: Joi.boolean().required(),
        faceRecognitionData: Joi.any().optional(),
        fingerprintData: Joi.any().optional(),
        permissions: UserPermissionJoiType.required(),
        settings: UserSettingJoiType.required(),
        groupId: UserGroupGroupIDJoiType.required(),
        avatarSalt: Joi.string().optional(),
        lastLoginTimeGMT: Joi.number().required(),
        lastActiveTimeGMT: Joi.number().required()
    };
}

function getUserEntityJoiType(formatSetting? : UserEntityFormatSetting) : Joi.Schema{
    return Joi.object(
        Object.assign({
            phoneNumber: Joi.object().instance(PhoneNumber).optional() //E164 max len = 15
        },getUserEntityCommonJoiSchema(formatSetting))
    );
}


function parseUserEntity(formatSetting? : UserEntityFormatSetting) : (item:any) => UserEntity | undefined{
    return generateParseFunction<UserEntity>(getUserEntityJoiType(formatSetting));
}
function isUserEntity(formatSetting? : UserEntityFormatSetting) : (item:any) => boolean{
    return generateIsTypeItemFunction(getUserEntityJoiType(formatSetting));
}

export {getUserEntityJoiType, parseUserEntity, isUserEntity};

function getUserEntityOutputJoiType(formatSetting? : UserEntityFormatSetting) : Joi.Schema{
    return Joi.object(
        Object.assign({
            phoneNumber: Joi.string().max(16).optional() //E164 max len = 15
        },getUserEntityCommonJoiSchema(formatSetting))
    );
}

function parseUserEntityOutput(formatSetting? : UserEntityFormatSetting) : (item:any) => UserEntityOutput | undefined{
    return generateParseFunction<UserEntityOutput>(getUserEntityOutputJoiType(formatSetting));
}
function isUserEntityOutput(formatSetting? : UserEntityFormatSetting) : (item : any) => boolean{
    return generateIsTypeItemFunction(getUserEntityOutputJoiType(formatSetting));
}

export {getUserEntityOutputJoiType, parseUserEntityOutput, isUserEntityOutput}


function outputUserEntityAsOutputObject(userEntity : UserEntity){
    let returnData : any = {};
    for(let key in userEntity){
        if(!(key in getUserEntityOutputJoiType(undefined))){
            continue;
        }
        if(key !== 'phoneNumber' && userEntity[key as keyof UserEntity] !== undefined){
            returnData[key] = userEntity[key as keyof UserEntity];
        }else if(key === 'phoneNumber' && userEntity.phoneNumber!==undefined){
            returnData[key] = userEntity.phoneNumber.format('E.164');
        }
    }
}

function parseUserEntityFromOutputObject(userEntityOutput : UserEntityOutput, defaultCountry? : countries.CountryCode & CountryCode) : UserEntity{
    let returnData : any = Object.assign({},userEntityOutput);
    if(userEntityOutput.phoneNumber !== undefined){
        returnData.phoneNumber = parsePhoneNumber(userEntityOutput.phoneNumber,defaultCountry);
    }
    return (returnData as UserEntity);
}

export {outputUserEntityAsOutputObject, parseUserEntityFromOutputObject};