import ProviderGlyph from "@/components/Context/ContextGlyph";
import FontSelector from "@/components/FontSelector";
import GlyphPreview from "@/components/Glyphs/GlyphPreview";
import GlyphThumbnail from "@/components/Glyphs/GlyphThumbnail";
import Grid from "@/components/Grid";
import Layout from "@/components/Layout";
import ProofText from "@/components/Proofs/ProofText";
import SectionHeader from "@/components/SectionHeader";
import useFont from "@/hooks/use-font";
import useOpentypeData from "@/hooks/use-opentype-data";
import { BASIC_CHARACTERS } from "@/libs/text-proof";
import texts from "@/libs/text-proof.json";

export default function Page() {
    const { fonts } = useOpentypeData();
    const { font } = useFont();
    return (
        <Layout>
            <ProviderGlyph>
                <Grid direction="horizontal" paddingInline>
                    <Grid direction="vertical" style={{ minHeight: "100vh" }}>
                        {font && fonts.length !== 0 && (
                            <>
                                <div>
                                    <SectionHeader>
                                        <div>
                                            <div style={{ fontSize: "2em", lineHeight: 1 }}>
                                                Glyphs List
                                            </div>
                                            {font && (
                                                <div
                                                    style={{
                                                        fontFamily: "var(--font-default)",
                                                        fontSize: "0.75em"
                                                    }}
                                                >
                                                    {font.glyphs.length} glyphs —{" "}
                                                    {
                                                        font.glyphs.filter((item) => item.unicode)
                                                            .length
                                                    }{" "}
                                                    characters
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <FontSelector />
                                        </div>
                                    </SectionHeader>

                                    <div
                                        style={{
                                            display: "grid",
                                            gridTemplateColumns:
                                                "repeat(var(--grid-division),minmax(var(--grid-unit),1fr))"
                                        }}
                                    >
                                        <GlyphPreview />
                                        <GlyphThumbnail />
                                    </div>
                                </div>

                                <div>
                                    <SectionHeader>
                                        <div style={{ fontSize: "2em" }}>Specimens</div>
                                        <div>
                                            <FontSelector />
                                        </div>
                                    </SectionHeader>

                                    <div>
                                        <ProofText
                                            title="Basic Characters"
                                            text={BASIC_CHARACTERS.join("")}
                                            defaultFontSize={56}
                                        />
                                        <ProofText
                                            title="Hamburgedfontstiv"
                                            text={texts.Hamburgers.hamburgedfontsiv}
                                            defaultFontSize={56}
                                        />
                                        <ProofText
                                            title="Hamburgedfontstiv Spacing"
                                            text={texts.Hamburgers["hamburged-spacing"]}
                                            defaultFontSize={16}
                                        />
                                        <ProofText
                                            title="Hamburgedfontstiv Trio"
                                            text={texts.Hamburgers["hamburged-trio"]}
                                            defaultFontSize={16}
                                        />
                                    </div>
                                </div>
                            </>
                        )}
                    </Grid>
                </Grid>
            </ProviderGlyph>
        </Layout>
    );
}
