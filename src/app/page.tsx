"use client";

import { useBoolean } from "usehooks-ts";

import { PARAGRAPH } from "@/libs/texts";
import { cn } from "@/libs/utils";

import useLineHeight from "@/hooks/use-line-height";

import { useFont } from "@/components/ProviderFont";
import { CustomFont } from "@/components/ProviderFonts";
import { useAgent } from "@/components/Providers/ProviderAgent";

// Safari 1.2

export default function Page() {
  const { font } = useFont();
  if (!font) return null;
  return <Comp font={font} />;
}

const tableHead = [
  `<thead>`,
  `<tr>`,
  `<td>Key</td>`,
  `<td>Value</td>`,
  `</tr>`,
  `</thead>`,
];

function Comp({ font }: { font: CustomFont }) {
  const { value: isInitial, toggle } = useBoolean(true);
  const aspects = [14, 20, 16, 15, 10, 12];
  const { os, engine } = useAgent();
  const lineHeight = useLineHeight({
    upm: font.metrics.unitsPerEm,
    hheaAscender: font.metrics.hheaAscender,
    hheaDescender: font.metrics.hheaDescender,
    hheaLineGap: font.metrics.hheaLineGap,
    typoAscender: font.metrics.typoAscender,
    typoDescender: font.metrics.typoDescender,
    typoLineGap: font.metrics.typoLineGap,
    yMax: font.metrics.yMax,
    yMin: font.metrics.yMin,
    useTypo: font.metrics.useTypoMetrics,
    engine,
    os,
  });

  const metrics: {
    [key: string]: [
      ascender: number,
      descender: number,
      lineGap: number,
      lineSpacing: string,
      useTypoMetrics?: string,
    ];
  } = {
    hhea: [
      font.metrics.hheaAscender,
      font.metrics.hheaDescender,
      font.metrics.hheaLineGap,
      (
        (font.metrics.hheaAscender +
          Math.abs(font.metrics.hheaDescender) +
          font.metrics.hheaLineGap) /
        font.metrics.unitsPerEm
      ).toString(),
    ],
    typo: [
      font.metrics.typoAscender,
      font.metrics.typoDescender,
      font.metrics.typoLineGap,
      (
        (font.metrics.typoAscender +
          Math.abs(font.metrics.typoDescender) +
          font.metrics.typoLineGap) /
        font.metrics.unitsPerEm
      ).toString(),
      font.metrics.useTypoMetrics ? "Yes" : "No",
    ],
  };
  const mKeys = [
    "Ascender",
    "Descender",
    "Line Gap",
    "Line Spacing",
    "Use Typo Metrics",
  ];
  const tables = Object.keys(metrics).flatMap((key) => [
    `<table>`,
    `<caption className="!uppercase">${key}</caption>`,
    ...tableHead,
    `<tbody>`,
    ...metrics[key].flatMap((item, i) => [
      `<tr>`,
      `<td>${mKeys[i]}</td>`,
      `<td>${item}</td>`,
      `</tr>`,
    ]),
    `</tbody>`,
    `</table>`,
  ]);
  return (
    <div
      className={cn(
        // "bg-neutral-50",
        // "dark:bg-neutral-900",
        "min-h-screen",
      )}
    >
      <div
        data-container
        data-grid
        className={cn("py-16", "items-center", "min-h-screen")}
      >
        <div className={cn("col-span-3")}>
          <div className={cn("mb-6")}>
            <button
              onClick={toggle}
              className={cn(
                "border",
                "rounded-full",
                "px-3",
                "shadow",
                isInitial ? "bg-yellow-500" : "bg-neutral-50",
              )}
            >
              {isInitial ? "Initial" : lineHeight}
            </button>
          </div>
          <div
            data-specimen
            dangerouslySetInnerHTML={{ __html: tables.join("") }}
            className={cn(
              "leading-[initial]",
              "max-w-none",
              "prose",
              "prose-neutral",
              "dark:prose-invert",
            )}
          />
        </div>

        <div className={cn("col-span-9")}>
          <article
            data-specimen
            className={cn(
              "max-w-none",
              "prose",
              "prose-neutral",
              "dark:prose-invert",
              "columns-3",
              "gap-0",
            )}
            style={{
              fontSize: 16,
              fontFamily: `"${font.names.fontFamily}"`,
              // lineHeight: "initial",
              lineHeight: isInitial ? "initial" : lineHeight,
              // @ts-ignore
              "--line-height": lineHeight,
              "--line-space": lineHeight + "em",
              "--image-1": lineHeight * aspects[3] + "em",
              "--image-2": lineHeight * aspects[3] - 4 + "em",
              "--title-1": (lineHeight / (2.25 / 2)).toFixed(2),
            }}
            dangerouslySetInnerHTML={{
              __html: PARAGRAPH.join(""),
              // __html: [
              //   `<h1>`,
              //   `${font.names.fontFamily} — ${lineHeight}`,
              //   `</h1>`,
              // ]
              //   .concat(PARAGRAPH)
              //   .join(""),
            }}
          />
        </div>
      </div>
    </div>
  );
}
