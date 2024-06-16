import { CustomFont, useFonts } from "./ProviderFonts";

import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type ContextFontAttr = {
  font?: CustomFont;
  chooseFont: (postScriptName: string) => void;
};

const ContextFont = createContext<ContextFontAttr>(undefined!);
export function useFont() {
  const font = useContext(ContextFont);
  if (!font) throw new Error("Must be inside <ProviderFont />");
  return font;
}

export default function ProviderFont({ children }: { children: ReactNode }) {
  const { fonts } = useFonts();
  const [font, setFont] = useState(fonts ? fonts[0] : undefined);

  useEffect(() => {
    if (!fonts) return;
    setFont(fonts[0]);
  }, [fonts]);

  const chooseFont = useCallback(
    (postScriptName: string) => {
      if (!fonts) return;
      const selected = fonts.find(
        (item) => item.names.postScriptName === postScriptName,
      );
      if (!selected) return setFont(fonts[0]);
      return setFont(selected);
    },
    [fonts],
  );

  return (
    <ContextFont.Provider value={{ font, chooseFont }}>
      {children}
    </ContextFont.Provider>
  );
}
