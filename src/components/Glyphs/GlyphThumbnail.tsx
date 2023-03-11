import useFont from "@/hooks/use-font";
import useGlyph from "@/hooks/use-glyph";

export default function GlyphThumbnail() {
    const { font } = useFont();
    const { glyphs } = font;
    const { setSelectedGlyphs, selectedGlyphs, reservedGlyphs, setReservedGlyphs } = useGlyph();

    const blockKeys = Object.values(
        glyphs.filter((item) => item.unicode?.block).map((item) => item.unicode.block)
    );
    const uniqueBlocks = blockKeys.reduce(
        (a: (string | undefined)[], b) => (a.includes(b) ? a : [...a, b]),
        []
    ); // Blocks[]

    const groupByBlocks = uniqueBlocks.map((block) => ({
        block,
        glyphs: glyphs
            .filter((item) => item.unicode?.block === block)
            .sort((a, b) => (a.unicode.hex ? a.unicode.hex.localeCompare(b.unicode.hex!) : -1))
    }));

    return (
        <ul
            style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                gridColumnStart: "calc(var(--grid-division)/4 + 3)",
                gridColumnEnd: "calc(var(--grid-division) + 1)",
                display: "flex",
                flexDirection: "column",
                gap: "var(--grid-unit)"
            }}
        >
            {groupByBlocks.map((item, i) => (
                <li key={i}>
                    <div
                        style={{
                            height: "var(--grid-unit)",
                            display: "flex",
                            alignItems: "center",
                            paddingInline: "var(--site-padding)"
                        }}
                    >
                        <div>{item.block}</div>
                    </div>

                    <ul
                        onMouseLeave={() => setSelectedGlyphs(reservedGlyphs)}
                        style={{
                            listStyle: "none",
                            padding: 0,
                            margin: 0,
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(calc(var(--grid-division) - (var(--grid-division) / 4 + 2)),1fr)"
                        }}
                    >
                        {item.glyphs.map((glyph, iG) => {
                            const isActive = selectedGlyphs[0]?.id === glyph.id;
                            return (
                                <li
                                    key={iG}
                                    onMouseOver={() => setSelectedGlyphs([glyph])}
                                    onClick={() => setReservedGlyphs([glyph])}
                                    style={{
                                        aspectRatio: 1,
                                        overflow: "hidden",
                                        position: "relative",
                                        backgroundColor: isActive ? "var(--grid-color)" : "initial"
                                    }}
                                >
                                    <div
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center"
                                        }}
                                    >
                                        <svg
                                            viewBox={glyph.svg.viewBox}
                                            width="100%"
                                            height="100%"
                                            transform="scale(0.5)"
                                        >
                                            <path d={glyph.svg.path} />
                                        </svg>
                                    </div>

                                    <div
                                        style={{
                                            height: "20%",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            width: "100%",
                                            paddingInline: "0.25em",
                                            flexShrink: 0,
                                            paddingTop: 1,
                                            userSelect: "none",
                                            pointerEvents: "none",
                                            position: "absolute",
                                            bottom: "calc(var(--site-padding) / 3)"
                                        }}
                                    >
                                        <div
                                            style={{
                                                fontSize: 8,
                                                textAlign: "center"
                                            }}
                                        >
                                            {glyph.unicode?.hex || glyph.name}
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </li>
            ))}
        </ul>
    );
}
