import Grid from "@/components/Grid";
import Layout from "@/components/Layout";
import useFont from "@/hooks/use-font";
import useOpentypeData from "@/hooks/use-opentype-data";

export default function Page() {
    const { fonts } = useOpentypeData();
    const { font, chooseFont } = useFont();
    return (
        <Layout>
            <Grid direction="horizontal" paddingInline>
                <Grid direction="vertical" style={{ minHeight: "100vh" }}>
                    {font && (
                        <>
                            <div>
                                <select
                                    value={font.names.postScriptName}
                                    onChange={(e) => chooseFont(e.target.value)}
                                >
                                    {fonts.map((item, i) => (
                                        <option key={i} value={item.names.postScriptName}>
                                            {item.names.fullName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div
                                style={{
                                    fontFamily: font.names.postScriptName,
                                    fontSize: "10vw",
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                    textAlign: "center",
                                    lineHeight: 1,
                                    whiteSpace: "nowrap"
                                }}
                            >
                                {font.names.family}
                            </div>
                        </>
                    )}
                </Grid>
            </Grid>
        </Layout>
    );
}
