import { TicketRecordEntityFormatSetting } from "../EXT-Ticket/TicketRecordEntityFormatSetting";
import {APPEntityFormatSetting} from "../RegisteredAPP/APPEntityFormatSetting";
import { APPPermission } from "../RegisteredAPP/APPPermission";
import { APPSetting } from "../RegisteredAPP/APPSetting";
import {APPGroupEntityFormatSetting} from "../RegisteredAPPGroup/APPGroupEntityFormatSetting";

interface APPSystemSetting{
    appEntityFormat: APPEntityFormatSetting,
    appGroupEntityFormat: APPGroupEntityFormatSetting,
    baseAPPPermission: APPPermission,
    baseAPPSetting: APPSetting,
    ticketRecordEntityFormat: TicketRecordEntityFormatSetting
}

export type {APPSystemSetting};