import * as Joi from "joi";
import SettingBoolean, { SettingBooleanJoiType } from "../../InternalDataTypes/SettingBoolean";
import { generateIsTypeItemFunction, generateParseFunction } from "../../Utilities/JoiCheckFunctions";

interface ContactMethodPreference{
    notification: SettingBoolean,
    sales: SettingBoolean
}

const ContactMethodPreferenceJoiType = Joi.object({
    notification: SettingBooleanJoiType.required(),
    sales: SettingBooleanJoiType.required()
});

let parseContactMethodPreference = generateParseFunction<ContactMethodPreference>(ContactMethodPreferenceJoiType);
let isContactMethodPreference = generateIsTypeItemFunction(ContactMethodPreferenceJoiType);

interface UserSetting{
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

export default UserSetting;
export {ContactMethodPreferenceJoiType, ContactMethodPreference, parseContactMethodPreference, isContactMethodPreference, UserSettingJoiType, parseUserSetting, isUserSetting};
