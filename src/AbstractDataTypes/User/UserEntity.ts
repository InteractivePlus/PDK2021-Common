import * as Joi from "joi";
import parsePhoneNumber, {CountryCode, getCountries, PhoneNumber} from "libphonenumber-js";
import UserPermission, { UserPermissionJoiType } from "./UserPermission";
import UserSetting, { UserSettingJoiType } from "./UserSetting";
import { generateIsTypeItemFunction, generateParseFunction } from "../../Utilities/JoiCheckFunctions";

interface UserEntityCommon{
    uid?: number | string,
    username : string,
    nickname? : string,
    signature? : string,
    passwordHash? : string,
    email?: string,
    emailVerified: boolean,
    phoneNumVerified: boolean,
    accountCreateTimeGMT: number,
    accountCreateIP?: string,
    accountCreateArea?: string,
    accountFrozen: boolean,
    faceRecognitionData?: any,
    fingerprintData?: any,
    permissions: UserPermission,
    settings: UserSetting
}

interface UserEntity extends UserEntityCommon{
    phoneNumber?: PhoneNumber
}

interface UserEntityOutput extends UserEntityCommon{
    phoneNumber?: string
}

const UserEntityCommonJoiSchema : Joi.SchemaMap = {
    uid: [
        Joi.number().optional(),
        Joi.string().optional()
    ],
    username : Joi.string().required(),
    nickname : Joi.string().optional(),
    signature : Joi.string().optional(),
    passwordHash : Joi.string().optional(),
    email: Joi.string().optional(),
    emailVerified: Joi.boolean().required(),
    phoneNumVerified: Joi.boolean().required(),
    accountCreateTimeGMT: Joi.number().min(0).required(),
    accountCreateIP: Joi.string().max(45).optional(), //IPV6 = 45, IPV4 = 15
    accountCreateArea: Joi.allow(getCountries()).optional(),
    accountFrozen: Joi.boolean().required(),
    faceRecognitionData: Joi.any().optional(),
    fingerprintData: Joi.any().optional(),
    permissions: UserPermissionJoiType,
    settings: UserSettingJoiType
}

const UserEntityJoiType = Joi.object(
    Object.assign({
        phoneNumber: Joi.object().instance(PhoneNumber).optional() //E164 max len = 15
    },UserEntityCommonJoiSchema)
);

let parseUserEntity = generateParseFunction<UserEntity>(UserEntityJoiType);
let isUserEntity = generateIsTypeItemFunction(UserEntityJoiType);

const UserEntityOutputJoiType = Joi.object(
    Object.assign({
        phoneNumber: Joi.string().max(16).optional() //E164 max len = 15
    },UserEntityCommonJoiSchema)
);

let parseUserEntityOutput = generateParseFunction<UserEntityOutput>(UserEntityOutputJoiType);
let isUserEntityOutput = generateIsTypeItemFunction(UserEntityOutputJoiType);



function outputUserEntityAsOutputObject(userEntity : UserEntity){
    let returnData : any = {};
    for(let key in userEntity){
        if(!(key in UserEntityOutputJoiType)){
            continue;
        }
        if(key !== 'phoneNumber' && userEntity[key as keyof UserEntity] !== undefined){
            returnData[key] = userEntity[key as keyof UserEntity];
        }else if(key === 'phoneNumber' && userEntity.phoneNumber!==undefined){
            returnData[key] = userEntity.phoneNumber.format('E.164');
        }
    }
}

function parseUserEntityFromOutputObject(userEntityOutput : UserEntityOutput, defaultCountry? : CountryCode) : UserEntity{
    let returnData : any = Object.assign({},userEntityOutput);
    if(userEntityOutput.phoneNumber !== undefined){
        returnData.phoneNumber = parsePhoneNumber(userEntityOutput.phoneNumber,defaultCountry);
    }
    return (returnData as UserEntity);
}

export default UserEntity;
export {UserEntityOutput, UserEntityOutputJoiType, parseUserEntityOutput, isUserEntityOutput};
export {UserEntityJoiType, parseUserEntity, isUserEntity};
export {outputUserEntityAsOutputObject, parseUserEntityFromOutputObject};