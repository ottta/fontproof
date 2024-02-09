import generateUnicodeData from "../helper/generateUnicodeData";
import parseMetrics from "./parse-metrics";

import type { IGlyph } from "@/types/glyphs";
import type { IMetric } from "@/types/metrics";

import type { Font, Glyph } from "opentype.js";

async function svgGlyphs(glyphs: Glyph[], vmx: IMetric) {
  const pixelRatio = 1;
  const width = 80;
  const height = 64;

  // Find highest ascender
  const highestAscender = Math.max(
    // vmx.yMax,
    vmx.hheaAscender,
    vmx.typoAscender,
    vmx.winAscender
  );

  // Find deepest descender
  const deepestDescender = Math.min(
    // vmx.yMin,
    vmx.hheaDescender,
    vmx.typoDescender,
    // Convert to negative value since usWinDescent has positive value
    -Math.abs(vmx.winDescender)
  );

  // Create default height based on real aspect ratio
  // Notice that we convert negative to positive value inside `Math.abs()`
  // const height = Math.round(
  //     ((highestAscender + Math.abs(deepestDescender)) / (vmx.xMax + Math.abs(vmx.xMin))) * width
  // );

  // const width = (vmx.xMax - vmx.xMin) * vmx.unitsPerEm;

  // Glyph max-height and max-width value
  const maxHeight = highestAscender - deepestDescender;
  const maxWidth = vmx.xMax - vmx.xMin;

  const parentWidth = width / pixelRatio;
  const parentHeight = height / pixelRatio;

  const glyphScale = Math.min(parentWidth / maxWidth, parentHeight / maxHeight);
  const glyphSize = glyphScale * vmx.unitsPerEm;
  const glyphBaseline = (parentHeight * highestAscender) / maxHeight;

  // const ypx = (val: number) => Math.round(glyphBaseline - val * glyphScale);
  const ypx = (val: number) =>
    parseFloat((glyphBaseline - val * glyphScale).toFixed(2));

  const unicodes = glyphs.map((item) =>
    item.unicode
      ? `${("0000" + item.unicode?.toString(16)).slice(-4)}`.toUpperCase()
      : ""
  );

  const unicodeData = await generateUnicodeData(unicodes);

  function getSVGMetrics(val: number) {
    return { coordinate: ypx(val), value: val };
  }

  return glyphs.map((item) => {
    const glyphWidth = Number(item.advanceWidth) * glyphScale;
    const xmin = (parentWidth - glyphWidth) / 2; // Centering path
    const xmax = (parentWidth + glyphWidth) / 2;
    const glyphSVG = item.getPath(xmin, glyphBaseline, glyphSize).toPathData(4);

    return {
      id: item.index,
      name: item.name,
      unicode: unicodeData.find((u) => u?.codePoint === item.unicode) || null,
      svg: {
        viewBox: `0 0 ${width} ${height}`,
        path: glyphSVG,
        ascender: getSVGMetrics(vmx.ascender),
        descender: getSVGMetrics(vmx.descender),
        baseline: getSVGMetrics(vmx.baseLine),
        hheaAscender: getSVGMetrics(vmx.hheaAscender),
        hheaDescender: getSVGMetrics(vmx.hheaDescender),
        capHeight: getSVGMetrics(vmx.capHeight),
        xHeight: getSVGMetrics(vmx.xHeight),
        typoAscender: getSVGMetrics(vmx.typoAscender),
        typoDescender: getSVGMetrics(vmx.typoDescender),
        winAscender: getSVGMetrics(vmx.winAscender),
        winDescender: getSVGMetrics(-Math.abs(vmx.winDescender)),
        xMax: vmx.xMax,
        yMax: getSVGMetrics(vmx.yMax),
        yMin: getSVGMetrics(vmx.yMin),
        advanceWidth: Number(item.advanceWidth),
        leftSideBearing: {
          coordinate: Math.round(xmin),
          value: Number(item.leftSideBearing)
        },
        rightSideBearing: {
          coordinate: Math.round(xmax),
          value: Number(item.advanceWidth) - Number(item.xMax)
        },
        boundingBox: {
          height,
          width
        }
      }
    } as IGlyph;
  });
}

export default async function ParseGlyphs(font: Font) {
  const vmx = parseMetrics(font);

  const glyphsLength = font.glyphs.length;
  const glyphs = Array(glyphsLength)
    .fill("")
    .map((_, i) => font.glyphs.get(i));
  const glyphsObj = await svgGlyphs(glyphs, vmx);
  return glyphsObj;
}
