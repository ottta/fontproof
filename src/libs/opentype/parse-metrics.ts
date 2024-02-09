import type { IMetric } from "@/types/metrics";

import type { Font } from "opentype.js";

export default function parseMetrics(font: Font): IMetric {
  const latinSmallLetterP = font.charToGlyph("p").getMetrics().yMin;
  const latinSmallLetterB = font.charToGlyph("b").getMetrics().yMax;

  const typefaceMetrics: IMetric = {
    unitsPerEm: font.unitsPerEm as number,
    winAscender: font.tables.os2.usWinAscent as number,
    winDescender: font.tables.os2.usWinDescent as number,
    typoAscender: font.tables.os2.sTypoAscender as number,
    typoDescender: font.tables.os2.sTypoDescender as number,
    hheaAscender: font.tables.hhea.ascender as number,
    hheaDescender: font.tables.hhea.descender as number,
    ascender: latinSmallLetterB as number,
    descender: latinSmallLetterP as number,
    xHeight: font.tables.os2.sxHeight as number,
    capHeight: font.tables.os2.sCapHeight as number,
    baseLine: 0,
    xMax: font.tables.head.xMax as number,
    xMin: font.tables.head.xMin as number,
    yMax: font.tables.head.yMax as number,
    yMin: font.tables.head.yMin as number,
    useTypoMetrics: font.tables["os2"].fsSelection === 192 // USE_TYPO_METRICS
  };
  return typefaceMetrics;
}
