import { Options } from "../interfaces/options.js";


export const optionsForInquirer = (options: Options[]) => [
    {
        name: 'files',
        type: 'checkbox',
        message: `Choose file: \n`,
        choices: options
    },
    {
        name: 'password',
        type: 'password',
        message: `Write password: \n`,
        default: 'parangaricutirimicuaro',
    }
];