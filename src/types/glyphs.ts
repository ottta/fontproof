import { IUnicodeData } from "./unicode";

export type IGlyphMetric = {
    coordinate: number;
    value: number;
};

export type IGlyphSvg = {
    viewBox: string;
    path: string;
    ascender: IGlyphMetric;
    descender: IGlyphMetric;
    baseline: IGlyphMetric;
    capHeight: IGlyphMetric;
    xHeight: IGlyphMetric;
    advanceWidth: number;
    xMax: number;
    typoAscender: IGlyphMetric;
    typoDescender: IGlyphMetric;
    winAscent: IGlyphMetric;
    winDescent: IGlyphMetric;
    yMin: IGlyphMetric;
    yMax: IGlyphMetric;
    leftSideBearing: IGlyphMetric;
    rightSideBearing: IGlyphMetric;
    boundingBox: {
        width: number;
        height: number;
    };
};

export type IGlyph = {
    id: number;
    name: string;
    unicode: IUnicodeData;
    svg: IGlyphSvg;
};
