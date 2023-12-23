import { createCipheriv } from "node:crypto";
import { toNBytes } from "../plugins/to-n-bytes.js";

export const cipherContent = (content: Buffer, password: string): { tag: Buffer, encrypted: Buffer } => {

    const algorithm = 'aes-256-gcm'
    const passwordInBytes = toNBytes(32, password);
    const iv = toNBytes(16, passwordInBytes.length);

    const cipher = createCipheriv(algorithm, passwordInBytes, iv);

    let encrypted = Buffer.concat([cipher.update(content), cipher.final()]);
    let tag = cipher.getAuthTag();

    return {
        tag,
        encrypted
    }
}