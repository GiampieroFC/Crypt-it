import { readFileSync, unlinkSync, writeFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import { decipherContent } from "./decipher-content.js";

export const decipherFile = (file: string, password: string) => {
    const binaryContent = readFileSync(file);

    const decrypted = decipherContent(binaryContent, password)

    const nameDecryptedFile = basename(file).split('.');
    nameDecryptedFile.pop();

    writeFileSync(join(dirname(file), `${nameDecryptedFile.join('.')}`), decrypted);

    unlinkSync(file);
}

