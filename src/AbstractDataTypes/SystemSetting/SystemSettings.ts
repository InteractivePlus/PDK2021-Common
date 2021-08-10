import { APPSystemSetting } from "./APPSystemSetting";
import { AvatarSystemSetting } from "./AvatarSystemSetting";
import { CaptchaSystemSetting } from "./CaptchaSystemSetting";
import { CommunicationSystemSetting } from "./CommunicationSystemSetting";
import { OAuthSystemSetting } from "./OAuthSystemSetting";
import { UserSystemSetting } from "./UserSystemSetting";

interface SystemSettings{
    appSystemSetting: APPSystemSetting,
    avatarSystemSetting: AvatarSystemSetting,
    captchaSystemSetting: CaptchaSystemSetting,
    communicationSystemSetting: CommunicationSystemSetting,
    oAuthSystemSetting: OAuthSystemSetting,
    userSystemSetting: UserSystemSetting
};

export type {SystemSettings};