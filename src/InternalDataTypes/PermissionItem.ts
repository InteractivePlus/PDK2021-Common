import * as Joi from "joi";
import { generateIsTypeItemFunction, generateParseFunction } from "../Utilities/JoiCheckFunctions";
import SettingBoolean from "./SettingBoolean";

interface PermissionItem<type>{
    read: type,
    write: type,
    delete: type,
    invoke: type
}

const PermissionItemJoiType = Joi.object({
    read: Joi.any().required(),
    write: Joi.any().required(),
    delete: Joi.any().required(),
    invoke: Joi.any().required()
});

let parsePermissionItem = generateParseFunction(PermissionItemJoiType);
let isPermissionItem = generateIsTypeItemFunction(PermissionItemJoiType);

export default PermissionItem;
export { PermissionItemJoiType, parsePermissionItem, isPermissionItem };