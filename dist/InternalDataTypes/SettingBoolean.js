import * as Joi from "joi";
import { generateIsTypeItemFunction, generateParseFunction } from "../Utilities/JoiCheckFunctions";
var SettingBoolean;
(function (SettingBoolean) {
    SettingBoolean[SettingBoolean["TRUE"] = 1] = "TRUE";
    SettingBoolean[SettingBoolean["FALSE"] = 0] = "FALSE";
    SettingBoolean[SettingBoolean["INHERIT"] = -1] = "INHERIT";
})(SettingBoolean || (SettingBoolean = {}));
;
var SettingBooleanJoiType = Joi.number().integer().allow([1, 0, -1]).required();
var parseSettingBoolean = generateParseFunction(SettingBooleanJoiType);
var isSettingBoolean = generateIsTypeItemFunction(SettingBooleanJoiType);
export default SettingBoolean;
export { parseSettingBoolean, isSettingBoolean, SettingBooleanJoiType };
//# sourceMappingURL=SettingBoolean.js.map