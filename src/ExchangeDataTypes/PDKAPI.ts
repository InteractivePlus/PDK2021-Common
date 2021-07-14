import Joi from "joi";
import { PDKExceptionCode } from "../AbstractDataTypes/Error/PDKException";
import { PDKPossibleServerReturnErrTypes } from "./PDKServerReturn";

interface HTTPMethodInfo{
    methodName: string,
    successfulHTTPCode: number | number[],
    paramInRequestURL: boolean,
    hasRequestBody: boolean,
    hasReturnBody: boolean
}

const PDKAPIHTTPMethods : {[httpName: string]: HTTPMethodInfo} = {
    GET: {
        methodName: 'GET',
        successfulHTTPCode: 200,
        paramInRequestURL: true,
        hasRequestBody: false,
        hasReturnBody: true
    },
    POST: {
        methodName: 'POST',
        successfulHTTPCode: 201,
        paramInRequestURL: false,
        hasRequestBody: true,
        hasReturnBody: true
    },
    PUT: {
        methodName: 'PUT',
        successfulHTTPCode: [200, 201],
        paramInRequestURL: false,
        hasRequestBody: true,
        hasReturnBody: true
    },
    DELETE: {
        methodName: 'DELETE',
        successfulHTTPCode: 200, //If code is 204, returnBody is omitted
        paramInRequestURL: false,
        hasRequestBody: true,
        hasReturnBody: true
    },
    PATCH: {
        methodName: 'PATCH',
        successfulHTTPCode: 200,
        paramInRequestURL: false,
        hasRequestBody: true,
        hasReturnBody: true
    }
}

export {PDKAPIHTTPMethods};

interface PDKAPI<ParamType extends {}, ReturnDataType extends {}, PossibleErrorTypes extends PDKPossibleServerReturnErrTypes>{
    relativePath: string,
    interactMethod: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    successfulHTTPCode?: number,
    paramJoiType: Joi.Schema,
    returnDataJoiType: Joi.Schema
}

export type {PDKAPI};

const PDKExceptionCodeToHTTPCodeTable : {
    [key in PDKExceptionCode]: number
} = {
    0: 200,
    1: 500,
    2: 500,
    3: 500,
    4: 500,
    10: 404,
    11: 409,
    12: 404,
    13: 403,
    14: 401,
    20: 400
}

export {PDKExceptionCodeToHTTPCodeTable};