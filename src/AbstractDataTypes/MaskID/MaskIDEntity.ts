import * as Joi from "joi";
import { generateIsTypeItemFunction, generateParseFunction } from "../../Utilities/JoiCheckFunctions";
import { UserEntityUID, UserEntityUIDJoiType } from "../User/UserEntity";
import UserSetting, { UserSettingJoiType } from "../User/UserSetting";

type MaskUID = number | string;
const MaskUIDJoiType = Joi.alternatives([
    Joi.number(),
    Joi.string()
]);

interface MaskIDEntity{
    relatedUID: UserEntityUID,
    maskUID: MaskUID,
    displayName?: string,
    currentAuthorizedAPPUIDs?: (string | number)[],
    pastAuthorizedAPPUIDs?: (string | number)[],
    settings: UserSetting
}

let MaskIDEntityJoiType = Joi.object({
    relatedUID: UserEntityUIDJoiType.required(),
    maskUID: MaskUIDJoiType.required(),
    displayName: Joi.string().optional(),
    currentAuthorizedAPPUIDs: Joi.any().optional(),
    pastAuthorizedAPPUIDs: Joi.any().optional(),
    settings: UserSettingJoiType.required()
});

let parseMaskIDEntity = generateParseFunction<MaskIDEntity>(MaskIDEntityJoiType);
let isMaskIDEntity = generateIsTypeItemFunction(MaskIDEntityJoiType);

export default MaskIDEntity;
export {MaskIDEntityJoiType, parseMaskIDEntity, isMaskIDEntity};
export { MaskUIDJoiType};
export type {MaskUID};