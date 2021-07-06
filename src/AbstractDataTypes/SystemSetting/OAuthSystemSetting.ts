import {AuthorizationCodeEntityFormatSetting} from "../OAuth/AuthCode/AuthorizationCodeEntityFormatSetting";
import {OAuthTokenFormatSetting} from "../OAuth/Token/OAuthTokenFormatSetting";

interface OAuthSystemSetting{
    authCodeEntityFormat: AuthorizationCodeEntityFormatSetting,
    oAuthTokenFormat: OAuthTokenFormatSetting,
    oAuthTokenAvailableDuration: {
        accessToken: number,
        refreshToken: number
    }
}

export type {OAuthSystemSetting};