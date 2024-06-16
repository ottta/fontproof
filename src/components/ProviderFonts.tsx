"use client";

import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-hot-toast";

import { FontGlyph, FontMetric } from "@/libs/opentype/OTBase";
import { FontFeature } from "@/libs/opentype/OTFeature";
import { FontName } from "@/libs/opentype/OTName";
import { OTParser } from "@/libs/opentype/OTParser";
import { OTVarAxis, OTVarInstance } from "@/libs/opentype/OTVariable";
import { WeightClass, WidthClass } from "@/libs/opentype/os2";
import { ASYNC_TIMEOUT } from "@/libs/utils";

export type CustomFont = {
  names: FontName;
  glyphs: FontGlyph[];
  metrics: FontMetric;
  features?: FontFeature[];
  weight: number;
  width: number;
  italic: boolean;
  axes?: OTVarAxis[];
  instances?: OTVarInstance[];
};

type ContextFontsAttr = {
  isReadingOpentype: boolean;
  fonts?: CustomFont[];
};

const ContextFonts = createContext<ContextFontsAttr>(undefined!);
export function useFonts() {
  const fonts = useContext(ContextFonts);
  if (!fonts) throw new Error("Must be inside <ProviderFonts />");
  return fonts;
}

export const ConsumerFonts = ContextFonts.Consumer;

export default function ProviderFonts({
  children,
  files,
}: {
  children: ReactNode;
  files: File[];
}) {
  const [isReadingOpentype, setReadingOpentype] = useState(false);
  const [fonts, setFonts] = useState<CustomFont[]>();

  const parseOpentype = useCallback(async () => {
    if (!files || files.length <= 0) return;
    setReadingOpentype(true);

    const temp: CustomFont[] = [];
    const fontFaces: FontFace[] = [];

    for (const [_, file] of Array.from(files).entries()) {
      toast.loading(`Reading: ${file.name}`, { id: file.name });

      const font = OTParser.buffer(await file.arrayBuffer());
      const classification = font.classification.get();
      const names = font.name.get();
      const glyphs = font.glyph.get();
      const metrics = font.metric.get();
      const features = font.feature.get();
      const variable = font.variable.get();

      temp.push({
        names,
        glyphs,
        metrics,
        features,
        weight: classification.weight,
        width: classification.width,
        italic: classification.italicAngle !== 0,
        ...(variable && { axes: variable.axes }),
        ...(variable && { instances: variable.instances }),
      });

      // await ASYNC_TIMEOUT(500);
      // End of opentype parser
      toast.success(`Reading: ${file.name}`, { id: file.name });

      // console.log(metrics);

      /**
       * Begin contructing binary for DOM installation
       */
      const varWidth =
        variable && variable.axes.find((item) => item.tag === "wdth");
      const varWeight =
        variable && variable.axes.find((item) => item.tag === "wght");

      fontFaces.push(
        new FontFace(names.fontFamily, await file.arrayBuffer(), {
          display: "block",
          style: classification.italicAngle !== 0 ? "italic" : "normal",
          weight: varWeight
            ? Object.values([
                varWeight.minValue.toString(),
                varWeight.maxValue.toString(),
              ]).join(" ")
            : classification.weight.toString(),
          stretch: varWidth
            ? Object.values([
                `${varWidth.minValue}%`,
                `${varWidth.maxValue}%`,
              ]).join(" ")
            : WidthClass[classification.width].percentOfNormal + "%",
        }),
      );
    }

    // Install font to the DOM
    for (const face of fontFaces.sort(
      (a, b) => Number(a.weight) - Number(b.weight),
    )) {
      // await ASYNC_TIMEOUT(500);
      toast.loading(`Installing: ${face.family} to the DOM.`, {
        id: face.weight,
      });

      face.load().then(
        (font) => {
          document.fonts.add(face);
          toast.success(`Installing: ${font.family} to the DOM.`, {
            id: font.weight,
          });
          return;
        },
        (err) => {
          console.error(err);
          toast.error(`Installing: ${face.family} to the DOM. ${err.message}`, {
            id: face.weight,
            duration: 10000,
          });
        },
      );
    }

    setFonts(
      temp
        .sort((a, b) => a.weight - b.weight)
        .sort((a, b) => a.width - b.width)
        .sort((a, b) => Number(a.italic) - Number(b.italic)),
    );
    setReadingOpentype(false);
    return temp;
  }, [files]);

  useEffect(() => {
    if (!files || files.length <= 0) return;
    parseOpentype();
  }, [files]);

  return (
    <ContextFonts.Provider value={{ fonts, isReadingOpentype }}>
      {children}
    </ContextFonts.Provider>
  );
}
