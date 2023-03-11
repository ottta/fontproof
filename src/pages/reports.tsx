import type { IUnicodeData } from "@/types/unicode";
import { useCallback, useEffect, useState } from "react";
import GFLatinUnicode from "@/libs/GF-Latin-Unicode.json";
import generateUnicodeData from "@/libs/helper/generateUnicodeData";
import useFont from "@/hooks/use-font";
import Grid from "@/components/Grid";
import Layout from "@/components/Layout";
import SectionHeader from "@/components/SectionHeader";

export default function Page() {
    const { font } = useFont();
    const [missingUnicodes, setMissingUnicodes] = useState<IUnicodeData[]>([]);

    const getMissingGlyphs = useCallback(async () => {
        if (!font) return;

        const unicodes = font.glyphs
            .filter((item) => item.unicode?.codePoint)
            .map((item) => {
                return (
                    "0x" +
                    `${("0000" + item.unicode.codePoint?.toString(16)).slice(-4)}`.toUpperCase()
                );
            });

        const complete = GFLatinUnicode.filter(
            (item) => !unicodes.includes(item.split(" ")[0])
        ).map((item) => item.split(" ")[0].replace("0x", ""));

        const missedChars = await generateUnicodeData(complete);
        setMissingUnicodes(missedChars);
    }, [font]);

    useEffect(() => {
        getMissingGlyphs();
    }, [font]);

    return (
        <Layout>
            <Grid direction="horizontal" paddingInline>
                <Grid direction="vertical" style={{ minHeight: "100vh" }}>
                    {missingUnicodes.length !== 0 ? (
                        <div>
                            <SectionHeader>
                                <div style={{ fontSize: "2em" }}>
                                    Missing [{missingUnicodes.length} glyph(s)]
                                </div>
                            </SectionHeader>

                            <table
                                style={{
                                    backgroundColor: "var(--accents-1)",
                                    borderInline: "1px solid var(--grid-color)"
                                }}
                            >
                                <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th align="left">Character Name</th>
                                        <th align="left">Block</th>
                                        <th>Glyph</th>
                                        <th>Code Point</th>
                                        <th>Hex Code</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {missingUnicodes.map((item, i) => (
                                        <tr key={i}>
                                            <td align="center">{i + 1}</td>
                                            <td style={{ fontSize: "0.75em" }}>{item.name}</td>
                                            <td style={{ fontSize: "0.75em" }}>{item.block}</td>
                                            <td align="center">
                                                {String.fromCharCode(item.codePoint!)}
                                            </td>
                                            <td align="center">{item.codePoint!}</td>
                                            <td
                                                align="center"
                                                style={{ fontFeatureSettings: `"tnum"` }}
                                            >
                                                {item.hex!}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div>Font files covering all basic latin</div>
                    )}
                </Grid>
            </Grid>
        </Layout>
    );
}
