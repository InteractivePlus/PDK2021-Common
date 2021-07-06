import * as Joi from "joi";
import { SettingBoolean, SettingBooleanJoiType, SettingObject } from "../../InternalDataTypes/SettingValue";
import { generateIsTypeItemFunction, generateParseFunction } from "../../Utilities/JoiCheckFunctions";
import { CommunicationMethod, CommunicationMethods } from "../Communication/CommunicationMethod";

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
        [communication in CommunicationMethod]: ContactMethodPreference
    }
}

let UserSettingContactJoiType : Joi.SchemaMap = {};
for(let i = 0; i< CommunicationMethods.length ;i++){
    let currentCommMethod = CommunicationMethods[i];
    UserSettingContactJoiType[currentCommMethod] = ContactMethodPreferenceJoiType.required();
}

const UserSettingJoiType = Joi.object({
    contact: UserSettingContactJoiType
    /*
    contact: {
        'email': ContactMethodPreferenceJoiType.required(),
        'sms': ContactMethodPreferenceJoiType.required(),
        ...
    }
    */
});

let parseUserSetting = generateParseFunction<UserSetting>(UserSettingJoiType);
let isUserSetting = generateIsTypeItemFunction(UserSettingJoiType);

export type {UserSetting};
export type {ContactMethodPreference};
export {ContactMethodPreferenceJoiType, parseContactMethodPreference, isContactMethodPreference, UserSettingJoiType, parseUserSetting, isUserSetting};
