import * as Joi from "joi";
import { generateIsTypeItemFunction, generateParseFunction } from "../../Utilities/JoiCheckFunctions";
import { getJoiTypeFromMinMaxRegex } from "../../Utilities/JoiTypeUtil";
import { UserEntityUID, UserEntityUIDJoiType } from "../User/UserEntity";
import { UserSetting, UserSettingJoiType } from "../User/UserSetting";
import { MaskIDEntityFormatSetting } from "./MaskIDEntityFormatSetting";

type MaskUID = number | string;
const MaskUIDJoiType = Joi.alternatives([
    Joi.number(),
    Joi.string()
]);

interface MaskIDEntity{
    relatedUID: UserEntityUID,
    maskUID: MaskUID,
    displayName?: string,
    createTime: number,
    currentAuthorizedAPPUIDs?: (string | number)[],
    pastAuthorizedAPPUIDs?: (string | number)[],
    settings: UserSetting
}

function getMaskIDEntityJoiType(format?: MaskIDEntityFormatSetting){
    return Joi.object({
        relatedUID: UserEntityUIDJoiType.required(),
        maskUID: MaskUIDJoiType.required(),
        displayName: getJoiTypeFromMinMaxRegex(format?.nicknameMinLen,format?.nicknameMaxLen,format?.nicknameRegex).optional(),
        createTime: Joi.number().required(),
        currentAuthorizedAPPUIDs: Joi.any().optional(),
        pastAuthorizedAPPUIDs: Joi.any().optional(),
        settings: UserSettingJoiType.required()
    });
} 

function parseMaskIDEntity(format?: MaskIDEntityFormatSetting){
    return generateParseFunction<MaskIDEntity>(getMaskIDEntityJoiType(format));
}
function isMaskIDEntity(format?: MaskIDEntityFormatSetting){
    return generateIsTypeItemFunction(getMaskIDEntityJoiType(format));
}

export type {MaskIDEntity};
export {getMaskIDEntityJoiType, parseMaskIDEntity, isMaskIDEntity};
export { MaskUIDJoiType};
export type {MaskUID};