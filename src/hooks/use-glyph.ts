import { useContext } from "react";
import { ContextGlyph } from "@/components/Context/ContextGlyph";

export default function useGlyph() {
    const glyph = useContext(ContextGlyph);
    if (!glyph) throw new Error("Must be inside <ProviderGlyph />");
    return glyph;
}
