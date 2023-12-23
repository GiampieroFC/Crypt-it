import { createDecipheriv } from "node:crypto";
import { toNBytes } from "../plugins/to-n-bytes.js";

export const decipherContent = (binaryContent: Buffer, password: string): Buffer => {

    const algorithm = 'aes-256-gcm';
    const passwordInBytes = toNBytes(32, password);
    const iv = toNBytes(16, passwordInBytes.length);

    const authTag = binaryContent.subarray(0, 16);
    const encryptedData = binaryContent.subarray(16);

    const decipher = createDecipheriv(algorithm, passwordInBytes, iv);
    decipher.setAuthTag(authTag);

    let decrypted = Buffer.concat([decipher.update(encryptedData), decipher.final()]);

    return decrypted;
}

