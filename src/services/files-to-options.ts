import { resolve } from "node:path"

export const filesToOptions = (files: string[], emoji: string = '📃') => {
    return files.map(o => {
        return {
            name: `${emoji} ${o}`,
            value: resolve(o),
            short: `\n ${emoji} ${o}`
        }
    });
}

