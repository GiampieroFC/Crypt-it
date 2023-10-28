import { createCipheriv, createDecipheriv } from 'node:crypto';

const algorithm = 'aes-256-cbc';
const key = 'soy la key';
const ini = 65;
const password = Buffer.alloc(32, key, 'binary');
const iv = Buffer.alloc(16, ini, 'binary');
const cipher = createCipheriv(algorithm, password, iv);

let encrypted = cipher.update('laborum Aut sequi ducimus et. Assumenda nesciunt odit autem et asperiores mollitia reprehenderit totam. Nulla sapiente inventore velit sint molestiae. Quod sed quis.', 'utf8', 'binary');

encrypted += cipher.final('binary');

const decipher = createDecipheriv(algorithm, password, iv);

let decryptedData = decipher.update(encrypted, "binary", "utf8");

decryptedData += decipher.final("utf8");

console.log('👉 encrypted:', encrypted);

console.log('👉 decrypted:', decryptedData);