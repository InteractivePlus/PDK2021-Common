import APPEntityFormatSetting from "../RegisteredAPP/APPEntityFormatSetting";
import APPGroupEntityFormatSetting from "../RegisteredAPPGroup/APPGroupEntityFormatSetting";

interface APPSystemSetting{
    appEntityFormat: APPEntityFormatSetting,
    appGroupEntityFormat: APPGroupEntityFormatSetting,
    defaultNewAPPGroupId: string
}

export default APPSystemSetting;