import * as Joi from "joi";
import { generateIsTypeItemFunction, generateParseFunction } from "../../Utilities/JoiCheckFunctions";
import { getJoiTypeFromMinMaxRegex } from "../../Utilities/JoiTypeUtil";
import APPPermission, { APPPermissionJoiType } from "../RegisteredAPP/APPPermission";
import APPSetting, { APPSettingJoiType } from "../RegisteredAPP/APPSetting";

type APPGroupID = string | number;
const APPGroupIDJoiType = Joi.alternatives([
    Joi.string(),
    Joi.number()
]);

export {APPGroupID, APPGroupIDJoiType};

interface APPGroupEntity{
    appGroupId: APPGroupID,
    nickname?: string,
    description?: string,
    permissions: APPPermission,
    settings: APPSetting,
    avatarSalt?: string
}

export default APPGroupEntity;

function getAPPGroupEntityJoiType(formatSetting?: APPGroupEntityFormatSetting) : Joi.Schema{
    return Joi.object({
        appGroupId: APPGroupIDJoiType.required(),
        nickname: getJoiTypeFromMinMaxRegex(formatSetting?.nicknameMinLen,formatSetting?.nicknameMaxLen,formatSetting?.nicknameRegex).optional(),
        description: getJoiTypeFromMinMaxRegex(formatSetting?.descriptionMinLen,formatSetting?.descriptionMaxLen,formatSetting?.descriptionRegex).optional(),
        permissions: APPPermissionJoiType.required(),
        settings: APPSettingJoiType.required(),
        avatarSalt: Joi.string().optional()
    });
}

export {getAPPGroupEntityJoiType};

function parseAPPGroupEntity(formatSetting?: APPGroupEntityFormatSetting){
    return generateParseFunction<APPGroupEntity>(getAPPGroupEntityJoiType(formatSetting));
}

function isAPPGroupEntity(formatSetting?: APPGroupEntityFormatSetting){
    return generateIsTypeItemFunction(getAPPGroupEntityJoiType(formatSetting));
}

export {parseAPPGroupEntity, isAPPGroupEntity};