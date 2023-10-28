import { createCipheriv, createDecipheriv } from 'node:crypto';
import { toNBytes } from './config/plugins/to-n-bytes.js';
import inquirer from 'inquirer';


const algorithm = 'aes-256-cbc';
const key = 'soy la key';
const ini = key.length;


(async () => {

    const opt = await inquirer.prompt([
        {
            type: 'checkbox',
            name: 'files',
            message: 'Choose file to encrypt',
            choices: [
                {
                    name: 'file 1',
                    value: 'path del file 1',
                    short: 'short 1',
                },
                {
                    name: 'file 2',
                    value: 'path del file 2',
                    short: 'short 2',
                },
                {
                    name: 'file 3',
                    value: 'path del file 3',
                    short: 'short 3',
                },
                {
                    name: 'file 4',
                    value: 'path del file 4',
                    short: 'short 4',
                },
                {
                    name: 'file 5',
                    value: 'path del file 5',
                    short: 'short 5',
                },

            ]
        }
    ]);

    console.log(opt)
})()


const password = toNBytes(32, key);
const iv = toNBytes(16, ini);

const cipher = createCipheriv(algorithm, password, iv);

let encrypted = cipher.update('laborum Aut sequi ducimus et. Assumenda nesciunt odit autem et asperiores mollitia reprehenderit totam. Nulla sapiente inventore velit sint molestiae. Quod sed quis.', 'utf8', 'binary');

encrypted += cipher.final('binary');

const decipher = createDecipheriv(algorithm, password, iv);

let decryptedData = decipher.update(encrypted, "binary", "utf8");

decryptedData += decipher.final("utf8");

console.log('👉 encrypted:', encrypted);

console.log('👉 decrypted:', decryptedData);