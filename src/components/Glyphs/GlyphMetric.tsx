import { cn } from "@/libs/utils";

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
    | "hhea-ascender"
    | "hhea-descender"
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
    label !== "hhea-descender" &&
    label !== "typo-descender" &&
    label !== "win-descent" &&
    label !== "yMin";

  const isAboveXHeight =
    label === "x-height" ||
    label === "cap-height" ||
    label === "yMax" ||
    label === "win-ascent" ||
    label === "ascender" ||
    label === "typo-ascender" ||
    label === "hhea-ascender";

  const strokeWidth = 0.1;
  const yCoordinate = isAboveXHeight
    ? y + strokeWidth / 2
    : y - strokeWidth / 2;

  return (
    <g name={label}>
      <line
        x1={0}
        x2={x}
        y1={yCoordinate}
        y2={yCoordinate}
        strokeWidth={strokeWidth}
        strokeDasharray={label === "x-height" ? "0.3 0.3" : "0 0"}
        className={cn(isAccent ? "stroke-red-500" : "stroke-current")}
      />

      <text
        x={3}
        y={isBaseline || isDescender ? y + 0 : y - 0}
        style={{ fontFeatureSettings: `"tnum"` }}
      >
        <tspan
          alignmentBaseline={isBelowXHeight ? "before-edge" : "after-edge"}
          fontSize={1.5}
          textAnchor="start"
          style={{ textTransform: "capitalize" }}
        >
          {label.split("-").join(" ")}
        </tspan>
        <tspan
          alignmentBaseline={isBelowXHeight ? "before-edge" : "after-edge"}
          fontSize={1.5}
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
        className={cn("stroke-red-500")}
        strokeWidth={0.1}
        strokeDasharray="0.3 0.3"
      />
      <text
        x={position === "left" ? x - 5 : x + 5}
        y={y}
        fill="var(--grid-color)"
        style={{ fontFeatureSettings: `"tnum"` }}
      >
        <tspan
          alignmentBaseline="after-edge"
          fontSize={1.5}
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
        y={y}
        fontFamily="inherit"
        style={{ fontFeatureSettings: `"tnum"` }}
        className={cn("mix-blend-difference", "fill-white")}
      >
        <tspan
          alignmentBaseline="after-edge"
          fontSize={1.5}
          textAnchor="middle"
        >
          {value}
        </tspan>
      </text>
    </g>
  );
}
