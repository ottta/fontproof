import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { FontGlyph } from "@/libs/opentype/OTBase";

type TupleGlyph = [sub: FontGlyph, by?: FontGlyph];

type ContextGlyphViewAttr = {
  view: TupleGlyph;
  setView: Dispatch<SetStateAction<TupleGlyph>>;
  reserved: TupleGlyph;
  setReserved: Dispatch<SetStateAction<TupleGlyph>>;
};

const ContextGlyphView = createContext<ContextGlyphViewAttr>(undefined!);

export function useGlyphView() {
  const glyphs = useContext(ContextGlyphView);
  if (!glyphs) throw new Error("Must be inside <ProviderGlyphView />");
  return glyphs;
}

export default function ProviderGlyphView({
  children,
  initial,
}: {
  children: ReactNode;
  initial: TupleGlyph;
}) {
  const [view, setView] = useState<TupleGlyph>(initial);
  const [reserved, setReserved] = useState<TupleGlyph>(initial);
  useEffect(() => void setView(initial), [initial]);
  useEffect(() => void setReserved(initial), [initial]);
  return (
    <ContextGlyphView.Provider value={{ reserved, setReserved, view, setView }}>
      {children}
    </ContextGlyphView.Provider>
  );
}
