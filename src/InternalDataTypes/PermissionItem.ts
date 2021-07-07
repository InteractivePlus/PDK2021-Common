import * as Joi from "joi";
import { generateIsTypeItemFunction, generateParseFunction } from "../Utilities/JoiCheckFunctions";

interface PermissionItem<type>{
    read: type,
    write: type,
    delete: type,
    invoke: type
}

export type {PermissionItem};

function getPermissionItemJoiType(innerJoiType : Joi.Schema = Joi.any()){
    return Joi.object({
        read: innerJoiType.required(),
        write: innerJoiType.required(),
        delete: innerJoiType.required(),
        invoke: innerJoiType.required()
    });
}

function parsePermissionItem<innerType = any>(innerJoiType : Joi.Schema = Joi.any()) : (item:any) => PermissionItem<innerType> | undefined{
    return generateParseFunction<PermissionItem<innerType>>(getPermissionItemJoiType(innerJoiType));
}
function isPermissionItem(innerJoiType : Joi.Schema = Joi.any()) : (item:any) => boolean{
    return generateIsTypeItemFunction(getPermissionItemJoiType(innerJoiType))
}
export { getPermissionItemJoiType, parsePermissionItem, isPermissionItem };