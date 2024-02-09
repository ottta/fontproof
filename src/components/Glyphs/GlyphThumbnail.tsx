import GridSpan from "../GridSpan";

import { cn } from "@/libs/utils";

import useFont from "@/hooks/use-font";
import useGlyph from "@/hooks/use-glyph";

export default function GlyphThumbnail() {
  const { font } = useFont();
  const { glyphs } = font;
  const { selectedGlyphs, reservedGlyphs, chooseReserved, chooseSelected } =
    useGlyph();

  const blockKeys = Object.values(
    glyphs
      .filter((item) => item.unicode?.block)
      .map((item) => item.unicode.block)
  );
  const uniqueBlocks = blockKeys.reduce(
    (a: (string | undefined)[], b) => (a.includes(b) ? a : [...a, b]),
    []
  ); // Blocks[]

  const groupByBlocks = uniqueBlocks.map((block) => ({
    block,
    glyphs: glyphs
      .filter((item) => item.unicode?.block === block)
      .sort((a, b) =>
        a.unicode.hex ? a.unicode.hex.localeCompare(b.unicode.hex!) : -1
      )
  }));

  return (
    <GridSpan span={6} bg>
      <ul
        className={cn(
          "col-span-full",
          "flex",
          "flex-col",
          "gap-y-12",
          "bg-neutral-50 dark:bg-neutral-950",
          "relative"
        )}
      >
        {groupByBlocks.map((item, i) => (
          <li key={i}>
            <div className={cn("text-3xl")}>{item.block}</div>

            <ul
              onMouseLeave={() => chooseSelected(reservedGlyphs)}
              className={cn("grid", "grid-cols-11", "gap-0")}
            >
              {item.glyphs.map((glyph, iG) => {
                const isActive = selectedGlyphs[0]?.id === glyph.id;
                return (
                  <li
                    key={iG}
                    onMouseOver={() => chooseSelected([glyph])}
                    onClick={() => chooseReserved([glyph])}
                    className={cn(
                      "relative",
                      "col-span-1",
                      // "aspect-square",
                      "overflow-hidden",
                      isActive && "bg-neutral-200 dark:bg-neutral-900",
                      "border",
                      "-mb-px -mr-px"
                    )}
                  >
                    <div className={cn("text-xs/6", "border-b", "px-1")}>
                      {glyph.unicode?.hex || glyph.name}
                    </div>
                    <svg
                      viewBox={glyph.svg.viewBox}
                      transform="scale(0.8)"
                      fill="currentColor"
                      className={cn("!aspect-square")}
                    >
                      <path d={glyph.svg.path} />
                    </svg>
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ul>
    </GridSpan>
  );
}
