import UserSystemSetting from '../AbstractDataTypes/SystemSetting/UserSystemSetting';
import UserEntity, { UserEntityUID } from '../AbstractDataTypes/User/UserEntity';

type CreateUserInfo = {
    [Property in keyof UserEntity as Exclude<Property,'uid'>]: UserEntity[Property] 
}

export type {CreateUserInfo};

interface UserEntityFactory{
    createUser(userInfo : CreateUserInfo) : UserEntity,

    //getUser method to be implemented on different sides of implementions.
    modifyUsername(uid : UserEntityUID, username : string) : void;
    modifyNickname(uid : UserEntityUID, nickname?: string) : void;
    modifySignature(uid : UserEntityUID, signature?: string) : void;
    modifyPassword(uid : UserEntityUID, newPassword?: string) : void;
    
    

    getUserSystemSetting() : UserSystemSetting;

}

export default UserEntityFactory;