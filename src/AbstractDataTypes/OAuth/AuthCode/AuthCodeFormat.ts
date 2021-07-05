import hash from 'hash.js';
import { generateRandomHexString } from '../../../Utilities/HEXString';

type AuthCodeChallengeType = "PLAIN" | "S256" | "NONE";
const AuthCodeChallengeTypes = [
    "PLAIN",
    "S256",
    "NONE"
];

export type {AuthCodeChallengeType};
export {AuthCodeChallengeTypes};

function generateS256Challenge(verifierCharNum : number) : {verifier:string, challenge: string}{
    let verifier = generateRandomHexString(verifierCharNum);
    let challenge = hash.sha256().update(verifier).digest('hex');
    return {
        verifier: verifier,
        challenge: challenge
    };
}

export {generateS256Challenge};

function validateAuthCodeChallenge(type : AuthCodeChallengeType, challenge?: string, verifier?: string) : boolean{
    switch(type){
        case 'PLAIN':
            return challenge === verifier;
        case 'S256':
            if(verifier === undefined || challenge === undefined){
                return false;
            }
            return hash.sha256().update(verifier).digest('hex').toLowerCase() === challenge.toLowerCase();
        case 'NONE':
        default:
            return true;
    }
}

export {validateAuthCodeChallenge};