"use client";

import Aside from "../Aside";
import { useFont } from "../ProviderFont";
import { useGlyphView } from "./Provider";
import { GlyphSVG } from "./utils";

import { useMemo } from "react";

import { cn } from "@/libs/utils";

type HorzProps = {
  label: string;
  value: string | number;
  coordinate: number;
};

function Horz(props: HorzProps) {
  const { label, value, coordinate } = props;
  const isBelowZero = Math.sign(Number(value)) <= 0;
  return (
    <div
      style={{ top: `${coordinate}%`, fontFeatureSettings: `"tnum"` }}
      data-label={label}
      data-value={value}
      className={cn(
        "text-neutral-400",
        "absolute",
        isBelowZero ? "border-t" : "border-b",
        "left-0",
        "right-0",
        // "border-neutral-400",
        "border-dotted",
        "text-2xs",
        `before:content-[attr(data-label)]`,
        "before:absolute",
        "before:left-0",
        "before:px-3",
        "before:py-1",
        isBelowZero ? "before:top-0" : "before:bottom-0",
        isBelowZero ? "before:-translate-y-full" : "before:translate-y-full",
        isBelowZero && "-mt-px",
        `after:content-[attr(data-value)]`,
        "after:absolute",
        "after:right-0",
        "after:px-3",
        "after:py-1",
        isBelowZero ? "after:top-0" : "after:bottom-0",
        isBelowZero ? "after:-translate-y-full" : "after:translate-y-full",
        isBelowZero && "-mt-px",
      )}
    />
  );
}

function VerticalMetrics() {
  const { font } = useFont();
  const metrics = font?.metrics;
  if (!metrics) return null;
  return (
    <>
      <Horz
        label="Baseline"
        value={metrics.baseLine}
        coordinate={metrics.svg.baseLine}
      />
      <Horz
        label="X Height"
        value={metrics.xHeight}
        coordinate={metrics.svg.xHeight}
      />
      {metrics.capHeight !== metrics.ascender ? (
        <>
          <Horz
            label="Cap Height"
            value={metrics.capHeight}
            coordinate={metrics.svg.capHeight}
          />
          <Horz
            label="Ascender"
            value={metrics.ascender}
            coordinate={metrics.svg.ascender}
          />
        </>
      ) : (
        <Horz
          label="Cap Height"
          value={metrics.capHeight}
          coordinate={metrics.svg.capHeight}
        />
      )}

      <Horz
        label="Descender"
        value={metrics.descender}
        coordinate={metrics.svg.descender}
      />

      {/* <Horz
        label="Hhea Ascender"
        value={metrics.hheaAscender}
        coordinate={metrics.svg.hheaAscender}
      />
      <Horz
        label="Hhea Descender"
        value={metrics.hheaDescender}
        coordinate={metrics.svg.hheaDescender}
      /> */}

      {metrics.useTypoMetrics ? (
        <>
          <Horz
            label="Typo Ascender"
            value={metrics.typoAscender}
            coordinate={metrics.svg.typoAscender}
          />
          <Horz
            label="Typo Descender"
            value={metrics.typoDescender}
            coordinate={metrics.svg.typoDescender}
          />
        </>
      ) : (
        <>
          <Horz
            label="Hhea Ascender"
            value={metrics.hheaAscender}
            coordinate={metrics.svg.hheaAscender}
          />
          <Horz
            label="Hhea Descender"
            value={metrics.hheaDescender}
            coordinate={metrics.svg.hheaDescender}
          />
          {/* <Horz
            label="Win"
            value={metrics.winAscender}
            coordinate={metrics.svg.winAscender}
          />
          <Horz
            label="Win"
            value={metrics.winDescender}
            coordinate={metrics.svg.winDescender}
          /> */}
        </>
      )}
    </>
  );
}

