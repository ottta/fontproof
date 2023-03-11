import { useEffect, useState } from "react";
import useFont from "@/hooks/use-font";

type ProofTextProps = {
    title: string;
    text: string;
    defaultFontSize?: number;
    defaultLineHeight?: number;
};

export default function ProofText(props: ProofTextProps) {
    const { text, defaultFontSize = 16, defaultLineHeight = 1.2, title } = props;
    const { font } = useFont();
    const [fontFamily, setFontFamily] = useState(font.names.postScriptName);
    const [fontSize, setFontSize] = useState(defaultFontSize);

    useEffect(() => {
        setFontFamily(font.names.postScriptName);
    }, [font]);

    return (
        <div>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(var(--grid-division),minmax(var(--grid-unit),1fr))",
                    marginBottom: -1
                }}
            >
                <aside
                    style={{
                        gridColumnStart: 1,
                        gridColumnEnd: "span calc(var(--grid-division)/4 + 2)",
                        padding: "var(--site-padding)"
                    }}
                >
                    <div
                        style={{
                            position: "sticky",
                            top: "calc(var(--grid-unit) + var(--site-padding))",
                            padding: "var(--site-padding)",
                            backgroundColor: "var(--accents-1)",
                            border: "1px solid var(--grid-color)",
                            boxShadow: "0 0 1em -0.25em var(--grid-color)"
                        }}
                    >
                        <div>
                            <div style={{ fontFeatureSettings: `"tnum"` }}>
                                {fontSize}px – {fontSize * 0.75}pt
                            </div>
                            <input
                                type="range"
                                min={8}
                                max={96}
                                step={2}
                                value={fontSize}
                                onChange={(e) => setFontSize(e.target.valueAsNumber)}
                            />
                        </div>
                    </div>
                </aside>

                <div
                    style={{
                        padding: "var(--site-padding)",
                        gridColumnStart: "calc(var(--grid-division)/4 + 3)",
                        gridColumnEnd: "calc(var(--grid-division) + 1)"
                    }}
                >
                    <div
                        style={{
                            position: "relative",
                            display: "flex",
                            flexDirection: "column",
                            gap: "var(--grid-unit)",
                            fontFamily: `"${fontFamily}", Times New Roman`,
                            wordBreak: "break-word",
                            overflow: "hidden",
                            // aspectRatio: "620/877", // A4 Paper Size
                            aspectRatio: "877/620", // A4 Paper Size
                            boxShadow: "0 0 1em -0.25em var(--grid-color)",
                            padding: "calc(var(--grid-unit) * 1.5) var(--grid-unit)",
                            backgroundColor: "var(--accents-1)",
                            border: "1px solid var(--grid-color)"
                        }}
                    >
                        <div
                            style={{
                                position: "absolute",
                                top: 0,
                                left: "var(--grid-unit)",
                                right: "var(--grid-unit)",
                                height: "var(--grid-unit)",
                                display: "flex",
                                alignItems: "flex-end",
                                justifyContent: "space-between"
                            }}
                        >
                            <div>{fontFamily}</div>
                            <div style={{ fontSize: "0.75em" }}>
                                {fontSize}px – {fontSize * 0.75}pt
                            </div>
                        </div>

                        <div style={{ fontSize }} dangerouslySetInnerHTML={{ __html: text }} />

                        <div
                            style={{
                                position: "absolute",
                                bottom: 0,
                                left: "var(--grid-unit)",
                                right: "var(--grid-unit)",
                                height: "var(--grid-unit)",
                                display: "flex",
                                alignItems: "flex-start"
                            }}
                        >
                            <div>
                                &copy;{font.names.manufacturer || font.names.designer || "Unknown"}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
