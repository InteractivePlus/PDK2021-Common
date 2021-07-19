import * as Joi from "joi";
import parsePhoneNumber,  { CountryCode, PhoneNumber} from "libphonenumber-js";
import { UserPermission, UserPermissionJoiType } from "./UserPermission";
import { UserSetting, UserSettingJoiType } from "./UserSetting";
import { generateIsTypeItemFunction, generateParseFunction } from "../../Utilities/JoiCheckFunctions";
import { getUserGroupGroupIDJoiType, UserGroupGroupID } from "../UserGroup/UserGroup";
import {UserEntityFormatSetting} from "./UserEntityFormatSetting";
import { getJoiTypeFromMinMaxRegex } from "../../Utilities/JoiTypeUtil";
import {countries} from 'i18n-codes-js';
import { UserGroupFormatSetting } from "../UserGroup/UserGroupFormatSetting";

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
}

interface UserEntity extends UserEntityCommon{
    phoneNumber?: PhoneNumber
}

export type {UserEntity};

interface UserEntityOutput extends UserEntityCommon{
    phoneNumber?: string
}

export type {UserEntityOutput};

function getUserEntityCommonJoiSchema(formatSetting? : UserEntityFormatSetting, userGroupFormatSetting? : UserGroupFormatSetting) : Joi.SchemaMap{
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
        groupId: getUserGroupGroupIDJoiType(userGroupFormatSetting).required(),
        avatarSalt: Joi.string().optional(),
    };
}

function getUserEntityJoiType(formatSetting? : UserEntityFormatSetting, userGroupFormatSetting? : UserGroupFormatSetting) : Joi.Schema{
    return Joi.object(
        Object.assign({
            phoneNumber: Joi.object().instance(PhoneNumber).optional() //E164 max len = 15
        },getUserEntityCommonJoiSchema(formatSetting,userGroupFormatSetting))
    );
}


function parseUserEntity(formatSetting? : UserEntityFormatSetting, userGroupFormatSetting? : UserGroupFormatSetting) : (item:any) => UserEntity | undefined{
    return generateParseFunction<UserEntity>(getUserEntityJoiType(formatSetting,userGroupFormatSetting));
}
function isUserEntity(formatSetting? : UserEntityFormatSetting, userGroupFormatSetting? : UserGroupFormatSetting) : (item:any) => boolean{
    return generateIsTypeItemFunction(getUserEntityJoiType(formatSetting, userGroupFormatSetting));
}

export {getUserEntityJoiType, parseUserEntity, isUserEntity};

function getUserEntityOutputJoiType(formatSetting? : UserEntityFormatSetting, userGroupFormatSetting? : UserGroupFormatSetting) : Joi.Schema{
    return Joi.object(
        Object.assign({
            phoneNumber: Joi.string().max(16).optional() //E164 max len = 15
        },getUserEntityCommonJoiSchema(formatSetting,userGroupFormatSetting))
    );
}

function parseUserEntityOutput(formatSetting? : UserEntityFormatSetting, userGroupFormatSetting? : UserGroupFormatSetting) : (item:any) => UserEntityOutput | undefined{
    return generateParseFunction<UserEntityOutput>(getUserEntityOutputJoiType(formatSetting,userGroupFormatSetting));
}
function isUserEntityOutput(formatSetting? : UserEntityFormatSetting, userGroupFormatSetting? : UserGroupFormatSetting) : (item : any) => boolean{
    return generateIsTypeItemFunction(getUserEntityOutputJoiType(formatSetting,userGroupFormatSetting));
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