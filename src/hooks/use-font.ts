import { useContext } from "react";
import { ContextFont } from "@/components/ContextFont";

export default function useFont() {
    const font = useContext(ContextFont);
    if (!font) throw new Error("Must be inside <ProviderFont />");
    return font;
}
