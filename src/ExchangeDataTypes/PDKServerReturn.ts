import Joi from "joi";
import { generatePDKExceptionOutputObj, parsePDKExceptionOutputObj, PDKException, PDKExceptionCode, PDKExceptionCodes, PDKExceptionOutput, PDKExceptionOutputJoiType } from "../AbstractDataTypes/Error/PDKException";
import { generateParseFunction } from "../Utilities/JoiCheckFunctions";

interface PDKServerReturn<DataType, PossibleErrorTypes extends PDKException<any>>{
    errorCode: PDKExceptionCode,
    errorOutput?: PossibleErrorTypes,
    data?: DataType
}

export type {PDKServerReturn};


interface PDKServerReturnExchange<DataType>{
    errorCode: PDKExceptionCode,
    errorOutput?: PDKExceptionOutput,
    data?: DataType
}

function getPDKServerReturnExchangeJoiType(dataJoiType : Joi.Schema = Joi.any()){
    return Joi.object({
        errorCode: Joi.number().allow(...PDKExceptionCodes).required(),
        errorOutput: PDKExceptionOutputJoiType.optional(),
        data: dataJoiType.optional()
    });
}

export type {PDKServerReturnExchange};
export {getPDKServerReturnExchangeJoiType};

function parsePDKServerReturnExchange<DataType>(dataJoiType : Joi.Schema = Joi.any()){
    return generateParseFunction<DataType>(getPDKServerReturnExchangeJoiType(dataJoiType));
}

export {parsePDKServerReturnExchange};

function generatePDKServerReturnExchange<DataType, PossibleErrorTypes extends PDKException<any>>(serverReturn : PDKServerReturn<DataType,PossibleErrorTypes>) : PDKServerReturnExchange<DataType>{
    return {
        errorCode: serverReturn.errorCode,
        errorOutput: serverReturn.errorOutput === undefined ? undefined : generatePDKExceptionOutputObj(serverReturn.errorOutput),
        data: serverReturn.data
    };
}

export {generatePDKServerReturnExchange};

function parsePDKServerReturn<DataType, PossibleErrorTypes extends PDKException<any>>(serverReturnExchange : PDKServerReturnExchange<DataType>) : PDKServerReturn<DataType,PossibleErrorTypes> | undefined{
    
    let parsedPDKException = undefined;
    if(serverReturnExchange.errorOutput !== undefined){
        parsedPDKException = parsePDKExceptionOutputObj(serverReturnExchange.errorOutput);
        if(parsedPDKException === undefined){
            return undefined;
        }
    }
    
    return {
        errorCode: serverReturnExchange.errorCode,
        errorOutput: parsedPDKException as PossibleErrorTypes,
        data: serverReturnExchange.data
    };
}

export {parsePDKServerReturn};

