import { resolve } from "node:path"
import { Options } from '../interfaces/options.js';

export const filesToOptions = (files: string[], emoji: string = '📃'): Options[] => {
    return files.map(o => {
        return {
            label: `${emoji} ${o}`,
            value: resolve(o),
        }
    });
}

