import * as Joi from "joi";

type APPGroupID = string | number;
const APPGroupIDJoiType = Joi.alternatives([
    Joi.string(),
    Joi.number()
]);

export {APPGroupID, APPGroupIDJoiType};

interface APPGroupEntity{
    
}