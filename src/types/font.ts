import { IFontNames } from "./names";

export type IFont = {
    names: IFontNames;
    url?: string | ArrayBuffer;
};
