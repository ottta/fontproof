import { useMemo } from "react";
import { IEngine, IOS } from "ua-parser-js";

type useLineHeightProps = {
  upm: number;
  hheaAscender: number;
  hheaDescender: number;
  hheaLineGap: number;
  typoAscender: number;
  typoDescender: number;
  typoLineGap: number;
  useTypo: boolean;
  yMin: number;
  yMax: number;
  engine: IEngine;
  os: IOS;
};

function calculator(
  ascender: number,
  descender: number,
  lineGap: number,
  upm: number,
) {
  const total = (ascender + Math.abs(descender) + lineGap) / upm;
  return total;
}

/**
 * Calculate `line-height` based on their Layout Engines
 */
export default function useLineHeight(props: useLineHeightProps): number {
  const {
    upm,
    hheaAscender,
    hheaDescender,
    hheaLineGap,
    typoAscender,
    typoDescender,
    typoLineGap,
    yMax,
    yMin,
    useTypo,
    engine,
    os,
  } = props;

  const browsers = ["Chrome", "Firefox", "Safari"];
  const oses = ["Mac OS", "Windows"];
  const engines = ["Blink", "Gecko", "WebKit"] as const;

  /**
   * @todo Firefox: Might use 1.2 on several environment
   */
  const lineHeight = useMemo(() => {
    const hhea = calculator(hheaAscender, hheaDescender, hheaLineGap, upm);
    const typo = calculator(typoAscender, typoDescender, typoLineGap, upm);
    // Probably: Blink, Gecko, WebKit
    // console.log(
    //   yMax,
    //   typoAscender,
    //   hheaAscender,
    //   yMin,
    //   typoDescender,
    //   hheaDescender,
    // );
    switch (engine.name) {
      case "Blink":
        return hhea;
      case "Gecko":
        // return calculator(typoAscender, typoDescender, 46, upm);
        // return calculator(yMax, yMin, 0, upm);
        // https://developer.mozilla.org/en-US/docs/Web/CSS/line-height#normal
        // return 1.2;
        // return typo;
        return hhea;
      case "WebKit":
        if (useTypo) return typo;
        return hhea;
      default:
        return hhea;
    }
  }, [
    upm,
    hheaAscender,
    hheaDescender,
    hheaLineGap,
    typoAscender,
    typoDescender,
    typoLineGap,
    yMax,
    yMin,
    useTypo,
    engine,
    os,
  ]);

  return lineHeight;
}
