type BaseGlyphMetric = {
    x: number;
    y: number;
    value: number;
};

type GlyphMetricProps = BaseGlyphMetric & {
    label:
        | "cap-height"
        | "x-height"
        | "baseline"
        | "ascender"
        | "descender"
        | "typo-ascender"
        | "typo-descender"
        | "win-ascent"
        | "win-descent"
        | "yMax"
        | "yMin";
};

type GlyphSideBearingProps = BaseGlyphMetric & {
    position: "left" | "right";
};

type GlyphWidthInfoProps = BaseGlyphMetric & {};

export function GlyphVerticalMetric(props: GlyphMetricProps) {
    const { x, y, value, label } = props;
    const isBaseline = label === "baseline";
    const isDescender = label === "descender";
    const isAccent = isBaseline || label === "x-height";
    const isBelowXHeight =
        label !== "baseline" &&
        label !== "descender" &&
        label !== "typo-descender" &&
        label !== "win-descent" &&
        label !== "yMin";
    return (
        <g name={label}>
            <line
                x1={0}
                x2={x}
                y1={y}
                y2={y}
                strokeWidth={1}
                stroke={isAccent ? "var(--accents-12)" : "var(--grid-color)"}
                strokeDasharray={label === "x-height" ? "1 1" : "0 0"}
            />

            <text
                x={3}
                y={isBaseline || isDescender ? y + 0 : y - 0}
                fill="var(--grid-color)"
                style={{ fontFeatureSettings: `"tnum"` }}
            >
                <tspan
                    alignmentBaseline={isBelowXHeight ? "before-edge" : "after-edge"}
                    fontSize={10}
                    textAnchor="start"
                    style={{ textTransform: "capitalize" }}
                >
                    {label.split("-").join(" ")}
                </tspan>
                <tspan
                    alignmentBaseline={isBelowXHeight ? "before-edge" : "after-edge"}
                    fontSize={10}
                    textAnchor="end"
                    x={x - 3}
                >
                    {value}
                </tspan>
            </text>
        </g>
    );
}

export function GlyphSideBearing(props: GlyphSideBearingProps) {
    const { x, y, value, position } = props;
    return (
        <g>
            <line
                x1={x}
                x2={x}
                y1={0}
                y2={y}
                stroke="var(--grid-color)"
                strokeWidth={1}
                strokeDasharray="1 1"
            />
            <text
                x={position === "left" ? x - 5 : x + 5}
                y={y - 20}
                fill="var(--grid-color)"
                style={{ fontFeatureSettings: `"tnum"` }}
            >
                <tspan
                    alignmentBaseline="after-edge"
                    fontSize={10}
                    textAnchor={position === "left" ? "end" : "start"}
                >
                    {value}
                </tspan>
            </text>
        </g>
    );
}

export function GlyphWidthInfo(props: GlyphWidthInfoProps) {
    const { x, y, value } = props;
    return (
        <g>
            <text
                x={x}
                y={y - 20}
                fill="var(--grid-color)"
                fontFamily="inherit"
                style={{ fontFeatureSettings: `"tnum"` }}
            >
                <tspan alignmentBaseline="after-edge" fontSize={10} textAnchor="middle">
                    {value}
                </tspan>
            </text>
        </g>
    );
}
