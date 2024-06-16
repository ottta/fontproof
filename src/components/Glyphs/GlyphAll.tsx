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

import { memo, useMemo } from "react";

import { FontGlyph } from "@/libs/opentype/OTBase";
import { cn, groupBy } from "@/libs/utils";

type ThumbnailsProps = {
  glyphs: FontGlyph[];
};
const Thumbnails = memo(({ glyphs }: ThumbnailsProps) => {
  const { view, setView, setReserved, reserved } = useGlyphView();
  const items = glyphs.sort((a, b) => Number(a.code) - Number(b.code));
  return (
    <GlyphBlock onMouseLeave={() => setView(reserved)}>
      {items.map((item, i) => {
        const isActive = view.includes(item) || reserved.includes(item);
        return (
          <GlyphThumb
            key={i}
            isActive={isActive}
            onMouseOver={() => setView([item])}
            onClick={() => setReserved([item])}
          >
            <GlyphThumbLabel label={item.hex ?? item.glyphName} />
            <GlyphSVG
              viewBox={item.svg.viewBox.join(" ")}
              width={item.svg.size[0]}
              height={item.svg.size[1]}
              scale={0.5}
              paths={item.svg.path}
            />
          </GlyphThumb>
        );
      })}
    </GlyphBlock>
  );
});

function Comp({ glyphs }: { glyphs: FontGlyph[] }) {
  const group = groupBy(glyphs, (i) => i.block);
  const groupKeys = Object.keys(group).filter((item) => item !== "Unknown");

  const keys = useMemo(() => groupKeys, [groupKeys]);
  const groups = useMemo(() => group, [group]);

  return (
    <ProviderGlyphView
      initial={[glyphs.find((item) => item.code.includes(72)) || glyphs[0]]}
    >
      <div data-grid data-container>
        <aside className={cn("col-span-6")}>
          <GlyphView />
        </aside>

        <div className={cn("col-span-6")}>
          <GlyphGroup>
            {keys.map((key, i) => (
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
                    <span className={cn("flex", "items-center")}>{key}</span>
                    <span className={cn("text-2xs")}>
                      {groups[key].length} Glyphs
                    </span>
                  </div>
                </div>

                <Thumbnails glyphs={groups[key]} />
              </li>
            ))}
          </GlyphGroup>
        </div>
      </div>
    </ProviderGlyphView>
  );
}

export default function GlyphAll() {
  const { font } = useFont();
  if (!font) return null;
  return <Comp glyphs={font.glyphs} />;
}
