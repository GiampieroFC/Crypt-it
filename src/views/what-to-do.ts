import inquirer from "inquirer";
import { Action } from "../interfaces/enums.js";

export const whatToDo = async () => {
    const toDo = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What do you want to do?\n',
            choices: [
                {
                    name: '🔐 Cipher files',
                    value: Action.cipher
                },
                new inquirer.Separator(),
                {
                    name: '🔓 Decipher files .crypted',
                    value: Action.decipher
                },
            ]
        }
    ]);

    return toDo;
}