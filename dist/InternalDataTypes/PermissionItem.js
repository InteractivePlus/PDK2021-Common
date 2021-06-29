import * as Joi from "joi";
import { generateIsTypeItemFunction, generateParseFunction } from "../Utilities/JoiCheckFunctions";
var PermissionItemJoiType = Joi.object({
    read: Joi.any().required(),
    write: Joi.any().required(),
    "delete": Joi.any().required(),
    invoke: Joi.any().required()
});
var parsePermissionItem = generateParseFunction(PermissionItemJoiType);
var isPermissionItem = generateIsTypeItemFunction(PermissionItemJoiType);
export { PermissionItemJoiType, parsePermissionItem, isPermissionItem };
//# sourceMappingURL=PermissionItem.js.map