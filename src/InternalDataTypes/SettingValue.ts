import * as Joi from "joi";
import { generateIsTypeItemFunction, generateParseFunction } from "../Utilities/JoiCheckFunctions";

interface SettingValue<type>{
    overrideValue?: type,
    inherit: boolean
};

export default SettingValue;

function getSettingValueJoiType(innerJoiType : Joi.Schema = Joi.any()){
    return Joi.object({
        overrideValue: innerJoiType.optional(),
        inherit: Joi.boolean().required()
    });
}

export {getSettingValueJoiType};

function parseSettingValue<type>(innerJoiType : Joi.Schema = Joi.any()){
    return generateParseFunction<SettingValue<type>>(getSettingValueJoiType(innerJoiType));
}
function isSettingValue(innerJoiType : Joi.Schema = Joi.any()){
    return generateIsTypeItemFunction(getSettingValueJoiType(innerJoiType));
}

export {parseSettingValue, isSettingValue}


type SettingBoolean = SettingValue<boolean>;

type SettingNumber = SettingValue<number>;

export type {SettingBoolean, SettingNumber};

const SettingBooleanJoiType = getSettingValueJoiType(Joi.boolean());
const SettingNumberJoiType = getSettingValueJoiType(Joi.number());

export {SettingBooleanJoiType, SettingNumberJoiType};


let parseSettingBoolean = generateParseFunction<SettingBoolean>(SettingBooleanJoiType);
let isSettingBoolean = generateIsTypeItemFunction(SettingBooleanJoiType);

let parseSettingNumber = generateParseFunction<SettingNumber>(SettingNumberJoiType);
let isSettingNumber = generateIsTypeItemFunction(SettingNumberJoiType);

export {parseSettingBoolean, isSettingBoolean};
export {parseSettingNumber, isSettingNumber};


interface SettingObject{
    [key : string]: SettingValue<any> | SettingObject | undefined
}

export type {SettingObject};

function getCombinedSettingObject<Type extends SettingObject>(...args: Type[]) : Type{
    let constructedSettingObject : any = {};
    for(let i=0; i<args.length;i++){
        let currentSetting = args[i];
        for(let key in currentSetting){
            if(key in constructedSettingObject){
                continue;
            }

            
            let currentValue : SettingValue<any> | SettingObject | undefined = currentSetting[key];
            if(currentValue === undefined){
                continue;
            }
            
            if('inherit' in currentValue){
                for(let j=i+1;j<args.length;j++){
                    if(currentValue !== undefined && !currentValue.inherit){
                        break;
                    }
                    if(key in args[j]){
                        currentValue = args[j][key];
                    }
                }
            }else{ //'inherit' not in currentValue
                let allSubObjects : SettingObject[] = [];
                allSubObjects.push(currentValue);
                for(let j=i+1; j<args.length;j++){
                    if(key in args[j] && args[j][key] !== undefined && typeof(args[j][key]) === 'object' && !('inherit' in args[j][key])){
                        allSubObjects.push(args[j][key] as SettingObject);
                    }
                }
                currentValue = getCombinedSettingObject<SettingObject>(...allSubObjects);
            }
            constructedSettingObject[key] = currentValue;
        }
    }
    return constructedSettingObject;
}

export {getCombinedSettingObject};


function parseSettingObject(item: any) : SettingObject | undefined{
    if(typeof(item) !== 'object'){
        return undefined;
    }
    let parsedObj : any = {};
    for(let key in item){
        let currentItem = item[key];
        if(currentItem === undefined){
            continue;
        }
        if(typeof(currentItem) === 'object'){
            if('inherit' in currentItem){
                let currentParsedItem = parseSettingValue(currentItem);
                if(currentParsedItem === undefined){
                    return undefined;
                }
                parsedObj[key] = currentParsedItem;
            }else{
                let currentParsedItem = parseSettingObject(currentItem);
                if(currentParsedItem === undefined){
                    return undefined;
                }
                parsedObj[key] = currentParsedItem;
            }
        }else{
            return undefined;
        }
    }
    return (parsedObj as SettingObject);
}

function isSettingObject(item : any) : boolean{
    if(typeof(item) !== 'object'){
        return false;
    }
    for(let key in item){
        let currentItem = item[key];
        if(currentItem === undefined){
            continue;
        }
        if(typeof(currentItem) === 'object'){
            if('inherit' in currentItem){
                let currentCheckResult = isSettingValue(currentItem);
                if(!currentCheckResult){
                    return false;
                }            
            }else{
                let currentCheckResult = isSettingObject(currentItem);
                if(!currentCheckResult){
                    return false;
                }
            }
        }else{
            return false;
        }
    }
    return true;
}

export {parseSettingObject, isSettingObject};