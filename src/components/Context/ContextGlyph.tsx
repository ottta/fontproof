import type { PropsWithChildren, Dispatch, SetStateAction } from "react";
import type { IGlyph } from "@/types/glyphs";

import { createContext, useState, useEffect } from "react";
import useFont from "@/hooks/use-font";

type ProviderGlyphProps = PropsWithChildren<{}>;

type ContextGlyphAttr = {
    selectedGlyphs: IGlyph[];
    setSelectedGlyphs: Dispatch<SetStateAction<IGlyph[]>>;
    reservedGlyphs: IGlyph[];
    setReservedGlyphs: Dispatch<SetStateAction<IGlyph[]>>;
};

export const ContextGlyph = createContext<ContextGlyphAttr>(undefined!);

export default function ProviderGlyph(props: ProviderGlyphProps) {
    const { children } = props;
    const { font } = useFont();

    const [reservedGlyphs, setReservedGlyphs] = useState<IGlyph[]>([]);
    const [selectedGlyphs, setSelectedGlyphs] = useState<IGlyph[]>([]);

    useEffect(() => {
        if (!font) return;
        const capitalLetterH = font?.glyphs.filter((item) => item.unicode?.hex === "0048");
        setSelectedGlyphs(capitalLetterH);
        setReservedGlyphs(capitalLetterH);
    }, [font]);

    return (
        <ContextGlyph.Provider
            value={{ reservedGlyphs, selectedGlyphs, setSelectedGlyphs, setReservedGlyphs }}
        >
            {children}
        </ContextGlyph.Provider>
    );
}
