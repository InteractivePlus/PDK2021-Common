interface TicketRecordEntityFormatSetting{
    titleMinLen?: number,
    titleMaxLen?: number,
    titleRegex?: string,
    contentMinLen?: number,
    contentMaxLen?: number,
    contentRegex?: string,
    contentOriginatorAltNameMinLen?: number,
    contentOriginatorAltNameMaxLen?: number,
    contentOriginatorAltNameRegex?: string
}

export type {TicketRecordEntityFormatSetting};