import { readFileSync, unlinkSync, writeFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import { decipherContent } from "./decipher-content.js";

export const decipherFile = (filePath: string, password: string) => {
    const binaryContent = readFileSync(filePath);

    const decrypted = decipherContent(binaryContent, password)

    const nameDecryptedFile = basename(filePath).split('.');
    nameDecryptedFile.pop();

    writeFileSync(join(dirname(filePath), `${nameDecryptedFile.join('.')}`), decrypted);

    unlinkSync(filePath);
}

