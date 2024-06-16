"use client";

import { HTMLAttributes } from "react";
import { useBoolean } from "usehooks-ts";

import { FontFeature } from "@/libs/opentype/OTFeature";
import { FeatureTag } from "@/libs/opentype/feature-tags";
import { cn } from "@/libs/utils";

import Aside from "@/components/Aside";
import { useFont } from "@/components/ProviderFont";
import { CustomFont } from "@/components/ProviderFonts";
import Toggle from "@/components/Utils/Toggle";

const onByDefault: FeatureTag[] = [
  "calt",
  "clig",
  "kern",
  "liga",
  "opbd",
  "rvrn",
  "size",
  "valt",
  "vert",
  "vkrn",
  "vrt2",
  "vrtr",
];

interface GlyphBoxProps extends HTMLAttributes<HTMLDivElement> {}

function GlyphBox(props: GlyphBoxProps) {
  const { children, ...rest } = props;
  return (
    <div
      {...rest}
      className={cn(
        "bg-neutral-50",
        "dark:bg-neutral-800",
        "overflow-hidden",
        "border",
        "h-full",
        "flex",
        "items-center",
        "justify-center",
        rest.className,
      )}
    >
      {children}
    </div>
  );
}

function getComparer(tag: FeatureTag): [before: string, after?: string] {
  switch (tag) {
    case "case":
      return ["H", "O"];
    case "onum":
      return ["x"];
    case "sinf":
      return ["n", "x"];
    case "subs":
      return ["x"];
    case "sups":
      return ["x"];
    default:
      return ["", ""];
  }
}

function getStrings(tag: FeatureTag, strings: string[]) {
  switch (tag) {
    case "case":
      return ["H", ...strings, "O"];
    case "dnom":
      return ["x", ...strings];
    case "onum":
      return ["x", ...strings];
    case "sinf":
      return ["n", ...strings, "x"];
    case "subs":
      return ["x", ...strings];
    case "sups":
      return ["x", ...strings];
    default:
      return strings;
  }
}

function FeatureBlock({ item, font }: { item: FontFeature; font: CustomFont }) {
  const { value, toggle } = useBoolean(
    // onByDefault.indexOf(item.tag as FeatureTag) !== -1,
    true,
  );

  return (
    <li data-grid>
      <Aside>
        <div className={cn("flex", "flex-col", "gap-1")}>
          <div
            className={cn(
              "h-8",
              "flex",
              "items-center",
              "justify-between",
              "px-3",
              "font-mono",
              "border",
              "text-xs",
              "text-neutral-400",
              "bg-neutral-50",
              "dark:bg-neutral-800",
            )}
          >
            <span>{item.tag}</span>{" "}
            <Toggle value={Number(value)} onClick={toggle} />
          </div>
          <div
            className={cn(
              "p-3",
              "hyphens-auto",
              "bg-neutral-50",
              "dark:bg-neutral-800",
              "leading-none",
              "border",
            )}
          >
            <div>{item.description}</div>
            {onByDefault.indexOf(item.tag as FeatureTag) !== -1 && (
              <div className={cn("text-xs", "text-neutral-400")}>
                This feature is on by default.
              </div>
            )}
          </div>
        </div>
      </Aside>

      <ul
        className={cn(
          "col-span-9",
          "grid",
          "grid-cols-9",
          "gap-1",
          "self-start",
        )}
      >
        {item.glyphs.map((glyph, i) => {
          const [sub, by] = glyph;
          const codes = sub.code.includes(null) ? by.code : sub.code;
          const names = sub.name.includes(null) ? by.name : sub.name;
          return (
            <li
              key={i}
              className={cn("flex", "flex-col", "gap-1", "justify-stretch")}
            >
              <div
                className={cn(
                  "h-8",
                  "px-3",
                  "flex",
                  "items-center",
                  "shrink-0",
                  "border",
                  "bg-neutral-50",
                  "dark:bg-neutral-800",
                )}
              >
                <div
                  className={cn(
                    "text-xs",
                    "overflow-hidden",
                    "text-ellipsis",
                    "whitespace-nowrap",
                    "text-neutral-400",
                  )}
                >
                  {names.join(", ")}
                </div>
              </div>

              <GlyphBox>
                <div
                  style={{
                    fontFamily: `"${font.names.fontFamily}"`,
                    fontFeatureSettings: `"${item.tag}" ${value ? 1 : 0}`,
                  }}
                  className={cn(
                    "whitespace-nowrap",
                    "overflow-hidden",
                    "text-ellipsis",
                  )}
                >
                  <span
                    data-before={getComparer(item.tag as FeatureTag)[0]}
                    data-after={getComparer(item.tag as FeatureTag)[1]}
                    className={cn(
                      "font-feature",
                      "before:content-[attr(data-before)]",
                      "before:text-neutral-300",
                      "before:dark:text-neutral-500",
                      "after:content-[attr(data-after)]",
                      "after:text-neutral-300",
                      "after:dark:text-neutral-500",
                      "text-4xl",
                      "overflow-hidden",
                      "leading-[initial]",
                    )}
                  >
                    {codes
                      // 65532, FFFC, Object Replacement Character
                      // 65533, FFFD, Replacement Character
                      .map((item) => String.fromCharCode(item || 65533))
                      .join("")}
                  </span>
                </div>

                {/* {value ? (
                    <div
                      className={cn("inline-flex", "border-xs", "divide-xs")}
                    >
                      <span
                        data-before={getComparer(item.tag as FeatureTag)[0]}
                        data-after={getComparer(item.tag as FeatureTag)[1]}
                        className={cn(
                          "font-feature",
                          "before:content-[attr(data-before)]",
                          "before:text-neutral-300",
                          "after:content-[attr(data-after)]",
                          "after:text-neutral-300",
                        )}
                      >
                        {codes
                          .map((item) => String.fromCharCode(item || 65533))
                          .join("")}
                      </span>
                    </div>
                  ) : (
                    <div
                      className={cn("inline-flex", "border-xs", "divide-xs")}
                    >
                      {codes.map((str) => {
                        const s = String.fromCharCode(str || 65533);
                        return (
                          <span
                            key={i}
                            data-before={getComparer(item.tag as FeatureTag)[0]}
                            data-after={getComparer(item.tag as FeatureTag)[1]}
                            className={cn(
                              "font-feature",
                              "before:content-[attr(data-before)]",
                              "before:text-neutral-300",
                              "after:content-[attr(data-after)]",
                              "after:text-neutral-300",
                            )}
                          >
                            {s}
                          </span>
                        );
                      })}
                    </div>
                  )} */}
              </GlyphBox>
            </li>
          );
        })}
      </ul>
    </li>
  );
}

export default function Page() {
  const { font } = useFont();
  if (!font || !font.features) return null;
  return (
    <div data-container className={cn("pt-[33.33vh]", "pb-16")}>
      <ul className={cn("flex", "flex-col", "gap-1")}>
        {font.features
          .sort((a, b) => a.tag.localeCompare(b.tag))
          .map((item, i) => (
            <FeatureBlock key={i} font={font} item={item} />
          ))}
      </ul>
    </div>
  );
}
