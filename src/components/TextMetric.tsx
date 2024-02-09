import FontSelector from "./FontSelector";

import { IMetric } from "@/types/metrics";

import { PropsWithChildren, useMemo, useState } from "react";

import { cn } from "@/libs/utils";

import useFont from "@/hooks/use-font";

type MetricName = "hhea" | "typo" | "win";

interface MetricState {
  ascender: number;
  descender: number;
  unitsPerEm: number;
  capHeight: number;
  xHeight: number;
  yMax: number;
  yMin: number;
  hheaAscender: number;
  hheaDescender: number;
  winAscender: number;
  winDescender: number;
  typoAscender: number;
  typoDescender: number;
}

type useMetricTextProps = {
  use: MetricName;
  fontSize: number;
  lineHeight: number;
  fontMetric: IMetric;
};
function useMetricText(props: useMetricTextProps) {
  const { use, fontMetric, fontSize, lineHeight } = props;

  const metrics = useMemo<MetricState>(
    () => ({
      hheaAscender: fontMetric.hheaAscender,
      hheaDescender: fontMetric.hheaDescender,
      ascender: fontMetric.ascender,
      descender: fontMetric.descender,
      unitsPerEm: fontMetric.unitsPerEm,
      capHeight: fontMetric.capHeight,
      xHeight: fontMetric.xHeight,
      yMax: fontMetric.yMax,
      yMin: fontMetric.yMin,
      winAscender: fontMetric.winAscender,
      winDescender: fontMetric.winDescender,
      typoAscender: fontMetric.typoAscender,
      typoDescender: fontMetric.typoDescender
    }),
    [fontMetric, use]
  );

  const lineHeightRatio = lineHeight;
  const upm = metrics.unitsPerEm;
  const capHeightRatio = metrics.capHeight / upm;
  const xHeightRatio = metrics.xHeight / upm;
  const ascenderRatio = metrics.ascender / upm;
  const descenderRatio = metrics.descender / upm;
  const yMaxRatio = metrics.yMax / upm;
  const yMinRatio = metrics.yMin / upm;
  const hheaAscenderRatio = metrics.hheaAscender / upm;
  const hheaDescenderRatio = metrics.hheaDescender / upm;
  const typoAscenderRatio = metrics.typoAscender / upm;
  const typoDescenderRatio = metrics.typoDescender / upm;
  const winAscenderRatio = metrics.winAscender / upm;
  const winDescenderRatio = -Math.abs(metrics.winDescender) / upm;

  const baselineRatio = Math.abs(hheaDescenderRatio);

  const boundingBoxRatio =
    (metrics.hheaAscender + Math.abs(metrics.hheaDescender)) / upm;
  const lineGapRatio = lineHeightRatio - boundingBoxRatio;
  const originOffset = (lineGapRatio / 2) * fontSize;

  const baselineOffset = originOffset + baselineRatio * fontSize;
  const ascenderOffset = baselineOffset + ascenderRatio * fontSize;
  const capHeightOffset = baselineOffset + capHeightRatio * fontSize;
  const xHeightOffset = baselineOffset + xHeightRatio * fontSize;
  const descenderOffset = baselineOffset + descenderRatio * fontSize;
  const yMaxOffset = baselineOffset + yMaxRatio * fontSize;
  const yMinOffset = baselineOffset + yMinRatio * fontSize;
  const hheaAscenderOffset = baselineOffset + hheaAscenderRatio * fontSize;
  const hheaDescenderOffset = baselineOffset + hheaDescenderRatio * fontSize;
  const typoAscenderOffset = baselineOffset + typoAscenderRatio * fontSize;
  const typoDescenderOffset = baselineOffset + typoDescenderRatio * fontSize;
  const winAscenderOffset = baselineOffset + winAscenderRatio * fontSize;
  const winDescenderOffset = baselineOffset + winDescenderRatio * fontSize;

  return {
    offset: {
      ascender: ascenderOffset,
      capHeight: capHeightOffset,
      xHeight: xHeightOffset,
      baseline: baselineOffset,
      descender: descenderOffset,
      hheaAscender: hheaAscenderOffset,
      hheaDescender: hheaDescenderOffset,
      typoAscender: typoAscenderOffset,
      typoDescender: typoDescenderOffset,
      winAscender: winAscenderOffset,
      winDescender: winDescenderOffset
    },
    baselineOffset,
    ascenderOffset,
    capHeightOffset,
    xHeightOffset,
    descenderOffset,
    lineHeightRatio,
    boundingBoxRatio,
    lineGapRatio,
    originOffset,
    fontSize,
    lineHeight,
    metrics,
    yMaxOffset,
    yMinOffset
  };
}

type LineMetricLabel =
  | "Baseline"
  | "x Height"
  | "Cap Height"
  | "Ascender"
  | "Descender"
  | "yMax"
  | "yMin"
  | "Hhea Ascender"
  | "Hhea Descender"
  | "Typo Ascender"
  | "Typo Descender"
  | "Win Ascender"
  | "Win Descender";

function LineMetric(
  props: PropsWithChildren<{
    y: number;
    value: number;
    label: LineMetricLabel;
  }>
) {
  const { y, label, value } = props;
  const isAboveXHeight =
    label === "x Height" ||
    label === "Cap Height" ||
    label === "Ascender" ||
    label === "yMax" ||
    label == "Hhea Ascender";
  return (
    <div
      data-name={label}
      style={{
        bottom: isAboveXHeight ? y - 1 : y,
        fontFeatureSettings: `"tnum"`
      }}
      className={cn(
        "absolute",
        "h-px",
        "bg-neutral-300 dark:bg-neutral-800",
        "w-full"
      )}
    >
      <div
        className={cn(
          "absolute",
          "flex",
          "justify-between",
          "w-full",
          !isAboveXHeight && "-translate-y-full",
          "text-xs/3"
        )}
      >
        <span>{label}</span> <span>{value}</span>
      </div>
    </div>
  );
}

