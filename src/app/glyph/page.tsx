import { cn } from "@/libs/utils";

import GlyphAll from "@/components/Glyphs/GlyphAll";
import GlyphFeature from "@/components/Glyphs/GlyphFeature";

export default function Page() {
  return (
    <div
      className={cn(
        "flex",
        "flex-col",
        "gap-1",
        "pt-[33.33vh]",
        "pb-16",
        "relative",
        // "w-full",
      )}
    >
      <GlyphAll />
      <GlyphFeature />
    </div>
  );
}
