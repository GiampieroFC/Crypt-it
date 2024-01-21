import inquirer from "inquirer";
import { Action } from "../interfaces/enums.js";
import { select } from '@clack/prompts';
import { Options } from '../interfaces/options.js';

// export const whatToDo = async () => {
//     const toDo = await inquirer.prompt([
//         {
//             type: 'list',
//             name: 'action',
//             message: 'What do you want to do?\n',
//             choices: [
//                 {
//                     name: '🔐 Cipher files',
//                     value: Action.cipher
//                 },
//                 new inquirer.Separator(),
//                 {
//                     name: '🔓 Decipher files .crypted',
//                     value: Action.decipher
//                 },
//             ]
//         }
//     ]);

//     return toDo;
// }

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