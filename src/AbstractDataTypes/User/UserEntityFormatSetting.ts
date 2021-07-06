interface UserEntityFormatSetting{
    usernameMinLen?: number,
    usernameMaxLen?: number,
    usernameRegex?: string,
    nicknameMinLen?: number,
    nicknameMaxLen?: number,
    nicknameRegex?: string,
    signatureMinLen?: number,
    signatureMaxLen?: number,
    signatureRegex?: string,
    passwordMinLen?: number,
    passwordMaxLen?: number,
    passwordRegex?: string,
    emailMinLen?: number,
    emailMaxLen?: number,
    emailRegex?: string
}

export type { UserEntityFormatSetting };