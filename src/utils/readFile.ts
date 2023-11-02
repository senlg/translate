import { resolve } from "path";
import { readFile } from "fs";

export const readHtml = async (filePath: string): Promise<string> => {
    return await new Promise((resolve, reject) => {
        readFile(filePath, { encoding: "utf-8" }, (err: NodeJS.ErrnoException | null, data: string) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(data);
        });
    });
};