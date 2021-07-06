type CommunicationMethod  = 'email' | 'sms' | 'phone_call' | 'official_apps' | 'third_party_apps' | 'wechat_subscription_account';
export type {CommunicationMethod};

type CommunicationMethodWithNone = CommunicationMethod | 'none';
export type {CommunicationMethodWithNone};

const CommunicationMethods = [
    'email',
    'sms',
    'phone_call',
    'official_apps',
    'third_party_apps',
    'wechat_subscription_account'
];
export {CommunicationMethods};

const CommunicationMethodsWithNone = [
    'email',
    'sms',
    'phone_call',
    'official_apps',
    'third_party_apps',
    'wechat_subscription_account',
    'none'
];
export {CommunicationMethodsWithNone};