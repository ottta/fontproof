import useGlyph from "@/hooks/use-glyph";
import { GlyphSideBearing, GlyphVerticalMetric, GlyphWidthInfo } from "./GlyphMetric";

type ListInfoProps = {
    title: string;
    value: string;
};
function ListInfo(props: ListInfoProps) {
    const { title, value } = props;
    return (
        <li style={{ display: "grid", gridTemplateColumns: "1fr 2fr" }}>
            <div
                style={{
                    fontSize: "0.75em",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                }}
            >
                {title}
            </div>
            <div
                style={{
                    fontSize: "0.75em",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                }}
            >
                {value}
            </div>
        </li>
    );
}

export default function GlyphPreview() {
    const { reservedGlyphs, selectedGlyphs } = useGlyph();
    const selectedGlyph = selectedGlyphs[0];

    return (
        <aside
            style={{
                gridColumnStart: 1,
                gridColumnEnd: "span calc(var(--grid-division)/4 + 2)"
            }}
        >
            <div
                style={{
                    position: "sticky",
                    top: "var(--grid-unit)"
                }}
            >
                <div
                    style={{
                        // border: "1px solid var(--grid-color)",
                        padding: "calc(var(--site-padding) / 1)"
                    }}
                >
                    <ul
                        style={{
                            listStyle: "none",
                            padding: 0,
                            margin: 0,
                            display: "grid",
                            gridTemplateColumns: `repeat(${selectedGlyphs.length}, 1fr)`,
                            backgroundColor: "var(--accents-1)",
                            border: "1px solid var(--grid-color)",
                            aspectRatio: "7/8",
                            alignItems: "center",
                            overflow: "hidden"
                        }}
                    >
                        {selectedGlyphs.map((item, i) => (
                            <li key={i}>
                                <div>
                                    <svg
                                        viewBox={item.svg.viewBox}
                                        width="100%"
                                        height="100%"
                                        // transform="scale(0.7)"
                                    >
                                        <g>
                                            <GlyphVerticalMetric
                                                label="yMax"
                                                value={item.svg.yMax.value}
                                                y={item.svg.yMax.coordinate}
                                                x={item.svg.boundingBox.width}
                                            />
                                            <GlyphVerticalMetric
                                                label="win-ascent"
                                                value={item.svg.winAscent.value}
                                                y={item.svg.winAscent.coordinate}
                                                x={item.svg.boundingBox.width}
                                            />
                                            <GlyphVerticalMetric
                                                label="typo-ascender"
                                                value={item.svg.typoAscender.value}
                                                y={item.svg.typoAscender.coordinate}
                                                x={item.svg.boundingBox.width}
                                            />
                                            <GlyphVerticalMetric
                                                label="ascender"
                                                value={item.svg.ascender.value}
                                                y={item.svg.ascender.coordinate}
                                                x={item.svg.boundingBox.width}
                                            />
                                            <GlyphVerticalMetric
                                                label="cap-height"
                                                value={item.svg.capHeight.value}
                                                y={item.svg.capHeight.coordinate}
                                                x={item.svg.boundingBox.width}
                                            />
                                            <GlyphVerticalMetric
                                                label="x-height"
                                                value={item.svg.xHeight.value}
                                                y={item.svg.xHeight.coordinate}
                                                x={item.svg.boundingBox.width}
                                            />
                                            <GlyphVerticalMetric
                                                label="baseline"
                                                value={item.svg.baseline.value}
                                                y={item.svg.baseline.coordinate}
                                                x={item.svg.boundingBox.width}
                                            />
                                            <GlyphVerticalMetric
                                                label="descender"
                                                value={item.svg.descender.value}
                                                y={item.svg.descender.coordinate}
                                                x={item.svg.boundingBox.width}
                                            />
                                            <GlyphVerticalMetric
                                                label="win-descent"
                                                value={item.svg.winDescent.value}
                                                y={item.svg.winDescent.coordinate}
                                                x={item.svg.boundingBox.width}
                                            />
                                            <GlyphVerticalMetric
                                                label="typo-descender"
                                                value={item.svg.typoDescender.value}
                                                y={item.svg.typoDescender.coordinate}
                                                x={item.svg.boundingBox.width}
                                            />
                                            <GlyphVerticalMetric
                                                label="yMin"
                                                value={item.svg.yMin.value}
                                                y={item.svg.yMin.coordinate}
                                                x={item.svg.boundingBox.width}
                                            />
                                        </g>
                                        <path d={item.svg.path} />

                                        <g>
                                            <GlyphSideBearing
                                                x={item.svg.leftSideBearing.coordinate}
                                                y={item.svg.boundingBox.height}
                                                value={item.svg.leftSideBearing.value || 0}
                                                position="left"
                                            />
                                            <GlyphSideBearing
                                                x={item.svg.rightSideBearing.coordinate}
                                                y={item.svg.boundingBox.height}
                                                value={item.svg.rightSideBearing.value || 0}
                                                position="right"
                                            />
                                        </g>

                                        <g>
                                            <GlyphWidthInfo
                                                x={item.svg.boundingBox.width / 2}
                                                y={item.svg.boundingBox.height}
                                                value={item.svg.advanceWidth}
                                            />
                                        </g>
                                    </svg>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {selectedGlyph && (
                    <div style={{ padding: "0 var(--site-padding)" }}>
                        <ul
                            style={{
                                listStyle: "none",
                                margin: 0,
                                padding: "0.75em",
                                backgroundColor: "var(--accents-1)",
                                border: "1px solid var(--grid-color)",
                                fontFeatureSettings: `"tnum"`,
                                fontWeight: 300,
                                display: "flex",
                                flexDirection: "column",
                                gap: "calc(var(--site-padding) / 2)"
                                // aspectRatio: "7/3"
                            }}
                        >
                            <ListInfo
                                title="Character Name"
                                value={selectedGlyph.unicode?.name || "-"}
                            />
                            <ListInfo title="Glyph Name" value={selectedGlyph.name || "-"} />
                            <ListInfo
                                title="Codepoint"
                                value={selectedGlyph.unicode.codePoint?.toString() || "-"}
                            />
                            <ListInfo title="Hex Code" value={selectedGlyph.unicode.hex || "-"} />
                            <ListInfo
                                title="Hex Code"
                                value={`&#${selectedGlyph.unicode.codePoint}`}
                            />
                            <ListInfo title="CSS (ISO)" value={`\\${selectedGlyph.unicode.hex}`} />
                            <ListInfo
                                title="Block"
                                value={selectedGlyph.unicode.block || "Unknown"}
                            />
                        </ul>
                    </div>
                )}
            </div>
        </aside>
    );
}
