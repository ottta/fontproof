import type { IFont } from "@/types/font";

import type { PropsWithChildren } from "react";
import { createContext, useCallback, useEffect, useState } from "react";

import useOpentypeData from "@/hooks/use-opentype-data";

type ContextFontAttr = {
  font: IFont;
  chooseFont: (candidate: string) => void;
};
type ProviderFontProps = PropsWithChildren<{ fonts?: IFont[] }>;

export const ContextFont = createContext<ContextFontAttr>(undefined!);

type ComponentProps = PropsWithChildren<{ fonts: IFont[] }>;
function Component(props: ComponentProps) {
  const { children, fonts } = props;
  const [font, setFont] = useState<IFont>(fonts[0]);

  const chooseFont = useCallback(
    (candidate: string) => {
      const findOne = fonts.find(
        (item) => item.names.postScriptName === candidate
      );
      if (!findOne) return setFont(fonts[0]);
      return setFont(findOne);
    },
    [fonts]
  );

  useEffect(() => {
    setFont(fonts[0]);
  }, [fonts]);

  return (
    <ContextFont.Provider value={{ font, chooseFont }}>
      {children}
    </ContextFont.Provider>
  );
}

export default function ProviderFont(props: ProviderFontProps) {
  const { children } = props;
  const { fonts } = useOpentypeData();
  if (!fonts || fonts.length === 0) return <div>No Fonts</div>;
  return <Component fonts={fonts}>{children}</Component>;
}
