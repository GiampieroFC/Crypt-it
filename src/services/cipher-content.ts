import { createCipheriv } from "node:crypto";
import { toNBytes } from "./to-n-bytes.js";

export const cipherContent = (content: Buffer, password: string) => {

    const algorithm = 'aes-256-gcm'
    const passwordInBytes = toNBytes(32, password);
    const iv = toNBytes(16, passwordInBytes.length);

    const cipher = createCipheriv(algorithm, passwordInBytes, iv);

    let encrypted = Buffer.concat([cipher.update(content), cipher.final()]);
    let tag = cipher.getAuthTag();

    return Buffer.concat([tag, encrypted])
}