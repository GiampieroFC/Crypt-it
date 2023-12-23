import { readFileSync, unlinkSync, writeFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import { cipherContent } from "./cipher-content.js";

export const cipherFile = (filePath: string, password: string) => {

    const content = readFileSync(filePath);

    const { tag, encrypted } = cipherContent(content, password);

    writeFileSync(join(dirname(filePath), `${basename(filePath)}.crypted`), Buffer.concat([tag, encrypted]));

    unlinkSync(filePath);
}
