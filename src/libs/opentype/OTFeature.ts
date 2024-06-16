import { FontGlyph, OTBase } from "./OTBase";
import { FeatureTag, OT_FEATURE_TAGS } from "./feature-tags";

import { Font } from "opentype.js";

type Sub = {
  sub: number | number[];
  by: number | number[];
};

type TupleFeature = [sub: FontGlyph, by: FontGlyph];

export type FontFeature = {
  tag: string;
  description: string;
  glyphs: TupleFeature[];
};

export class OTFeature extends OTBase {
  private readonly features: { tag: FeatureTag; description: string }[] = [];

  constructor(font: Font) {
    super(font);
    const gsub = font.tables["gsub"];
    if (gsub) {
      const featureString: FeatureTag[] = gsub?.features
        .map((item: { tag: FeatureTag }) => item.tag)
        .filter(
          (tag: FeatureTag, i: number, arr: FeatureTag[]) =>
            arr.indexOf(tag) === i,
        );

      // Possibly undefined
      this.features = featureString?.map((tag: FeatureTag) => ({
        tag,
        description: OT_FEATURE_TAGS[tag],
      }));
    }
  }

  get() {
    /**
     * @todo Create friendly error if GSUB doesn't exists
     */
    if (!this.features || !this.features.length) return;
    return this.all().filter((item) => item.glyphs.length);
  }

  private all(): FontFeature[] {
    const blackListed: FeatureTag[] = ["aalt"];

    return this.features
      .filter((item) => blackListed.indexOf(item.tag) === -1)
      .map(({ tag, description }) => {
        // @ts-expect-error
        const single = this.font.substitution.getSingle(tag) as Sub[];
        // @ts-expect-error
        const multiple = this.font.substitution.getMultiple(tag) as Sub[];
        // @ts-expect-error
        const alternates = this.font.substitution.getAlternates(tag) as Sub[];
        // @ts-expect-error
        const ligatures = this.font.substitution.getLigatures(tag) as Sub[];

        const subtitutions = this.subtitution(
          tag,
          single.concat(multiple, alternates, ligatures),
        );

        return {
          tag,
          description,
          glyphs: subtitutions,
        };
      });
  }

  private subtitution(tag: FeatureTag, items: Sub[]) {
    return items
      .map(({ sub, by }) => [
        { ...this.getGlyphs(sub), feature: tag },
        { ...this.getGlyphs(by), feature: tag },
      ])
      .filter((item) => item.length) as TupleFeature[];
  }
}
