import parsePhoneNumber, {PhoneNumber} from "libphonenumber-js";

interface UserEntity{
    uid?: number,
    username : string,
    nickname? : string,
    signature? : string,
    passwordHash? : string,
    email?: string,
    phoneNumber?: PhoneNumber,
    emailVerified: boolean,
    phoneNumVerified: boolean,
    accountCreateTimeGMT: number,
    accountCreateIP?: string,
    accountCreateArea?: string,
    accountFrozen: boolean,
    
}

export default UserEntity;