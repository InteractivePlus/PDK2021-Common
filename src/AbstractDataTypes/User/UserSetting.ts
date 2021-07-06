import * as Joi from "joi";
import { SettingBoolean, SettingBooleanJoiType, SettingObject } from "../../InternalDataTypes/SettingValue";
import { generateIsTypeItemFunction, generateParseFunction } from "../../Utilities/JoiCheckFunctions";

interface ContactMethodPreference extends SettingObject{
    notification: SettingBoolean,
    sales: SettingBoolean
}

const ContactMethodPreferenceJoiType = Joi.object({
    notification: SettingBooleanJoiType.required(),
    sales: SettingBooleanJoiType.required()
});

let parseContactMethodPreference = generateParseFunction<ContactMethodPreference>(ContactMethodPreferenceJoiType);
let isContactMethodPreference = generateIsTypeItemFunction(ContactMethodPreferenceJoiType);

interface UserSetting extends SettingObject{
    contact: {
        email: ContactMethodPreference,
        sms: ContactMethodPreference,
        phone_call: ContactMethodPreference,
        official_apps: ContactMethodPreference,
        third_party_apps: ContactMethodPreference,
        wechat_subscription_account: ContactMethodPreference
    }
}

const UserSettingJoiType = Joi.object({
    contact: {
        email: ContactMethodPreferenceJoiType.required(),
        sms: ContactMethodPreferenceJoiType.required(),
        phone_call: ContactMethodPreferenceJoiType.required(),
        official_apps: ContactMethodPreferenceJoiType.required(),
        third_party_apps: ContactMethodPreferenceJoiType.required(),
        wechat_subscription_account: ContactMethodPreferenceJoiType.required(),
    }
});

let parseUserSetting = generateParseFunction<UserSetting>(UserSettingJoiType);
let isUserSetting = generateIsTypeItemFunction(UserSettingJoiType);

export type {UserSetting};
export type {ContactMethodPreference};
export {ContactMethodPreferenceJoiType, parseContactMethodPreference, isContactMethodPreference, UserSettingJoiType, parseUserSetting, isUserSetting};
