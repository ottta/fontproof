import type { PropsWithChildren } from "react";
import type { IFont } from "@/types/font";
import { createContext, useCallback, useEffect, useState } from "react";
import useOpentypeData from "@/hooks/use-opentype-data";

type ContextFontAttr = {
    font: IFont;
    chooseFont: (candidate: string) => void;
};
type ProviderFontProps = PropsWithChildren<{}>;

export const ContextFont = createContext<ContextFontAttr>(undefined!);
export default function ProviderFont(props: ProviderFontProps) {
    const { children } = props;
    const { fonts } = useOpentypeData();
    const [font, setFont] = useState<IFont>(fonts[0]);

    const chooseFont = useCallback(
        (candidate: string) => {
            const findOne = fonts.find((item) => item.names.postScriptName === candidate);
            if (!findOne) return setFont(fonts[0]);
            return setFont(findOne);
        },
        [fonts]
    );

    useEffect(() => {
        setFont(fonts[0]);
    }, [fonts]);

    return <ContextFont.Provider value={{ font, chooseFont }}>{children}</ContextFont.Provider>;
}