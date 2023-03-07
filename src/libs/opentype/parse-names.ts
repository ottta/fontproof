import { IFontNames } from "@/types/names";
import { Font } from "opentype.js";
import { usWeightClass, usWidthClass } from "./os2";

class OpentypeParser {
    font: Font;
    constructor(font: Font) {
        this.font = font;
    }

    getFamily() {
        return (
            this.font.getEnglishName("preferredFamily") || this.font.getEnglishName("fontFamily")
        );
    }
    getFullName() {
        return this.font.getEnglishName("fullName");
    }
    getSubFamily() {
        return (
            this.font.getEnglishName("preferredSubfamily") ||
            this.font.getEnglishName("fontSubfamily")
        );
    }
    getPostScriptName() {
        return this.font.getEnglishName("postScriptName");
    }
    getDesigner() {
        return this.font.getEnglishName("designer") || undefined;
    }
    getDesignerUrl() {
        return this.font.getEnglishName("designerURL") || undefined;
    }

    getManufacturer() {
        return this.font.getEnglishName("manufacturer") || undefined;
    }

    getManufacturerUrl() {
        return this.font.getEnglishName("manufacturerURL") || undefined;
    }

    getCopyright() {
        return this.font.getEnglishName("copyright") || undefined;
    }

    getLicense() {
        return this.font.getEnglishName("license") || undefined;
    }
    getLicenseUrl() {
        return this.font.getEnglishName("licenseURL") || undefined;
    }
    getVersions() {
        const isExisted = this.font.getEnglishName("version");
        if (isExisted) {
            return this.font
                .getEnglishName("version")
                .split(";")
                .map((item) => item.trim());
        } else {
            return undefined;
        }
    }
    getUniqueIDs() {
        const isExisted = this.font.getEnglishName("uniqueID");
        if (isExisted) {
            return this.font
                .getEnglishName("uniqueID")
                .split(";")
                .map((item) => item.trim());
        } else {
            return undefined;
        }
    }
    getSampleText() {
        return this.font.getEnglishName("sampleText") || undefined;
    }
    getDescription() {
        return this.font.getEnglishName("description") || undefined;
    }
}

export default function parseNames(font: Font) {
    const otParse = new OpentypeParser(font);
    const postTable = font.tables["post"];
    const os2Table = font.tables["os2"];
    const data: IFontNames = {
        family: otParse.getFamily(),
        fullName: otParse.getFullName(),
        fontSubFamily: otParse.getSubFamily(),
        postScriptName: otParse.getPostScriptName(),
        designer: otParse.getDesigner(),
        designerUrl: otParse.getDesignerUrl(),
        manufacturer: otParse.getManufacturer(),
        manufacturerUrl: otParse.getManufacturerUrl(),
        copyright: otParse.getCopyright(),
        license: otParse.getLicense(),
        licenseUrl: otParse.getLicenseUrl(),
        versions: otParse.getVersions(),
        uniqueIDs: otParse.getUniqueIDs(),
        sampleText: otParse.getSampleText(),
        description: otParse.getDescription(),
        italicAngle: postTable.italicAngle,
        isFixedPitch: postTable.isFixedPitch,
        usWeightClass: os2Table.usWeightClass as number,
        fontFace: {
            fontStyle: postTable.italicAngle !== 0 ? "italic" : "normal",
            fontWeight: usWeightClass.find(
                (item) => item.value === (os2Table.usWeightClass as number)
            ) || {
                value: os2Table.usWeightClass as number,
                description: "Unknown",
                cDefinition: "UNKWN"
            },
            fontStretch: usWidthClass.find(
                (item) => item.value === (os2Table.usWidthClass as number)
            ) || {
                value: os2Table.usWidthClass as number,
                description: "Unknown",
                cDefinition: "UNKWN",
                percentOfNormal: 100
            }
        },
        // @ts-ignore
        all: font
    };

    return {
        ...data
        // reports: {
        //     family: isASCII(data.family) ? "Passed" : failedCheck("Family"),
        //     copyright: isASCII(data.copyright) ? "Passed" : failedCheck("Copyright"),
        //     designerUrl: isUrl(font.getEnglishName("designerURL"))
        //         ? "Passed"
        //         : failedCheck("Designer URL", true),
        //     manufacturerUrl: isUrl(font.getEnglishName("manufacturerURL"))
        //         ? "Passed"
        //         : failedCheck("Designer URL", true)
        // }
    };
}
