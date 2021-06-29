import * as Joi from "joi";
import { generateIsTypeItemFunction, generateParseFunction } from "../Utilities/JoiCheckFunctions";

enum SettingBoolean{
    "TRUE" = 1,
    "FALSE" = 0,
    "INHERIT" = -1
};

interface SettingObject{
    [key : string]: SettingBoolean
}

function getCombinedSettingObject(...args: SettingObject[]) : SettingObject{
    let constructedSettingObject : SettingObject = {};
    for(let i=0; i<args.length;i++){
        let currentSetting = args[i];
        for(let key in currentSetting){
            if(key in constructedSettingObject){
                continue;
            }

            let currentValue = currentSetting[key];
            for(let j=i+1;j<args.length;j++){
                if(currentValue !== SettingBoolean.INHERIT){
                    break;
                }
                if(key in args[j]){
                    currentValue = args[j][key];
                }
            }
            constructedSettingObject[key] = currentValue;
        }
    }
    return constructedSettingObject;
}

const SettingBooleanJoiType = Joi.number().integer().allow([1,0,-1]);

let parseSettingBoolean = generateParseFunction<SettingBoolean>(SettingBooleanJoiType);
let isSettingBoolean = generateIsTypeItemFunction(SettingBooleanJoiType);


export default SettingBoolean;
export {parseSettingBoolean, isSettingBoolean, SettingBooleanJoiType};
export {SettingObject, getCombinedSettingObject};