type Description = {
    value: number;
    description: string;
    cDefinition: string;
};

type DescriptionWithPercent = Description & {
    percentOfNormal: number;
};

export type IFontNames = {
    family: string;
    fullName: string;
    fontSubFamily: string;
    postScriptName: string;
    designer?: string;
    designerUrl?: string;
    manufacturer?: string;
    manufacturerUrl?: string;
    copyright?: string;
    license?: string;
    licenseUrl?: string;
    versions?: string[];
    uniqueIDs?: string[];
    sampleText?: string;
    description?: string;
    italicAngle: number;
    isFixedPitch: number;
    usWeightClass: number;
    fontFace: {
        fontStyle: "italic" | "normal";
        fontWeight: Description;
        fontStretch: DescriptionWithPercent;
    };
};
