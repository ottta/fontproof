import { createContext, PropsWithChildren } from "react";

type ProviderGlyphProps = PropsWithChildren<{}>;

export const ContextGlyph = createContext(undefined!);
export default function ProviderGlyph(props: ProviderGlyphProps) {
    const { children } = props;
    return <ContextGlyph.Provider value={undefined!}>{children}</ContextGlyph.Provider>;
}
