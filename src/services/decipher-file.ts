import { readFileSync, unlinkSync, writeFileSync } from "node:fs";
import { toNBytes } from "../plugins/to-n-bytes.js"
import { createDecipheriv } from "node:crypto";
import { basename, dirname, join } from "node:path";

export const decipherFile = (file: string, password: string) => {

    const algorithm = 'aes-256-cbc'
    const passwordInBytes = toNBytes(32, password);
    // const key = password.length;
    const iv = toNBytes(16, passwordInBytes.length);

    const binaryContent = readFileSync(file, { encoding: 'utf-8' })
    const decipher = createDecipheriv(algorithm, passwordInBytes, iv);

    let decrypted = decipher.update(binaryContent, 'binary', 'utf-8');
    decrypted += decipher.final('utf-8');

    const nameDecryptedFile = basename(file).split('.');
    nameDecryptedFile.pop();

    writeFileSync(join(dirname(file), `${nameDecryptedFile.join('.')}`), decrypted);

    unlinkSync(file);
}