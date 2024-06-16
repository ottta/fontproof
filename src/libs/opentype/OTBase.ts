import { FeatureTag } from "./feature-tags";
import { uniBlocks } from "./uni-blocks";
import { uniNames } from "./uni-names";

import { Font, Glyph } from "opentype.js";

type SVGHMetrics = [lsb: number, adv: number, rsb: number];
type SVGViewBox = [minX: number, minY: number, width: number, height: number];
type SVGDimensions = [width: number, height: number];

type SVGGlyph = {
  path: string[];
  viewBox: SVGViewBox;
  size: SVGDimensions;
  hMetric: SVGHMetrics;
};

type BaseMetric = {
  ascender: number;
  capHeight: number;
  xHeight: number;
  baseLine: number;
  descender: number;
  hheaAscender: number;
  hheaDescender: number;
  winAscender: number;
  winDescender: number;
  typoAscender: number;
  typoDescender: number;
  typoLineGap: number;
  hheaLineGap: number;
};

export type FontMetric = BaseMetric & {
  unitsPerEm: number;
  xMax: number;
  xMin: number;
  yMax: number;
  yMin: number;
  useTypoMetrics: boolean;
  svg: Omit<BaseMetric, "typoLineGap" | "hheaLineGap"> & {
    tallest: number;
    deepest: number;
    height: number;
  };
};

export type FontGlyph = {
  gid: number[];
  name: (string | null)[];
  glyphName: (string | null)[];
  code: (number | null)[];
  hex: (string | null)[];
  block: string;
  // char: (string | null)[];
  svg: SVGGlyph;
  feature?: FeatureTag;
};

export class OTBase {
  protected readonly glyphs: Glyph[];
  protected readonly metrics: FontMetric;

  constructor(protected readonly font: Font) {
    this.glyphs = Array.from({ length: font.numGlyphs }).map((_, i) =>
      font.glyphs.get(i),
    );
    const OS2 = this.font.tables["os2"];
    const HHEA = this.font.tables["hhea"];
    const HEAD = this.font.tables["head"];
    const latinSmallLetterP = this.font.charToGlyph("p").getMetrics().yMin;
    const latinSmallLetterB = this.font.charToGlyph("b").getMetrics().yMax;

    // See: https://silnrsi.github.io/FDBP/en-US/Line_Metrics.html
    const metrics = {
      unitsPerEm: this.font.unitsPerEm as number,
      winAscender: OS2.usWinAscent as number,
      winDescender: -Math.abs(OS2.usWinDescent as number),
      typoAscender: OS2.sTypoAscender as number,
      typoDescender: OS2.sTypoDescender as number,
      typoLineGap: OS2.sTypoLineGap as number,
      hheaAscender: HHEA.ascender as number,
      hheaDescender: HHEA.descender as number,
      hheaLineGap: HHEA.lineGap as number,
      xHeight: OS2.sxHeight as number,
      capHeight: OS2.sCapHeight as number,
      baseLine: 0,
      xMax: HEAD.xMax as number,
      xMin: HEAD.xMin as number,
      yMax: HEAD.yMax as number,
      yMin: HEAD.yMin as number,
      useTypoMetrics: this.isTypoMetrics(OS2.fsSelection), // USE_TYPO_METRICS
      ascender: latinSmallLetterB,
      descender: latinSmallLetterP,
    };

    // const typoMetrics =
    //   metrics.typoAscender +
    //   Math.abs(metrics.typoDescender) +
    //   metrics.typoLineGap;

    // const hheaMetrics =
    //   metrics.hheaAscender +
    //   Math.abs(metrics.hheaDescender) +
    //   metrics.hheaLineGap;

    // const tallest = Math.max(
    //   // metrics.yMax,
    //   metrics.hheaAscender + metrics.hheaLineGap / 2,
    //   metrics.useTypoMetrics
    //     ? metrics.typoAscender + metrics.typoLineGap / 2
    //     : metrics.winAscender,
    // );
    // const deepest = Math.min(
    //   // metrics.yMin,
    //   metrics.hheaDescender + metrics.hheaLineGap / 2,
    //   metrics.useTypoMetrics
    //     ? metrics.typoDescender + metrics.typoLineGap / 2
    //     : metrics.winDescender,
    // );
    // const tallest = Math.max(
    //   // metrics.yMax,
    //   metrics.hheaAscender,
    //   metrics.useTypoMetrics ? metrics.typoAscender : metrics.winAscender,
    // );
    // const deepest = Math.min(
    //   // metrics.yMin,
    //   metrics.hheaDescender,
    //   metrics.useTypoMetrics ? metrics.typoDescender : metrics.winDescender,
    // );
    const tallest = Math.max(metrics.hheaAscender, metrics.typoAscender);
    const deepest = Math.min(metrics.hheaDescender, metrics.typoDescender);

    const yRelative = (val: number) =>
      ((tallest - val) / (tallest + Math.abs(deepest))) * 100;

    const svgMetrics = {
      tallest,
      deepest,
      height: tallest + Math.abs(deepest),
      baseLine: yRelative(metrics.baseLine),
      xHeight: yRelative(metrics.xHeight),
      capHeight: yRelative(metrics.capHeight),
      ascender: yRelative(metrics.ascender),
      descender: yRelative(metrics.descender),
      hheaAscender: yRelative(metrics.hheaAscender),
      hheaDescender: yRelative(metrics.hheaDescender),
      typoAscender: yRelative(metrics.typoAscender),
      typoDescender: yRelative(metrics.typoDescender),
      winAscender: yRelative(metrics.winAscender),
      winDescender: yRelative(metrics.winDescender),
    };

    this.metrics = {
      ...metrics,
      svg: svgMetrics,
    };
  }

