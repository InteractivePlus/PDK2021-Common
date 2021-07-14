import * as Joi from "joi";
import { generateIsTypeItemFunction, generateParseFunction } from "../../Utilities/JoiCheckFunctions";
import { UserEntityUID, UserEntityUIDJoiType } from "../User/UserEntity";

interface AvatarData{
    type: 'URL' | 'base64' | 'binary',
    contentType?: 'image/jpeg' | 'image/png',
    content: string
}

const AvatarDataJoiType = Joi.object({
    type: Joi.string().valid(['URL','base64','binary']).required(),
    contentType: Joi.string().valid(['image/jpeg','image/png']).optional(),
    content: Joi.string().required()
});

export type {AvatarData};
export {AvatarDataJoiType};

interface AvatarEntity{
    data: AvatarData,
    salt: string,
    uploadedBy?: UserEntityUID,
    uploadTimeGMTInSec?: number
}

let AvatarEntityJoiType = Joi.object({
    data: AvatarDataJoiType.required(),
    salt: Joi.string().required(),
    uploadedBy: UserEntityUIDJoiType.optional(),
    uploadTimeGMTInSec: Joi.number().integer().min(0).optional()
});

let parseAvatar = generateParseFunction<AvatarEntity>(AvatarEntityJoiType);
let isAvatar = generateIsTypeItemFunction(AvatarEntityJoiType);

export type {AvatarEntity};
export {AvatarEntityJoiType, parseAvatar, isAvatar};