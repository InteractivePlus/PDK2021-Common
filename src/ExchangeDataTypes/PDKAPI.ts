import Joi from "joi";
import { PDKExceptionCode } from "../AbstractDataTypes/Error/PDKException";
import { OAuthScope } from "../AbstractDataTypes/OAuth/OAuthScope";
import { OAuthAccessToken } from "../AbstractDataTypes/OAuth/Token/OAuthToken";
import { APPClientID, APPClientSecret } from "../AbstractDataTypes/RegisteredAPP/APPEntityFormat";
import { APPPermission } from "../AbstractDataTypes/RegisteredAPP/APPPermission";
import { UserEntityUID } from "../AbstractDataTypes/User/UserEntity";
import { UserPermission } from "../AbstractDataTypes/User/UserPermission";
import { UserAccessToken } from "../AbstractDataTypes/User/UserToken";
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

interface PDKAPI<
    ParamType extends
        {}
        | {user_access_token: UserAccessToken, uid: UserEntityUID}
        | {oauth_access_token: OAuthAccessToken, client_id: APPClientID, client_secret?: APPClientSecret} 
    ,
    ReturnDataType extends {},
    PossibleErrorTypes extends PDKPossibleServerReturnErrTypes
>{
    relativePath: string,
    interactMethod: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    successfulHTTPCode?: number,
    paramJoiType: Joi.Schema,
    returnDataJoiType: Joi.Schema,
    captchaInfo:{
        requiresCaptcha: boolean,
        requiresCaptchaToMatchUID: boolean,
        requiresCaptchaToMatchMaskID: boolean,
        requiresCaptchaToMatchPDK: boolean,
        requiresCaptchaToMatchClientID: boolean
    },
    userPermissionInfo: {
        checkPermissionFunc?: (userCombinedPermission : UserPermission) => boolean;
    }
    appPermissionInfo: {
        checkPermissionFunc?: (appCombinedPermission: APPPermission) => boolean;
    }
    oAuthPermissionInfo: {
        requiredScopes?: OAuthScope[]
    }
    authenticationInfo: {
        requireUserToken: boolean,
        requireOAuthToken: boolean,
        verifiesClientSecretIfAuthedByBackend: boolean
    }
}

export type {PDKAPI};

interface PDKUserTokenRequiredAPI<ParamType extends {user_access_token: UserAccessToken, uid: UserEntityUID}, ReturnDataType extends {}, PossibleErrorTypes extends PDKPossibleServerReturnErrTypes> extends PDKAPI<ParamType,ReturnDataType,PossibleErrorTypes>{
    authenticationInfo: {
        requireUserToken: true,
        requireOAuthToken: boolean,
        verifiesClientSecretIfAuthedByBackend: boolean
    }
}

export type {PDKUserTokenRequiredAPI};

interface PDKOAuthTokenRequiredAPI<ParamType extends {oauth_access_token: OAuthAccessToken, client_id: APPClientID, client_secret?: APPClientSecret}, ReturnDataType extends {}, PossibleErrorTypes extends PDKPossibleServerReturnErrTypes> extends PDKAPI<ParamType,ReturnDataType,PossibleErrorTypes>{
    authenticationInfo: {
        requireUserToken: boolean,
        requireOAuthToken: true,
        verifiesClientSecretIfAuthedByBackend: boolean
    }
}

export type {PDKOAuthTokenRequiredAPI};

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