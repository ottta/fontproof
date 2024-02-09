"use client";

import { BASIC_CHARACTERS } from "@/libs/text-proof";
import texts from "@/libs/text-proof.json";
import { cn } from "@/libs/utils";

import useFont from "@/hooks/use-font";
import useOpentypeData from "@/hooks/use-opentype-data";

import ProviderGlyph from "@/components/Context/ContextGlyph";
import FontSelector from "@/components/FontSelector";
import GlyphPreview from "@/components/Glyphs/GlyphPreview";
import GlyphThumbnail from "@/components/Glyphs/GlyphThumbnail";
import GridSpan from "@/components/GridSpan";
import Layout from "@/components/Layout";
import ProofText from "@/components/Proofs/ProofText";
import SectionHeader from "@/components/SectionHeader";

export default function Page() {
  const { fonts } = useOpentypeData();
  const { font } = useFont();
  return (
    <div className={cn("col-span-12")}>
      <ProviderGlyph>
        {font && fonts.length !== 0 && (
          <>
            <div>
              <SectionHeader>
                <div>
                  {font.glyphs.length} glyphs —{" "}
                  {font.glyphs.filter((item) => item.unicode).length} characters
                </div>
                <div>
                  <FontSelector />
                </div>
              </SectionHeader>

              <div className={cn("grid", "grid-cols-12", "gap-x-4")}>
                <GlyphPreview />
                <GlyphThumbnail />
              </div>
            </div>

            <div>
              <SectionHeader>
                <div style={{ fontSize: "2em" }}>Specimens</div>
                <div>
                  <FontSelector />
                </div>
              </SectionHeader>

              <div>
                <ProofText
                  title="ASCII"
                  text={BASIC_CHARACTERS.join("")}
                  defaultFontSize={56}
                />
                <ProofText
                  title="Hamburgedfontstiv"
                  text={texts.Hamburgers.hamburgedfontsiv}
                  defaultFontSize={56}
                />
                <ProofText
                  title="Spacing"
                  text={texts.Spacing.spacing}
                  defaultFontSize={16}
                />
                <ProofText
                  title="Kerning"
                  text={texts.Kerning.kerning}
                  defaultFontSize={16}
                />
              </div>
            </div>
          </>
        )}
      </ProviderGlyph>
    </div>
  );
}
