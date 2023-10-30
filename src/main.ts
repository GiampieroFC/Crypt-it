import { createCipheriv, createDecipheriv } from 'node:crypto';
import { toNBytes } from './config/plugins/to-n-bytes.js';
import inquirer from 'inquirer';
import { readFileSync, readdirSync, statSync, unlinkSync, writeFileSync } from 'node:fs';
import { dirname, resolve, join, extname, basename } from 'node:path';

const dir = readdirSync('.');

const files = dir.filter(f => statSync(f).isFile());
const options = files.map(o => {
    return {
        name: `📃 ${o}`,
        value: resolve(o),
        short: `\n 📃 ${o}`
    }
});

const filesCryptit = dir.filter(f => extname(resolve(f)) === '.crypted');
const optionsCryptit = filesCryptit.map(o => {
    return {
        name: `🔐 ${o}`,
        value: resolve(o),
        short: `\n 🔐 ${o}`
    }
});

enum Action {
    cipher = 'cipher',
    decipher = 'decipher',
}

enum Sure {
    yes = '👍 Sure.',
    no = '👎 No.',
}

const whatToDo = async () => {
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
                    name: '🔓 Decipher files',
                    value: Action.decipher
                },
            ]
        }
    ]);

    return toDo;
}

(async () => {

    let toDo: Action;
    let isSure: Sure;

    do {
        const askForAction = await whatToDo()
        const confirmation = await inquirer.prompt([{
            type: 'confirm',
            name: 'isSure',
            message: `Are you sure that you want ${askForAction.action.toUpperCase()} files?`,
            default: false,
            transformer: (answer: boolean) => (answer ? Sure.yes : Sure.no),
        }])

        isSure = confirmation.isSure;
        toDo = askForAction.action;

    } while (isSure === Sure.no);


    if (toDo === Action.cipher) {
        const opt = await inquirer.prompt([
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
        ]);


        const algorithm = 'aes-256-cbc';
        const key = Math.round(Math.random() * 100);

        const password = toNBytes(32, opt.password);
        const iv = toNBytes(16, key);


        opt.files.forEach((f: string) => {
            const text = readFileSync(f, { encoding: 'utf-8' });
            const cipher = createCipheriv(algorithm, password, iv);

            let encrypted = cipher.update(text, 'utf-8', 'binary');
            encrypted += cipher.final('binary');


            writeFileSync(join(dirname(f), `${basename(f)}.crypted`), encrypted);

            unlinkSync(f);
        });

        console.log(`Remember your password and this key: ${key} to decipher your documents`);
    }

    if (toDo === Action.decipher) {
        const opt = await inquirer.prompt([
            {
                name: 'files',
                type: 'checkbox',
                message: `Choose file: \n`,
                choices: optionsCryptit
            },
            {
                name: 'password',
                type: 'password',
                message: `Write password: \n`,
                default: 'parangaricutirimicuaro',
            },
            {
                name: 'key',
                type: 'input',
                message: `Write the key received when you ${Action.cipher} your documents: \n`,
                validate(value) {
                    if (typeof +value !== 'number' || Number.isNaN(+value)) {
                        return 'The key should be a number';
                    }
                    return true;
                },
            },
        ]);



        const algorithm = 'aes-256-cbc';
        const password = toNBytes(32, opt.password);
        const iv = toNBytes(16, parseInt(opt.key));

        opt.files.forEach((f: string) => {
            const binaryText = readFileSync(f, { encoding: 'utf-8' })

            const decipher = createDecipheriv(algorithm, password, iv);

            let decrypted = decipher.update(binaryText, 'binary', 'utf-8');
            decrypted += decipher.final('utf-8');

            const nameDecryptedFile = basename(f).split('.');
            nameDecryptedFile.pop();

            writeFileSync(join(dirname(f), `${nameDecryptedFile.join('.')}`), decrypted);

            unlinkSync(f);
        });
    }
    return
}
)()