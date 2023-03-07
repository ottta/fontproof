import useFont from "@/hooks/use-font";
import { BASIC_CHARACTERS } from "@/libs/text-proof";
import textProof from "@/libs/text-proof.json";
import FontSelector from "../FontSelector";

export default function ProofText() {
    const { font } = useFont();
    return (
        <div
            style={{
                padding: "var(--grid-unit) 0"
            }}
        >
            <div
                style={{
                    // height: "calc(var(--grid-unit) * 10)",
                    backgroundColor: "var(--accents-1)",
                    border: "1px solid var(--grid-color)",
                    padding: "var(--grid-unit)",
                    display: "grid",
                    gridTemplateColumns: "1fr 4fr",
                    gap: "var(--site-padding)"
                }}
            >
                <aside>
                    <div style={{ position: "sticky", top: 0, padding: "var(--grid-unit) 0" }}>
                        <FontSelector />
                    </div>
                </aside>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "var(--grid-unit)",
                        fontFamily: `"${font.names.postScriptName}", Times New Roman`,
                        fontWeight: font.names.fontFace.fontWeight.value,
                        fontStyle: font.names.fontFace.fontStyle,
                        fontStretch: `${font.names.fontFace.fontStretch.percentOfNormal}%`,
                        // whiteSpace: "pre-wrap",
                        wordBreak: "break-all"
                    }}
                >
                    <div
                        // dangerouslySetInnerHTML={{ __html: textProof.Spacing["basic-set"] }}
                        style={{ fontSize: "5vw" }}
                    >
                        {BASIC_CHARACTERS.join("")}
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: textProof.Spacing.spacing }} />
                    <div dangerouslySetInnerHTML={{ __html: textProof.Kerning.kerning }} />
                    <div dangerouslySetInnerHTML={{ __html: textProof.Kerning.furniture }} />
                    <div dangerouslySetInnerHTML={{ __html: textProof.Kerning.trio }} />
                </div>
            </div>
        </div>
    );
}
