import * as Joi from "joi";
import { generateIsTypeItemFunction, generateParseFunction } from "../Utilities/JoiCheckFunctions";

enum SettingBoolean{
    "TRUE" = 1,
    "FALSE" = 0,
    "INHERIT" = -1
};

const SettingBooleanJoiType = Joi.number().integer().allow([1,0,-1]).required();

let parseSettingBoolean = generateParseFunction(SettingBooleanJoiType);
let isSettingBoolean = generateIsTypeItemFunction(SettingBooleanJoiType);


export default SettingBoolean;
export {parseSettingBoolean, isSettingBoolean, SettingBooleanJoiType};