import { readFileSync, unlinkSync, writeFileSync } from "node:fs";
import { toNBytes } from "../plugins/to-n-bytes.js"
import { createCipheriv } from "node:crypto";
import { basename, dirname, join } from "node:path";

export const cipherFile = (file: string, password: string) => {

    const algorithm = 'aes-256-cbc'
    const passwordInBytes = toNBytes(32, password);
    // const key = password.length;
    const iv = toNBytes(16, passwordInBytes.length);

    const content = readFileSync(file, { encoding: 'utf-8' })
    const cipher = createCipheriv(algorithm, passwordInBytes, iv);

    let encrypted = cipher.update(content, 'utf-8', 'binary');
    encrypted += cipher.final('binary');

    writeFileSync(join(dirname(file), `${basename(file)}.crypted`), encrypted);

    unlinkSync(file);
}