import { readdirSync } from "node:fs";

export const directory = (path: string) => readdirSync(path);