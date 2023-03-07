import { load } from "opentype.js";
import { IFileReader } from "@/types/files";

export default class LugOpentype {
    files: IFileReader[];

    constructor(files: IFileReader[]) {
        this.files = files;
        this.readAll();
    }
    async readAll() {
        return await Promise.all(
            this.files.map(async (item) => {
                const font = await load(item.fileUrl as string);
                return Promise.resolve(font);
            })
        );
    }
}
