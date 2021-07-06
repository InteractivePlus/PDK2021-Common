import * as Joi from "joi";
import { generateIsTypeItemFunction, generateParseFunction } from "../../Utilities/JoiCheckFunctions";
import { getJoiTypeFromMinMaxRegex } from "../../Utilities/JoiTypeUtil";
import { APPGroupID, APPGroupIDJoiType } from "../RegisteredAPPGroup/APPGroupEntity";
import { UserEntityUID, UserEntityUIDJoiType } from "../User/UserEntity";
import { APPClientID, APPClientSecret, APPUID, APPUIDJoiType, getAPPClientIDJoiType, getAPPClientSecretJoiType } from "./APPEntityFormat";
import {APPEntityFormatSetting} from "./APPEntityFormatSetting";

interface APPEntity{
    appuid: APPUID,
    clientId: APPClientID,
    clientSecret: APPClientSecret;
    displayName?: string,
    description?: string,
    creatorUserUID?: UserEntityUID,
    createTimeGMT: number,
    lastModifiedTimeGMT: number,
    ownerUserUID?: UserEntityUID,
    managerList?: UserEntityUID[],
    avatarSalt?: string,
    appGroupId: APPGroupID,
}

export type {APPEntity};

function getAPPEntityJoiType(appEntityFormatSetting? : APPEntityFormatSetting){
    return Joi.object({
        appuid: APPUIDJoiType,
        clientId: getAPPClientIDJoiType(appEntityFormatSetting?.clientIDCharNum),
        clientSecret: getAPPClientSecretJoiType(appEntityFormatSetting?.clientSecretCharNum),
        displayName: getJoiTypeFromMinMaxRegex(appEntityFormatSetting?.displayNameMinLen, appEntityFormatSetting?.displayNameMaxLen, appEntityFormatSetting?.displayNameRegex).optional(),
        description: getJoiTypeFromMinMaxRegex(appEntityFormatSetting?.descriptionMinLen,appEntityFormatSetting?.descriptionMaxLen,appEntityFormatSetting?.descriptionRegex).optional(),
        creatorUserUID: UserEntityUIDJoiType.optional(),
        createTimeGMT: Joi.number().required(),
        lastModifiedTimeGMT: Joi.number().required(),
        ownerUserUID: UserEntityUIDJoiType.optional(),
        managerList: Joi.array().optional(),
        avatarSalt: Joi.string().optional(),
        appGroupId: APPGroupIDJoiType.required()
    });
}

function parseAPPEntity(formatSetting?: APPEntityFormatSetting){
    return generateParseFunction(getAPPEntityJoiType(formatSetting));
}

function isAPPEntity(formatSetting?: APPEntityFormatSetting){
    return generateIsTypeItemFunction(getAPPEntityJoiType(formatSetting));
}

export {getAPPEntityJoiType, parseAPPEntity, isAPPEntity};