import { Action } from "../interfaces/enums.js";
import { select } from '@clack/prompts';
import { Options } from '../interfaces/options.js';

const optionsCipher: Options[] = [
    {
        label: '🔐 Cipher files',
        value: Action.cipher,
    },
    {
        label: '🔓 Decipher files .crypted',
        value: Action.decipher
    }
]

export const whatToDo = async () => {

    return await select({
        message: 'What do you want to do?',
        options: optionsCipher,
    });

}