type GlyphViewProps = {
  intens?: "glyphs" | "features";
};
export default function GlyphView(props: GlyphViewProps) {
  const { intens = "glyphs" } = props;
  const { view } = useGlyphView();
  const items = useMemo(() => view, [view]);
  const [sub, by] = items;
  return (
    <div className={cn("sticky", "top-16", "grid", "grid-cols-6", "gap-1")}>
      {intens === "glyphs" && (
        <Aside>
          <div
            className={cn(
              "col-span-2",
              "capitalize",
              "flex",
              "flex-col",
              "gap-1",
            )}
          >
            <div
              className={cn(
                "h-8",
                "border",
                "flex",
                "items-center",
                "px-3",
                "text-xs",
                "text-neutral-400",
                "bg-neutral-50",
                "dark:bg-neutral-800",
              )}
            >
              {intens}
            </div>
            <div
              style={{ fontFeatureSettings: `"tnum"` }}
              className={cn(
                "text-8xl",
                "font-bold",
                "text-neutral-400",
                "p-2",
                "border",
                "bg-neutral-50",
                "dark:bg-neutral-800",
                "aspect-square",
              )}
            >
              {intens.substring(0, 1)}1
            </div>
          </div>
        </Aside>
      )}

      <div
        className={cn(
          intens === "glyphs" ? cn("col-span-3", "col-start-4") : "col-span-6",
          "flex",
          "flex-col",
          "gap-1",
        )}
      >
        <div
          className={cn(
            "h-8",
            // "-mb-px",
            // "border-dotted",
            "flex",
            "items-center",
            "px-3",
            "text-xs",
            "text-neutral-400",
            "z-10",
            "bg-neutral-50",
            "dark:bg-neutral-800",
            "border",
          )}
        >
          {sub.name.join(", ")}
        </div>

        <div className={cn("relative", "overflow-hidden")}>
          {!!by ? (
            <ul
              className={cn(
                "overflow-hidden",
                "relative",
                "grid",
                "grid-cols-2",
                "gap-1",
              )}
            >
              <li
                className={cn(
                  "relative",
                  "bg-neutral-50",
                  "dark:bg-neutral-800",
                  "border",
                )}
              >
                <VerticalMetrics />
                <GlyphSVG
                  viewBox={sub.svg.viewBox.join(" ")}
                  width={sub.svg.size[0]}
                  height={sub.svg.size[1]}
                  paths={sub.svg.path}
                  className={cn("fill-neutral-500/80")}
                  metrics={{
                    lsb: sub.svg.hMetric[0],
                    adv: sub.svg.hMetric[1],
                    rsb: sub.svg.hMetric[2],
                  }}
                />
              </li>
              <li
                className={cn(
                  "relative",
                  "bg-neutral-50",
                  "dark:bg-neutral-800",
                  "border",
                )}
              >
                <VerticalMetrics />
                <GlyphSVG
                  viewBox={by.svg.viewBox.join(" ")}
                  width={by.svg.size[0]}
                  height={by.svg.size[1]}
                  paths={by.svg.path}
                  metrics={{
                    lsb: by.svg.hMetric[0],
                    adv: by.svg.hMetric[1],
                    rsb: by.svg.hMetric[2],
                  }}
                />
              </li>
            </ul>
          ) : (
            <div
              className={cn("bg-neutral-50", "dark:bg-neutral-800", "border")}
            >
              <VerticalMetrics />
              <GlyphSVG
                viewBox={sub.svg.viewBox.join(" ")}
                width={sub.svg.size[0]}
                height={sub.svg.size[1]}
                paths={sub.svg.path}
                metrics={{
                  lsb: sub.svg.hMetric[0],
                  adv: sub.svg.hMetric[1],
                  rsb: sub.svg.hMetric[2],
                }}
              />
            </div>
          )}
        </div>

        <div
          className={cn(
            "py-2",
            "px-3",
            "text-xs",
            "bg-neutral-50",
            "dark:bg-neutral-800",
            "border",
          )}
        >
          <ul
            style={{ fontFeatureSettings: `"tnum"` }}
            className={cn("flex", "flex-col", "gap-y-1")}
          >
            {[
              ["Blocks", sub.block || "-"],
              ["GIDs", sub.gid.join(", ") || "-"],
              // ["Glyph Name", sub.glyphName.join(", ") || "-"],
              ["Hex", sub.hex.join(", ") || "-"],
              ["Code", sub.code.join(", ") || "-"],
              [
                "Char",
                sub.code
                  .map((code) => String.fromCharCode(code || 65533))
                  .join(" ") || "-",
              ],
              (sub.feature && [
                "Feature",
                `font-feature-settings: "${sub.feature}";`,
              ]) ||
                [],
            ].map((item, i) => {
              const [key, value] = item;
              return (
                <li key={i} className={cn("grid", "grid-cols-4")}>
                  <div className={cn("text-neutral-400")}>{key}</div>
                  <div
                    className={cn(
                      "col-span-3",
                      key === "Feature" && "font-mono",
                    )}
                    style={
                      key === "Char" && sub.feature
                        ? { fontFeatureSettings: `"${sub.feature}" 1` }
                        : {}
                    }
                  >
                    {value}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
