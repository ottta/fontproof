import { OTBase } from "./OTBase";
import { OTFeature } from "./OTFeature";
import OTName from "./OTName";
import OTVariable from "./OTVariable";

import { Font, parse } from "opentype.js";

class OTGlyph extends OTBase {
  get() {
    return this.getGlyphs();
  }
}

class OTMetric extends OTBase {
  get() {
    return this.metrics;
  }
}

class OTClassification extends OTBase {
  get() {
    const OS2 = this.font.tables["os2"];
    const POST = this.font.tables["post"];
    return {
      weight: Number(OS2.usWeightClass),
      width: Number(OS2.usWidthClass),
      italicAngle: Number(POST.italicAngle),
    };
  }
}

export class OTParser {
  glyph: OTGlyph;
  feature: OTFeature;
  name: OTName;
  metric: OTMetric;
  variable: OTVariable;
  classification: OTClassification;

  constructor(private readonly font: Font) {
    this.glyph = new OTGlyph(this.font);
    this.feature = new OTFeature(this.font);
    this.name = new OTName(this.font);
    this.metric = new OTMetric(this.font);
    this.variable = new OTVariable(this.font);
    this.classification = new OTClassification(this.font);
  }

  static buffer(buff: ArrayBuffer) {
    const font = parse(buff);
    // console.log(font);
    return new OTParser(font);
  }
}
