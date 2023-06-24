import { IFontNames } from "./names";
import { IGlyph } from "./glyphs";
import { IMetric } from "./metrics";

export type IFont = {
    names: IFontNames;
    glyphs: IGlyph[];
    metrics: IMetric;
    url?: string | ArrayBuffer;
    binary?: string;
};
