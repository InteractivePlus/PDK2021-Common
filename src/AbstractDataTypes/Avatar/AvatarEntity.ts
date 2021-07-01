import * as Joi from "joi";
import { generateIsTypeItemFunction, generateParseFunction } from "../../Utilities/JoiCheckFunctions";
import { UserEntityUID, UserEntityUIDJoiType } from "../User/UserEntity";

interface AvatarEntity{
    data: string | object,
    salt: string,
    uploadedBy?: UserEntityUID,
    uploadTimeGMTInSec?: number
}

let AvatarEntityJoiType = Joi.object({
    data: [
        Joi.string().required(),
        Joi.object().required
    ],
    salt: Joi.string().required(),
    uploadedBy: UserEntityUIDJoiType.optional(),
    uploadTimeGMTInSec: Joi.number().integer().min(0).optional()
});

let parseAvatar = generateParseFunction<AvatarEntity>(AvatarEntityJoiType);
let isAvatar = generateIsTypeItemFunction(AvatarEntityJoiType);

export default AvatarEntity;
export {AvatarEntityJoiType, parseAvatar, isAvatar};