type TextMetricProps = {
  use: MetricName;
};

export default function TextMetric(props: TextMetricProps) {
  const { use } = props;
  const { font } = useFont();
  const def = useMemo(
    () => ({
      fontSize: 400,
      lineHeight:
        (font.metrics.hheaAscender + Math.abs(font.metrics.hheaDescender)) /
        font.metrics.unitsPerEm
    }),
    [font]
  );

  const [setting, setSetting] = useState(def);

  const {
    fontSize,
    lineHeight,
    boundingBoxRatio,
    originOffset,
    lineHeightRatio,
    lineGapRatio,
    yMaxOffset,
    yMinOffset,
    offset
  } = useMetricText({
    use,
    fontMetric: font.metrics,
    fontSize: setting.fontSize,
    lineHeight: setting.lineHeight
  });

  return (
    <div className={cn("col-span-full")}>
      <div className={cn("relative", "overflow-hidden")}>
        <div
          className={cn(
            "absolute",
            "top-4",
            "left-0",
            "right-0",
            "z-20",
            "flex",
            "gap-x-12",
            "bg-neutral-50 dark:bg-neutral-950",
            "border-y"
          )}
        >
          <FontSelector />
          <label>
            <div>Font Size {setting.fontSize}</div>
            <input
              type="range"
              value={setting.fontSize}
              min={16}
              max={400}
              step={1}
              onDoubleClick={() =>
                setSetting((prev) => ({ ...prev, fontSize: def.fontSize }))
              }
              onChange={(e) =>
                setSetting((prev) => ({
                  ...prev,
                  fontSize: e.target.valueAsNumber
                }))
              }
            />
          </label>
          <label>
            <div>Line Height {setting.lineHeight.toFixed(2)}</div>
            <input
              type="range"
              value={setting.lineHeight}
              min={
                (font.metrics.capHeight + Math.abs(font.metrics.baseLine)) /
                font.metrics.unitsPerEm
              }
              max={def.lineHeight * 2}
              step={0.01}
              onDoubleClick={() =>
                setSetting((prev) => ({ ...prev, lineHeight: def.lineHeight }))
              }
              onChange={(e) =>
                setSetting((prev) => ({
                  ...prev,
                  lineHeight: e.target.valueAsNumber
                }))
              }
            />
          </label>
        </div>

        <div
          className={cn(
            "border-y",
            "mt-28",
            "bg-neutral-50 dark:bg-neutral-950",
            "relative",
            "overflow-hidden"
          )}
        >
          <div style={{ height: lineHeightRatio * setting.fontSize }}>
            <LineMetric
              y={offset.hheaAscender}
              label="Hhea Ascender"
              value={font.metrics.hheaAscender}
            />
            <LineMetric
              y={offset.capHeight}
              label="Cap Height"
              value={font.metrics.capHeight}
            />
            <LineMetric
              y={offset.xHeight}
              label="x Height"
              value={font.metrics.xHeight}
            />
            <LineMetric
              y={offset.baseline}
              label="Baseline"
              value={font.metrics.baseLine}
            />
            <LineMetric
              y={offset.hheaDescender}
              label="Hhea Descender"
              value={font.metrics.hheaDescender}
            />
            <LineMetric
              y={offset.descender}
              label="Descender"
              value={font.metrics.descender}
            />
            <LineMetric
              y={offset.ascender}
              label="Ascender"
              value={font.metrics.ascender}
            />
            <LineMetric
              y={offset.winAscender}
              label="Win Ascender"
              value={font.metrics.winAscender}
            />
            <LineMetric
              y={offset.winDescender}
              label="Win Descender"
              value={font.metrics.winDescender}
            />
            <LineMetric
              y={offset.typoAscender}
              label="Typo Ascender"
              value={font.metrics.typoAscender}
            />
            <LineMetric
              y={offset.typoDescender}
              label="Typo Descender"
              value={font.metrics.typoDescender}
            />
            {/* <LineMetric y={yMaxOffset} label="yMax" value={font.metrics.yMax} />
            <LineMetric y={yMinOffset} label="yMin" value={font.metrics.yMin} /> */}

            <div
              className={cn("text-center", "relative", "whitespace-nowrap")}
              style={{
                fontFamily: font.names.postScriptName,
                fontSize,
                lineHeight: lineHeight.toFixed(2)
              }}
            >
              {/* Hamburgedfontsiv */}
              {/* Àmigoś */}
              Àxfg
              {/* {font.names.postScriptName} */}
            </div>

            <div
              style={{
                bottom: originOffset,
                height: boundingBoxRatio * setting.fontSize
              }}
              className={cn(
                "absolute",
                "bg-red-400/20",
                "w-16",
                "left-0",
                "z-10"
              )}
            />
            <div
              style={{
                bottom: lineGapRatio,
                height: lineHeightRatio * setting.fontSize
              }}
              className={cn(
                "absolute",
                "bg-red-400/20",
                "w-16",
                "left-0",
                "z-10"
              )}
            />
          </div>
        </div>

        <div>
          Default lineHeight determined by:
          <pre>
            (hhea|typo Ascender - Abs(hhea|typo Descender)) / unitsPerEm
          </pre>
        </div>
      </div>
    </div>
  );
}
