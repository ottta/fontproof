"use client";

import { useFont } from "../ProviderFont";
import GlyphView from "./GlyphView";
import ProviderGlyphView, { useGlyphView } from "./Provider";
import {
  GlyphBlock,
  GlyphGroup,
  GlyphSVG,
  GlyphThumb,
  GlyphThumbLabel,
} from "./utils";

import { memo } from "react";

import { FontGlyph } from "@/libs/opentype/OTBase";
import { cn } from "@/libs/utils";

type ThumbnailsProps = {
  glyphs: [sub: FontGlyph, by: FontGlyph][];
};

const Thumbnails = memo(({ glyphs }: ThumbnailsProps) => {
  const { view, setView, setReserved, reserved } = useGlyphView();
  return (
    <GlyphBlock onMouseLeave={() => setView(reserved)}>
      {glyphs.map((glyph, i) => {
        const [sub, by] = glyph;
        const isActive = view.includes(sub) || reserved.includes(sub);
        return (
          <GlyphThumb
            key={i}
            isActive={isActive}
            onMouseOver={() => setView(glyph)}
            onClick={() => setReserved(glyph)}
          >
            <GlyphThumbLabel label={by.glyphName} />
            <GlyphSVG
              viewBox={by.svg.viewBox.join(" ")}
              width={by.svg.size[0]}
              height={by.svg.size[1]}
              scale={0.5}
              paths={by.svg.path}
            />
          </GlyphThumb>
        );
      })}
    </GlyphBlock>
  );
});

export default function GlyphFeature() {
  const { font } = useFont();
  const features = font?.features;
  if (!features) return null;
  if (features.length <= 0) return null;
  return (
    <ProviderGlyphView initial={features[0].glyphs[0]}>
      <div data-grid data-container>
        <aside className={cn("col-span-6")}>
          <GlyphView intens="features" />
        </aside>

        <div className={cn("col-span-6")}>
          <GlyphGroup>
            {features.map((feature, i) => (
              <li key={i} className={cn("flex", "flex-col", "gap-1")}>
                <div
                  className={cn(
                    "text-xs",
                    "text-neutral-400",
                    "bg-neutral-50",
                    "dark:bg-neutral-800",
                  )}
                >
                  <div
                    className={cn(
                      "flex",
                      "items-center",
                      "justify-between",
                      "px-3",
                      "h-8",
                      "border",
                    )}
                  >
                    <div
                      className={cn(
                        "flex",
                        "items-center",
                        "gap-1",
                        "items-baseline",
                      )}
                    >
                      {feature.description}{" "}
                      <span
                        className={cn(
                          "font-mono",
                          "bg-neutral-100",
                          "dark:bg-neutral-800",
                          "px-1",
                          "rounded-full",
                          "text-2xs",
                          "leading-normal",
                        )}
                      >
                        {feature.tag}
                      </span>
                    </div>
                    <span className={cn("text-2xs")}>
                      {feature.glyphs.length} Glyphs
                    </span>
                  </div>
                </div>

                <Thumbnails key={i} glyphs={feature.glyphs} />
              </li>
            ))}
          </GlyphGroup>
        </div>
      </div>
    </ProviderGlyphView>
  );
}
