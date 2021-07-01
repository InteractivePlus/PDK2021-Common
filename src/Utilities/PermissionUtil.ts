import SettingValue from "../InternalDataTypes/SettingValue";

function getCompareSettingValueFunc(func : (obj1? : any, obj2? : any) => any, modifyObjOnRight : boolean = true){
    return (obj1?: any, obj2?: any) => {
        if(typeof(obj1) === 'object' && typeof(obj2) === 'object' && 'inherit' in obj1 && 'inherit' in obj2){
            let left = obj1 as SettingValue<any>;
            let right = obj2 as SettingValue<any>;
            if(!left.inherit && !right.inherit){
                let returnVal : SettingValue<any> = {
                    inherit:false,
                    overrideValue: func(left.overrideValue, right.overrideValue)
                };
                return returnVal;
            }else{
                return modifyObjOnRight ? right : left;
            }
        }else{
            let returnVal : SettingValue<any> = {
                inherit: false,
                overrideValue: func(obj1,obj2)
            };
            return returnVal;
        }
    }
}

function combineObjectsWithMapping(objectToModify : any, object1 : any, object2 : any, modifyMap : string[], object1Map : string[], object2Map : string[], valueGenerator : (object1Value?: any, object2Value?: any) => any) : void{
        let fetchedObj1Val = object1;
        for(let mapItem in object1Map){
            if(mapItem in fetchedObj1Val){
                fetchedObj1Val = fetchedObj1Val[mapItem];
            }else{
                fetchedObj1Val = undefined;
                break;
            }
        }

        let fetchedObj2Val = object2;
        for(let mapItem in object2Map){
            if(mapItem in fetchedObj2Val){
                fetchedObj2Val = fetchedObj2Val[mapItem];
            }else{
                fetchedObj2Val = undefined;
                break;
            }
        }

        let generatedValue = valueGenerator(fetchedObj1Val,fetchedObj2Val);
        
        let currentMap = objectToModify;
        for(let i=0; i<modifyMap.length - 1;i++){
            let currentKey = modifyMap[i];
            if(!(currentKey in currentMap)){
                currentMap[currentKey] = {};
                currentMap = currentMap[currentKey];
            }
        }
        let lastKey = modifyMap[modifyMap.length - 1];
        currentMap[lastKey] = generatedValue;
}

export {combineObjectsWithMapping, getCompareSettingValueFunc};