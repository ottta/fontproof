import type { Font } from "opentype.js";
import type { IMetric } from "@/types/metrics";

export default function parseMetrics(font: Font): IMetric {
    const typefaceMetrics = {
        unitsPerEm: font.unitsPerEm as number,
        usWinAscent: font.tables.os2.usWinAscent as number,
        usWinDescent: font.tables.os2.usWinDescent as number,
        sTypoAscender: font.tables.os2.sTypoAscender as number,
        sTypoDescender: font.tables.os2.sTypoDescender as number,
        descender: font.tables.hhea.descender as number,
        ascender: font.tables.hhea.ascender as number,
        xHeight: font.tables.os2.sxHeight as number,
        capHeight: font.tables.os2.sCapHeight as number,
        baseLine: 0,
        xMax: font.tables.head.xMax as number,
        xMin: font.tables.head.xMin as number,
        yMax: font.tables.head.yMax as number,
        yMin: font.tables.head.yMin as number
    };
    return typefaceMetrics;
}
