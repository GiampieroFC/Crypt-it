import inquirer from "inquirer"
import { Sure } from "../interfaces/enums.js"

export const confirmChoice = async (choice: string) => {
    const isSure = await inquirer.prompt([{
        type: 'confirm',
        name: 'isSure',
        message: `You want ${choice.toUpperCase()}, right?`,
        default: false,
        transformer: (answer: boolean) => (answer ? Sure.yes : Sure.no),
    }])
    return isSure;
}