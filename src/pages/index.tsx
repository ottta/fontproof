import type { CSSProperties } from "react";
import { useMemo, useState } from "react";
import { MouseParallaxContainer, MouseParallaxChild } from "react-parallax-mouse";
import { useTheme } from "next-themes";
import Head from "next/head";

import { isValidUrl } from "@/libs/helpers";
import useOpentypeData from "@/hooks/use-opentype-data";
import useFont from "@/hooks/use-font";

import Grid from "@/components/Grid";
import Layout from "@/components/Layout";
import SectionHeader from "@/components/SectionHeader";
import WebComp from "@/components/WebComp";

function Interpolation() {
    const { fonts } = useOpentypeData();
    const romans = fonts.filter((item) => item.names.italicAngle === 0);
    const italics = fonts.filter((item) => item.names.italicAngle !== 0);
    const [state, setState] = useState(false);
    const bahan = useMemo(() => {
        return state ? italics : romans;
    }, [state, romans, italics]);
    const { resolvedTheme } = useTheme();
    const isDark = !!(resolvedTheme && resolvedTheme === "dark");
    return (
        <div
            onClick={() => italics.length !== 0 && setState((prev) => !prev)}
            style={{ position: "relative", marginBottom: -1 }}
        >
            <SectionHeader>
                <div style={{ fontSize: "2em" }}>Interpolation</div>
            </SectionHeader>
            <div
                style={{
                    position: "absolute",
                    bottom: "calc(var(--grid-unit) - 1px)",
                    left: "50%",
                    transform: "translate(-50%, 50%)",
                    width: "0.5em",
                    height: "0.5em",
                    backgroundColor: "var(--accents-10)",
                    borderRadius: "100%"
                }}
            />
            <MouseParallaxContainer
                resetOnLeave
                inverted
                containerStyle={{
                    position: "relative",
                    width: "100%",
                    height: "calc(var(--grid-unit) * 10)",
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    gap: "2em"
                }}
            >
                {bahan.reverse().map((item, i) => {
                    const length = romans.length;
                    const { names } = item;
                    const { fontFace, postScriptName } = names;
                    const { fontStretch, fontStyle, fontWeight } = fontFace;

                    const newIndex = i + 1;
                    const transformFactor = Number((newIndex / 10).toFixed(1));
                    const colorInterpolation = Number((length - newIndex) / (length - 1)).toFixed(
                        2
                    );

                    return (
                        <MouseParallaxChild
                            key={i}
                            factorX={transformFactor}
                            factorY={transformFactor}
                            style={{
                                transform: "translate(-50%, -50%)",
                                position: "absolute",
                                top: "50%",
                                left: "50%"
                            }}
                        >
                            <div
                                style={{
                                    fontFamily: postScriptName,
                                    fontWeight: fontWeight.value,
                                    fontStretch: `${fontStretch.percentOfNormal}%`,
                                    fontStyle: fontStyle,
                                    fontSize: "15vw",
                                    WebkitTextStroke: 1,
                                    WebkitTextStrokeColor: "var(--grid-color)",
                                    WebkitTextFillColor: isDark
                                        ? `hsla(109, 10%, 32%, ${colorInterpolation})`
                                        : `hsla(70, 100%, 50%, ${colorInterpolation})`,
                                    whiteSpace: "nowrap",
                                    userSelect: "none"
                                }}
                            >
                                OHno
                            </div>
                            <div
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: "50%",
                                    transform: "translate(-50%, -100%)",
                                    fontFamily: "monospace",
                                    whiteSpace: "nowrap"
                                }}
                            >
                                {fontWeight.value} | {fontStretch.percentOfNormal}%
                            </div>
                        </MouseParallaxChild>
                    );
                })}
            </MouseParallaxContainer>
        </div>
    );
}

function genCSS(valid?: boolean): CSSProperties {
    return {
        color: valid ? "currentcolor" : "red",
        pointerEvents: valid ? "initial" : "none",
        textDecoration: valid ? "underline" : "line-through"
    };
}

