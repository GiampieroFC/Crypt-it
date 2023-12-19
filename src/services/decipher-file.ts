import { readFileSync, unlinkSync, writeFileSync } from "node:fs";
import { toNBytes } from "../plugins/to-n-bytes.js"
import { createDecipheriv } from "node:crypto";
import { basename, dirname, join } from "node:path";

export const decipherFile = (file: string, password: string) => {

    const algorithm = 'aes-256-cbc'
    const passwordInBytes = toNBytes(32, password);
    // const key = password.length;
    const iv = toNBytes(16, passwordInBytes.length);

    const binaryContent = readFileSync(file)
    const decipher = createDecipheriv(algorithm, passwordInBytes, iv);

    let decrypted = Buffer.concat([decipher.update(binaryContent), decipher.final()]);

    const nameDecryptedFile = basename(file).split('.');
    nameDecryptedFile.pop();

    writeFileSync(join(dirname(file), `${nameDecryptedFile.join('.')}`), decrypted);

    unlinkSync(file);
}