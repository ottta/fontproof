import type { IGlyph } from "@/types/glyphs";

import type { Dispatch, PropsWithChildren, SetStateAction } from "react";
import {
  createContext,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState
} from "react";

import useFont from "@/hooks/use-font";

type ProviderGlyphProps = PropsWithChildren<{}>;

type ContextGlyphAttr = {
  selectedGlyphs: IGlyph[];
  setSelectedGlyphs: Dispatch<SetStateAction<IGlyph[]>>;
  reservedGlyphs: IGlyph[];
  setReservedGlyphs: Dispatch<SetStateAction<IGlyph[]>>;
  chooseSelected: (nGlyph: IGlyph[]) => void;
  chooseReserved: (nGlyph: IGlyph[]) => void;
};

export const ContextGlyph = createContext<ContextGlyphAttr>(undefined!);

export default function ProviderGlyph(props: ProviderGlyphProps) {
  const { children } = props;
  const { font } = useFont();

  const clh = useMemo(() => {
    if (!font) return [];
    const glyphs = font.glyphs.filter((item) => item.unicode?.hex === "0048");
    return glyphs;
  }, [font]);

  const [reservedGlyphs, setReservedGlyphs] = useState<IGlyph[]>(clh);
  const [selectedGlyphs, setSelectedGlyphs] = useState<IGlyph[]>(clh);

  const freezeGlyph = useRef(font.glyphs);

  const chooseSelected = useCallback(
    (nGlyph: IGlyph[]) => {
      if (freezeGlyph.current !== font.glyphs) {
        freezeGlyph.current = font.glyphs;
        setSelectedGlyphs(nGlyph);
      } else {
        setSelectedGlyphs(
          freezeGlyph.current.filter(
            (item) => item.unicode?.hex === nGlyph[0].unicode?.hex
          )
        );
      }
    },
    [font.glyphs]
  );
  const chooseReserved = useCallback(
    (nGlyph: IGlyph[]) => {
      if (freezeGlyph.current !== font.glyphs) {
        freezeGlyph.current = font.glyphs;
        setReservedGlyphs(nGlyph);
      } else {
        setReservedGlyphs(
          freezeGlyph.current.filter(
            (item) => item.unicode?.hex === nGlyph[0].unicode?.hex
          )
        );
      }
    },
    [font.glyphs]
  );

  useLayoutEffect(() => {
    if (reservedGlyphs.length > 0) {
      setSelectedGlyphs(
        font.glyphs.filter(
          (item) => item.unicode?.hex === reservedGlyphs[0].unicode?.hex
        )
      );
    } else {
      setSelectedGlyphs(clh);
    }
  }, [font.glyphs, reservedGlyphs, clh]);

  return (
    <ContextGlyph.Provider
      value={{
        reservedGlyphs,
        selectedGlyphs,
        setSelectedGlyphs,
        setReservedGlyphs,
        chooseReserved,
        chooseSelected
      }}
    >
      {children}
    </ContextGlyph.Provider>
  );
}
