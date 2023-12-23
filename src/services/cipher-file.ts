import { readFileSync, unlinkSync, writeFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import { cipherContent } from "./cipher-content.js";

export const cipherFile = (filePath: string, password: string) => {

    const content = readFileSync(filePath);

    const cipher = cipherContent(content, password);

    writeFileSync(join(dirname(filePath), `${basename(filePath)}.crypted`), cipher);

    unlinkSync(filePath);
}
