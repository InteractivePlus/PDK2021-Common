import * as Joi from "joi";
import { generateIsTypeItemFunction, generateParseFunction } from "../../Utilities/JoiCheckFunctions";
import { getJoiTypeFromMinMaxRegex } from "../../Utilities/JoiTypeUtil";
import { APPGroupID, getAPPGroupIDJoiType } from "../RegisteredAPPGroup/APPGroupEntity";
import { APPGroupEntityFormatSetting } from "../RegisteredAPPGroup/APPGroupEntityFormatSetting";
import { UserEntityUID, UserEntityUIDJoiType } from "../User/UserEntity";
import { APPClientID, APPClientSecret, APPUID, APPUIDJoiType, getAPPClientIDJoiType, getAPPClientSecretJoiType } from "./APPEntityFormat";
import {APPEntityFormatSetting} from "./APPEntityFormatSetting";

interface APPEntity{
    appuid: APPUID,
    clientId: APPClientID,
    clientSecret: APPClientSecret;
    displayName?: string,
    description?: string,
    creatorUserUID: UserEntityUID,
    createTimeGMT: number,
    lastModifiedTimeGMT: number,
    ownerUserUID: UserEntityUID,
    managerList: UserEntityUID[],
    avatarSalt?: string,
    appGroupId: APPGroupID,
    callBackInfo: {
        isURLRegex: boolean,
        url?: string
    }
}

export type {APPEntity};

function getAPPEntityJoiType(appEntityFormatSetting? : APPEntityFormatSetting, appGroupEntityFormatSetting?: APPGroupEntityFormatSetting){
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
        appGroupId: getAPPGroupIDJoiType(appGroupEntityFormatSetting).required(),
        callBackInfo: {
            isURLRegex: Joi.boolean().required(),
            url: (appEntityFormatSetting?.callBackURLMaxLen !== undefined ? Joi.string().max(appEntityFormatSetting.callBackURLMaxLen) : Joi.string()).optional()
        }
    });
}

function parseAPPEntity(formatSetting?: APPEntityFormatSetting, appGroupEntityFormatSetting?: APPGroupEntityFormatSetting){
    return generateParseFunction(getAPPEntityJoiType(formatSetting,appGroupEntityFormatSetting));
}

function isAPPEntity(formatSetting?: APPEntityFormatSetting, appGroupEntityFormatSetting?: APPGroupEntityFormatSetting){
    return generateIsTypeItemFunction(getAPPEntityJoiType(formatSetting,appGroupEntityFormatSetting));
}

export {getAPPEntityJoiType, parseAPPEntity, isAPPEntity};