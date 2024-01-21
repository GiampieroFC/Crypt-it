#!/usr/bin/env node
import { isCancel, cancel, text, intro, outro, confirm, groupMultiselect, password, spinner } from '@clack/prompts';
import color from 'picocolors';
import { statSync } from 'node:fs';
import { resolve, extname } from 'node:path';
import { Action } from './interfaces/enums.js';
import { directory } from './services/where.js';
import { filesToOptions } from './services/files-to-options.js';
import { whatToDo } from './views/what-to-do.js';
import { cipherFile } from './services/cipher-file.js';
import { decipherFile } from './services/decipher-file.js';

const canceled = (value: string | symbol) => {
    if (isCancel(value)) {
        cancel('Operation cancelled.');
        process.exit(0);
    }
}

const spin = spinner();

(async () => {

    console.clear();

    intro(`${color.bgCyan(color.black(' Sifre, to cipher files '))}`);

    let todo;
    let shouldTodo;

    do {

        todo = await whatToDo();

        shouldTodo = await confirm({
            message: `Do you want to ${color.green((todo as string).toLocaleUpperCase())}👈?`,
        });

    } while (!shouldTodo);


    const pathDir = await text({
        message: `Write relative or absolute path of ${color.green('directory')}`,
        placeholder: "Enter to open here",
        defaultValue: resolve('.'),
    })

    if (todo === Action.cipher) {

        const dir = directory(pathDir.toString());

        const files = dir.filter(f => statSync(f).isFile() && extname(resolve(f)) !== '.crypted');

        const options = filesToOptions(files);

        const selectedFiles = await groupMultiselect({
            message: `Select files to ${color.green((todo as string).toLocaleUpperCase())}`,
            options: {
                'All files': options
            }
        })

        if ((selectedFiles as string[]).length < 1) {
            console.log(`You haven't chosen any file to ${todo}`);
            process.exit(1);
        }

        const pw = await password({
            message: 'Provide a password',
            mask: '🤐'
        });

        spin.start(`${color.dim('ciphering...')}`);

        (selectedFiles as string[]).forEach((f: string) => {
            cipherFile(f, (pw as string));
        });

        spin.stop(`${color.yellow('👍 Encripted!')}`);
    }

    if (todo === Action.decipher) {

        const dir = directory(pathDir.toString());

        const filesCryptit = dir.filter(f => extname(resolve(f)) === '.crypted');

        const options = filesToOptions(filesCryptit);

        const selectedFiles = await groupMultiselect({
            message: `Select files to ${color.green((todo as string).toLocaleUpperCase())}`,
            options: {
                'All files': options
            }
        })

        if ((selectedFiles as string[]).length < 1) {
            console.log(`You haven't chosen any file to ${todo}`);
            process.exit(1);
        }

        const pw = await password({
            message: 'Enter the password',
            mask: '🤐'
        });

        spin.start(`${color.dim('deciphering...')}`);

        (selectedFiles as string[]).forEach((f: string) => {
            decipherFile(f, (pw as string));
        });

        spin.stop(`${color.yellow('👍 Decrypted!')}`);
    }



    //     password: () =>
    //         p.password({
    //             message: 'Provide a password',
    //             validate: (value) => {
    //                 if (!value) return 'Please enter a password.';
    //                 if (value.length < 5)
    //                     return 'Password should have at least 5 characters.';
    //             },
    //         }),
    //     type: ({ results }) =>
    //         p.select({
    //             message: `Pick a project type within "${results.path}"`,
    //             initialValue: 'ts',
    //             maxItems: 5,
    //             options: [
    //                 { value: 'ts', label: 'TypeScript' },
    //                 { value: 'js', label: 'JavaScript' },
    //                 { value: 'rust', label: 'Rust' },
    //                 { value: 'go', label: 'Go' },
    //                 { value: 'python', label: 'Python' },
    //                 { value: 'coffee', label: 'CoffeeScript', hint: 'oh no' },
    //             ],
    //         }),
    //     tools: () =>
    //         p.groupMultiselect({
    //             message: 'Select additional tools.',
    //             initialValues: ['prettier', 'eslint'],
    //             options: {
    //                 'All Tools': [
    //                     { value: 'prettier', label: 'Prettier', hint: 'recommended' },
    //                     { value: 'eslint', label: 'ESLint', hint: 'recommended' },
    //                     { value: 'stylelint', label: 'Stylelint' },
    //                     { value: 'gh-action', label: 'GitHub Action' },
    //                 ],
    //             },
    //         }),
    //     install: () =>
    //         p.confirm({
    //             message: 'Install dependencies?',
    //             initialValue: false,
    //         }),
    // },
    // {
    //     onCancel: () => {
    //         p.cancel('Operation cancelled.');
    //         process.exit(0);
    //     },
    // }

    // if (project.install) {
    //     const s = p.spinner();
    //     s.start('Installing via pnpm');
    //     await setTimeout(2500);
    //     s.stop('Installed via pnpm');
    // }

    // let nextSteps = `cd ${project.path}        \n${project.install ? '' : 'pnpm install\n'
    //     }pnpm dev`;

    // p.note(nextSteps, 'Next steps.');

})()
    .catch(console.error)
    .finally(() => {
        outro(
            `Problems? ${color.underline(color.cyan('https://example.com/issues'))}`
        );
        process.exit(0);
    });