const tdStyle: CSSProperties = {
    fontSize: "0.75em",
    cursor: "pointer"
};

export default function Home() {
    const { fonts } = useOpentypeData();
    const { chooseFont, font } = useFont();
    const fontsIsEven = !!(fonts.length % 2);
    return (
        <>
            <Head>
                <title>Fontproof by Unforma Club</title>
                <meta name="description" content="Font proofing tools" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Layout>
                <Grid direction="horizontal" paddingInline>
                    <Grid direction="vertical" style={{ minHeight: "100vh" }}>
                        <Interpolation />
                        <div>
                            <SectionHeader>
                                <div style={{ fontSize: "2em" }}>Font List</div>
                            </SectionHeader>

                            <div
                                style={{
                                    backgroundColor: "var(--accents-1)",
                                    // marginBottom: fontsIsEven
                                    //     ? "calc(var(--grid-unit) - 0px)"
                                    //     : "calc(var(--grid-unit) / 2)",
                                    marginTop: -1
                                }}
                            >
                                <table
                                    style={{
                                        border: "1px solid var(--grid-color)",
                                        marginBottom: -1
                                    }}
                                >
                                    <thead>
                                        <tr>
                                            <th align="left">Index</th>
                                            <th align="left">Family</th>
                                            <th align="left">Sub Family</th>
                                            <th align="left">Font Weight</th>
                                            <th align="left">Font Stretch</th>
                                            <th align="left">Designer(s)</th>
                                            <th align="left">Manufacturer</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {font &&
                                            fonts.map((item, i) => {
                                                const onClick = () =>
                                                    chooseFont(item.names.postScriptName);
                                                return (
                                                    <tr
                                                        key={i}
                                                        data-active={
                                                            font.names.postScriptName ===
                                                            item.names.postScriptName
                                                        }
                                                    >
                                                        <td
                                                            onClick={onClick}
                                                            style={tdStyle}
                                                            align="center"
                                                        >
                                                            {i + 1}
                                                        </td>
                                                        <td onClick={onClick} style={tdStyle}>
                                                            {item.names.family}
                                                        </td>
                                                        <td
                                                            onClick={onClick}
                                                            style={{
                                                                fontFamily:
                                                                    item.names.postScriptName,
                                                                ...tdStyle
                                                            }}
                                                        >
                                                            {item.names.fontSubFamily}
                                                        </td>
                                                        <td
                                                            onClick={onClick}
                                                            style={{
                                                                ...tdStyle,
                                                                fontWeight:
                                                                    item.names.fontFace.fontWeight
                                                                        .value
                                                            }}
                                                        >
                                                            {item.names.fontFace.fontWeight.value} —{" "}
                                                            {
                                                                item.names.fontFace.fontWeight
                                                                    .description
                                                            }
                                                        </td>
                                                        <td onClick={onClick} style={tdStyle}>
                                                            {
                                                                item.names.fontFace.fontStretch
                                                                    .percentOfNormal
                                                            }
                                                            % —{" "}
                                                            {
                                                                item.names.fontFace.fontStretch
                                                                    .description
                                                            }
                                                        </td>
                                                        <td>
                                                            <a
                                                                href={item.names.designerUrl}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                style={{
                                                                    ...tdStyle,
                                                                    ...genCSS(
                                                                        isValidUrl(
                                                                            item.names
                                                                                .designerUrl || ""
                                                                        )
                                                                    )
                                                                }}
                                                            >
                                                                {item.names.designer}
                                                            </a>
                                                        </td>
                                                        <td>
                                                            <a
                                                                href={item.names.manufacturerUrl}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                style={{
                                                                    ...tdStyle,
                                                                    ...genCSS(
                                                                        isValidUrl(
                                                                            item.names
                                                                                .manufacturerUrl ||
                                                                                ""
                                                                        )
                                                                    )
                                                                }}
                                                            >
                                                                {item.names.manufacturer}
                                                            </a>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <WebComp />
                    </Grid>
                </Grid>
            </Layout>
        </>
    );
}
