interface APPEntityFormatSetting{
    clientIDCharNum?: number,
    clientSecretCharNum?: number,
    displayNameMinLen?: number,
    displayNameMaxLen?: number,
    displayNameRegex?: string,
    descriptionMinLen?: number,
    descriptionMaxLen?: number,
    descriptionRegex?: string,
    callBackURLMaxLen?: number
}

export type {APPEntityFormatSetting};