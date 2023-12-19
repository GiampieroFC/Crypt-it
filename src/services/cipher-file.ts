import { readFileSync, unlinkSync, writeFileSync } from "node:fs";
import { toNBytes } from "../plugins/to-n-bytes.js"
import { createCipheriv } from "node:crypto";
import { basename, dirname, join } from "node:path";

export const cipherFile = (file: string, password: string) => {

    const algorithm = 'aes-256-cbc'
    const passwordInBytes = toNBytes(32, password);
    // const key = password.length;
    const iv = toNBytes(16, passwordInBytes.length);

    const content = readFileSync(file)
    const cipher = createCipheriv(algorithm, passwordInBytes, iv);

    let encrypted = Buffer.concat([cipher.update(content), cipher.final()]);

    writeFileSync(join(dirname(file), `${basename(file)}.crypted`), encrypted);

    unlinkSync(file);
}