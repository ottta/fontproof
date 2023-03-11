import { IFontNames } from "./names";
import { IGlyph } from "./glyphs";

export type IFont = {
    names: IFontNames;
    glyphs: IGlyph[];
    url?: string | ArrayBuffer;
    binary?: string;
};
