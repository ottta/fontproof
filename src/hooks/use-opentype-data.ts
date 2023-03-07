import { useContext } from "react";
import { ContextOpentype } from "@/components/ContextOpentype";

export default function useOpentypeData() {
    const fonts = useContext(ContextOpentype);
    if (!fonts) throw new Error("Must be inside <ProviderOpentype />");
    return fonts;
}
