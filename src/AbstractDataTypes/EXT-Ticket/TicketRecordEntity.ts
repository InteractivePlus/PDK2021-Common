import Joi from "joi";
import { generateIsTypeItemFunction, generateParseFunction } from "../../Utilities/JoiCheckFunctions";
import { getJoiTypeFromMinMaxRegex } from "../../Utilities/JoiTypeUtil";
import { MaskUID, MaskUIDJoiType } from "../MaskID/MaskIDEntity";
import { getOAuthAccessTokenJoiType, OAuthAccessToken } from "../OAuth/Token/OAuthToken";
import { APPClientID, APPUID, APPUIDJoiType, getAPPClientIDJoiType } from "../RegisteredAPP/APPEntityFormat";
import { UserEntityUID, UserEntityUIDJoiType } from "../User/UserEntity";
import { getUserAccessTokenJoiType, UserAccessToken } from "../User/UserToken";
import { TicketRecordEntityFormatSetting } from "./TicketRecordEntityFormatSetting";

interface TicketRecordSingleResponse{
    content: string,
    contentByUser: boolean,
    originatorAltName?: string,
    contentCreateMillisGMT: number,
    contentModifySecGMT: number,
}

function getTicketRecordSingleResponseJoiType(formatSetting?: TicketRecordEntityFormatSetting){
    return Joi.object({
        content: getJoiTypeFromMinMaxRegex(formatSetting?.contentMinLen,formatSetting?.contentMaxLen, formatSetting?.contentRegex).required(),
        contentByUser: Joi.boolean().required(),
        originatorAltName: getJoiTypeFromMinMaxRegex(formatSetting?.contentOriginatorAltNameMinLen, formatSetting?.contentOriginatorAltNameMaxLen, formatSetting?.contentOriginatorAltNameRegex).optional(),
        contentCreateMillisGMT: Joi.number().required(),
        contentModifySecGMT: Joi.number().required()
    });
}

export type {TicketRecordSingleResponse};
export {getTicketRecordSingleResponseJoiType};

type TicketRecordEntityID = string | number;
const TicketRecordEntityIDJoiType = Joi.alternatives(
    Joi.string(),
    Joi.number()
);

export type {TicketRecordEntityID};
export {TicketRecordEntityIDJoiType};

interface TicketRecordEntity{
    ticketId: TicketRecordEntityID,
    title: string,
    contents: TicketRecordSingleResponse[],
    relatedMaskUID: MaskUID | null,
    relatedUID: UserEntityUID,
    relatedClientID: APPClientID | null,
    relatedAPPUID: APPUID | null,
    relatedOAuthToken?: OAuthAccessToken,
    relatedUserToken?: UserAccessToken
}

function getTicketRecordEntityJoiType(formatSetting?: TicketRecordEntityFormatSetting) : Joi.Schema{
    return Joi.object({
        ticketId: TicketRecordEntityIDJoiType.required(),
        title: getJoiTypeFromMinMaxRegex(formatSetting?.titleMinLen,formatSetting?.titleMaxLen,formatSetting?.titleRegex).required(),
        contents: Joi.array().items(getTicketRecordEntityJoiType(formatSetting)).required(),
        relatedMaskUID: MaskUIDJoiType.allow(null).required(),
        relatedUID: UserEntityUIDJoiType.required(),
        relatedClientID: getAPPClientIDJoiType().allow(null).required(),
        relatedAPPUID: APPUIDJoiType.allow(null).required(),
        relatedOAuthToken: getOAuthAccessTokenJoiType().optional(),
        relatedUserToken: getUserAccessTokenJoiType().optional()
    });
}

export type {TicketRecordEntity};
export {getTicketRecordEntityJoiType};

function parseTicketRecordEntity(formatSetting?: TicketRecordEntityFormatSetting){
    return generateParseFunction<TicketRecordEntity>(getTicketRecordEntityJoiType(formatSetting));
}

function isTicketRecordEntity(formatSetting?: TicketRecordEntityFormatSetting){
    return generateIsTypeItemFunction(getTicketRecordEntityJoiType(formatSetting));
}

export {parseTicketRecordEntity, isTicketRecordEntity};