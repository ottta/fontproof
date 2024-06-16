import { OTBase } from "./OTBase";

export type FontName = {
  fullName: string;
  fontFamily: string;
  fontSubfamily: string;
  postScriptName: string;
  copyright: string;
  uniqueID: string;
  version: string;
  designer: string;
  designerURL: string;
  manufacturer: string;
  manufacturerURL: string;
  license: string;
  licenseURL: string;
  description: string;
  trademark: string;
};

const nameIDS = [
  "copyright", // NameID 0
  "fontFamily", // NameID 1
  "fontSubfamily", // NameID 2
  "uniqueID", // NameID 3
  "fullName", // NameID 4
  "version", // NameID 5
  "postScriptName", // NameID 6
  "trademark", // NameID 7
  "manufacturer", // NameID 8
  "designer", // NameID 9
  "description", // NameID 10
  "manufacturerURL", // NameID 11
  "designerURL", // NameID 12
  "license", // NameID 13
  "licenseURL", // NameID 14
  "__RESERVED__", // NameID 15
  "preferredFamily", // NameID 16
  "preferredSubfamily", // NameID 17
  "__COMPATIBLE_FULL__", // NameID 18 @TODO Compatible Full (Macintosh Only)
  "sampleText", // NameID 19
  "__POSTSCRIPT_CID__", // NameID 20 @TODO
  "__WWS_FAMILY_NAME__", // NameID 21 @TODO
  "__WWS_SUB_FAMILY_NAME__", // NameID 22 @TODO
  "__LIGHT_BACKGROUND_PALETTE__", // NameID 23 @TODO
  "__DARK_BACKGROUND_PALETTE__", // NameID 24 @TODO
  "variationsPostscript", // NameID 25 @TODO
] as const;

type NameID = (typeof nameIDS)[number];

export default class OTName extends OTBase {
  get(): FontName;
  get(id: NameID): string;
  get(id?: NameID) {
    if (!id) return this.getEnglish();
    return this.getEnglishName(id);
  }

  private getEnglish(): FontName {
    return {
      fullName: this.getEnglishName("fullName"),
      fontFamily:
        this.getEnglishName("preferredFamily") ||
        this.getEnglishName("fontFamily"),
      fontSubfamily:
        this.getEnglishName("preferredSubfamily") ||
        this.getEnglishName("fontSubfamily"),
      postScriptName: this.getEnglishName("postScriptName"),
      copyright: this.getEnglishName("copyright"),
      uniqueID: this.getEnglishName("uniqueID"),
      version: this.getEnglishName("version"),
      designer: this.getEnglishName("designer"),
      designerURL: this.getEnglishName("designerURL"),
      manufacturer: this.getEnglishName("manufacturer"),
      manufacturerURL: this.getEnglishName("manufacturerURL"),
      license: this.getEnglishName("license"),
      licenseURL: this.getEnglishName("licenseURL"),
      description: this.getEnglishName("description"),
      trademark: this.getEnglishName("trademark"),
    };
  }

  private getEnglishName(key: NameID): string {
    return this.font.getEnglishName(key) || "";
  }
}
