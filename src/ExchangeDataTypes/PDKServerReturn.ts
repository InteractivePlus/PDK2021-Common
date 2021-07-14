import Joi from "joi";
import { generatePDKExceptionOutputObj, parsePDKExceptionOutputObj, PDKException, PDKExceptionCode, PDKExceptionCodes, PDKExceptionOutput, PDKExceptionOutputJoiType, PDKRequestParamFormatError, PDKUnknownInnerError } from "../AbstractDataTypes/Error/PDKException";
import { generateParseFunction } from "../Utilities/JoiCheckFunctions";

type PDKPossibleServerReturnErrTypes = PDKException<any>;

export type {PDKPossibleServerReturnErrTypes};

interface PDKServerReturn<ParamType extends {}, DataType extends {}, PossibleErrorTypes extends PDKPossibleServerReturnErrTypes>{
    errorCode: PDKExceptionCode,
    errorOutput?: PossibleErrorTypes | PDKUnknownInnerError | PDKRequestParamFormatError<keyof ParamType>,
    data?: DataType
}

export type {PDKServerReturn};

interface PDKServerReturnExchange<DataType extends {}>{
    errorCode: PDKExceptionCode,
    errorOutput?: PDKExceptionOutput,
    data?: DataType
}

function getPDKServerReturnExchangeJoiType(dataJoiType : Joi.Schema = Joi.any()){
    return Joi.object({
        errorCode: Joi.number().valid(...PDKExceptionCodes).required(),
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

function generatePDKServerReturnExchange<ParamType, DataType, PossibleErrorTypes extends PDKPossibleServerReturnErrTypes>(serverReturn : PDKServerReturn<ParamType, DataType,PossibleErrorTypes>) : PDKServerReturnExchange<DataType>{
    return {
        errorCode: serverReturn.errorCode,
        errorOutput: serverReturn.errorOutput === undefined ? undefined : generatePDKExceptionOutputObj(serverReturn.errorOutput),
        data: serverReturn.data
    };
}

export {generatePDKServerReturnExchange};

function parsePDKServerReturn<ParamType, DataType, PossibleErrorTypes extends PDKPossibleServerReturnErrTypes>(serverReturnExchange : PDKServerReturnExchange<DataType>) : PDKServerReturn<ParamType, DataType,PossibleErrorTypes> | undefined{
    
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

