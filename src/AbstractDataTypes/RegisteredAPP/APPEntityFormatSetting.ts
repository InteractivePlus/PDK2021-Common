interface APPEntityFormatSetting{
    clientIDCharNum: number,
    clientSecretCharNum: number,
    displayNameMinLen?: number,
    displayNameMaxLen?: number,
    displayNameRegex?: string,
    descriptionMinLen?: number,
    descriptionMaxLen?: number,
    descriptionRegex?: string
}

export type {APPEntityFormatSetting};