  private isTypoMetrics(fsSelection: number) {
    // Convert to base 16 digits binary string
    const binString = fsSelection.toString(2).padStart(16, "0");
    // Open => 416 => 0x01a0 => 0000 0001 1010 0000
    // Nyta => 416 => 0x01a0 => 0000 0001 1010 0000
    /**
     * See: https://learn.microsoft.com/en-us/typography/opentype/spec/os2#fsselection
     */
    return binString[binString.length - 8] === "1";
  }

  private getUniBlock(code?: number): string | null {
    if (!code) return null;
    return (
      uniBlocks.find((item) => {
        const [start, end] = item.codes;
        return code >= start && code <= end;
      })?.block ?? null
    );
  }

  private getUniName(code?: number): string | null {
    if (!code) return null;
    const hex = this.decToHex(code);
    if (!hex) return null;
    // @ts-ignore
    return uniNames[hex];
  }

  private decToHex(code?: number) {
    if (!code) return null;
    return ("0000" + code.toString(16)).slice(-4).toUpperCase();
  }

  private toTitleCase(sentence?: string | null) {
    if (!sentence) return null;
    const exceptions = ["with", "and", "for", "or", "but", "nor", "so"];
    return sentence
      .toLowerCase()
      .split(" ")
      .map((word, i) =>
        exceptions.includes(word) && i !== 0
          ? word
          : word.charAt(0).toUpperCase().concat(word.substring(1)),
      )
      .join(" ");
  }

  protected getGlyphs(): FontGlyph[];
  protected getGlyphs(gid: number | number[]): FontGlyph;
  protected getGlyphs(gid?: number | number[]) {
    // See: https://learn.microsoft.com/en-us/typography/opentype/spec/gsub#11-single-substitution-format-1
    const baseModulo = 65536 as const;
    const length = this.glyphs.length;

    if (!gid) return this.glyphs.map((item) => this.getSingle(item));
    if (!Array.isArray(gid)) {
      if (gid > length) return this.getSingle(this.glyphs[gid % baseModulo]);
      return this.getSingle(this.glyphs[gid]);
    }
    return this.getMultiple(
      gid.map((id) =>
        id > length ? this.glyphs[id % baseModulo] : this.glyphs[id],
      ),
    );
  }

  private getSingle(glyph: Glyph): FontGlyph {
    return {
      gid: [glyph.index],
      name: [this.toTitleCase(this.getUniName(glyph.unicode)) ?? null],
      glyphName: [glyph.name ?? null],
      block: this.getUniBlock(glyph.unicode) || "Unknown",
      code: [glyph.unicode ?? null],
      hex: [this.decToHex(glyph.unicode)],
      // char: [String.fromCharCode(Number(glyph.unicode))],
      svg: this.makeSVGs([glyph]),
    };
  }

  private getMultiple(glyphs: Glyph[]): FontGlyph {
    return {
      gid: glyphs.map((item) => item.index),
      name: glyphs.map(
        (item) => this.toTitleCase(this.getUniName(item.unicode)) ?? null,
      ),
      glyphName: glyphs.map((item) => item.name ?? null),
      block: glyphs
        .map((item) => this.getUniBlock(item.unicode) || "Unknown")
        .join(", "),
      code: glyphs.map((item) => item.unicode ?? null),
      hex: glyphs.map((item) => this.decToHex(item.unicode)),
      // char: glyphs.map((item) => String.fromCharCode(Number(item.unicode))),
      svg: this.makeSVGs(glyphs),
    };
  }

  private makeSVGs(glyphs: Glyph[]) {
    const { unitsPerEm, svg } = this.metrics;
    /**
     * Combining Diacritic Marks
     * 0300..036F General
     * 1AB0..1AFF Extended (V 4.1 to 5.2)
     * 20D0..20FF For Symbols
     */

    /**
     * See: https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/width#examples
     * @todo make more robust schema for glyph with '0' advance width
     */
    const minWidth = 4 as const;
    const minWidthRatio =
      unitsPerEm === 1000 ? minWidth : unitsPerEm / (1000 / minWidth);

    const widths = glyphs.map((item) => {
      const aw = Number(item.advanceWidth);
      return aw > 0 ? aw : minWidthRatio;
    });

    const sequenceWidths = widths.reduce(
      (acc, v) => [...acc, acc[acc.length - 1] + v],
      [0] as number[],
    );

    const path = glyphs.map((item, i) =>
      item.getPath(sequenceWidths[i], svg.tallest, unitsPerEm).toPathData(4),
    );

    const width = Math.floor(widths.reduce((a, b) => a + b, 0)); // Summarize widths

    const size: SVGDimensions = [
      parseFloat(((width / svg.height) * 100).toFixed(2)),
      100,
    ];
    const viewBox: SVGViewBox = [0, 0, width, svg.height];
    const hMetric: SVGHMetrics = [
      width <= minWidthRatio * 3 ? 0 : glyphs[0].leftSideBearing || 0, // LSB
      // Addition by `minWidth`, the minimum value will always be `minWidth`
      width <= minWidthRatio * 3 ? 0 : width, // AW
      // See https://learn.microsoft.com/en-us/typography/opentype/spec/hmtx
      width <= minWidthRatio * 3
        ? 0
        : Number(glyphs[glyphs.length - 1].advanceWidth) -
          (Number(glyphs[glyphs.length - 1].leftSideBearing) +
            glyphs[glyphs.length - 1].getMetrics().xMax -
            glyphs[glyphs.length - 1].getMetrics().xMin), // RSB
    ];

    return {
      path,
      size, // BBOX => [width, height]
      viewBox, // View box [min-x, min-y, width, height]
      hMetric, // [LSB, AW, RSB]
    };
  }
}
