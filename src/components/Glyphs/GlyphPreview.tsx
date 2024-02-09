import GridSpan from "../GridSpan";
import {
  GlyphSideBearing,
  GlyphVerticalMetric,
  GlyphWidthInfo
} from "./GlyphMetric";

import { useState } from "react";

import { cn } from "@/libs/utils";

import useFont from "@/hooks/use-font";
import useGlyph from "@/hooks/use-glyph";

type MetrikKey = "hhea" | "typo" | "win";

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
  const { selectedGlyphs } = useGlyph();
  const { font } = useFont();
  const selectedGlyph = selectedGlyphs[0];
  const useTypoMetrics = font.metrics.useTypoMetrics;
  font.metrics.useTypoMetrics;

  const [showMetrics, setShowMetrics] = useState({
    hhea: true,
    typo: false,
    win: false
  });

  return (
    <div className={cn("col-span-4", "col-start-3")}>
      <div className={cn("sticky", "top-16")}>
        <div className={cn("border-x")}>
          <ul className={cn("border-y")}>
            {selectedGlyphs.map((item, i) => {
              const bboxTop = Math.min(
                item.svg.hheaAscender.coordinate
                // item.svg.typoAscender.coordinate
              );

              const bboxBot = Math.min(
                item.svg.hheaDescender.coordinate
                // item.svg.typoDescender.coordinate
              );

              return (
                <li key={i}>
                  <div>
                    <svg
                      viewBox={item.svg.viewBox}
                      width="100%"
                      height="100%"
                      fill="currentColor"
                      className={cn("bg-rose-100 dark:bg-rose-400/30")}
                    >
                      <g>
                        <rect
                          width={item.svg.boundingBox.width}
                          height={bboxBot - bboxTop}
                          x={0}
                          y={bboxTop}
                          className={cn(
                            "fill-neutral-50 dark:fill-neutral-950"
                          )}
                        />
                      </g>
                      <g>
                        {showMetrics.hhea && (
                          <>
                            <GlyphVerticalMetric
                              label="hhea-ascender"
                              value={item.svg.hheaAscender.value}
                              y={item.svg.hheaAscender.coordinate}
                              x={item.svg.boundingBox.width}
                            />
                            <GlyphVerticalMetric
                              label="hhea-descender"
                              value={item.svg.hheaDescender.value}
                              y={item.svg.hheaDescender.coordinate}
                              x={item.svg.boundingBox.width}
                            />
                          </>
                        )}
                        {showMetrics.typo && (
                          <>
                            <GlyphVerticalMetric
                              label="typo-ascender"
                              value={item.svg.typoAscender.value}
                              y={item.svg.typoAscender.coordinate}
                              x={item.svg.boundingBox.width}
                            />
                            <GlyphVerticalMetric
                              label="typo-descender"
                              value={item.svg.typoDescender.value}
                              y={item.svg.typoDescender.coordinate}
                              x={item.svg.boundingBox.width}
                            />
                          </>
                        )}
                        {showMetrics.win && (
                          <>
                            <GlyphVerticalMetric
                              label="win-ascent"
                              value={item.svg.winAscender.value}
                              y={item.svg.winAscender.coordinate}
                              x={item.svg.boundingBox.width}
                            />
                            <GlyphVerticalMetric
                              label="win-descent"
                              value={item.svg.winDescender.value}
                              y={item.svg.winDescender.coordinate}
                              x={item.svg.boundingBox.width}
                            />
                          </>
                        )}
                        <GlyphVerticalMetric
                          label="yMax"
                          value={item.svg.yMax.value}
                          y={item.svg.yMax.coordinate}
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
                          y={item.svg.descender.coordinate}
                          value={item.svg.leftSideBearing.value || 0}
                          position="left"
                        />
                        <GlyphSideBearing
                          x={item.svg.rightSideBearing.coordinate}
                          y={item.svg.descender.coordinate}
                          value={item.svg.rightSideBearing.value || 0}
                          position="right"
                        />
                      </g>

                      <g>
                        <GlyphWidthInfo
                          x={item.svg.boundingBox.width / 2}
                          y={item.svg.descender.coordinate}
                          value={item.svg.advanceWidth}
                        />
                      </g>
                    </svg>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className={cn("flex", "gap-x-4")}>
          {Object.keys(showMetrics).map((item, i) => (
            <button
              key={i}
              // @ts-ignore
              className={cn(showMetrics[item] && "line-through")}
              onClick={() =>
                setShowMetrics((prev) => ({
                  ...prev,
                  // @ts-ignore
                  [item]: prev[item] ? false : true
                }))
              }
            >
              {item}
            </button>
          ))}
        </div>

        {selectedGlyph && (
          <div>
            <ul>
              <ListInfo
                title="Character Name"
                value={selectedGlyph.unicode?.name || "-"}
              />
              <ListInfo title="Glyph Name" value={selectedGlyph.name || "-"} />
              <ListInfo
                title="Codepoint"
                value={selectedGlyph.unicode.codePoint?.toString() || "-"}
              />
              <ListInfo
                title="Hex Code"
                value={selectedGlyph.unicode.hex || "-"}
              />
              <ListInfo
                title="Hex Code"
                value={`&#${selectedGlyph.unicode.codePoint}`}
              />
              <ListInfo
                title="CSS (ISO)"
                value={`\\${selectedGlyph.unicode.hex}`}
              />
              <ListInfo
                title="Block"
                value={selectedGlyph.unicode.block || "Unknown"}
              />
            </ul>
          </div>
        )}

        <ul>
          <li>
            * hhea/typo ascender is an effective vertical bounding-box for this
            font
          </li>
        </ul>
      </div>
    </div>
  );
}
