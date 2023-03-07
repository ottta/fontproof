// https://learn.microsoft.com/en-us/typography/opentype/spec/os2#uswidthclass
export const usWidthClass = [
    {
        value: 1,
        description: "Ultra Condensed",
        cDefinition: "FWIDTH_ULTRA_CONDENSED",
        percentOfNormal: 50
    },
    {
        value: 2,
        description: "Extra Condensed",
        cDefinition: "FWIDTH_EXTRA_CONDENSED",
        percentOfNormal: 62.5
    },
    {
        value: 3,
        description: "Condensed",
        cDefinition: "FWIDTH_CONDENSED",
        percentOfNormal: 75
    },
    {
        value: 4,
        description: "Semi Condensed",
        cDefinition: "FWIDTH_SEMI_CONDENSED",
        percentOfNormal: 87.5
    },
    {
        value: 5,
        description: "Medium (Normal)",
        cDefinition: "FWIDTH_NORMAL",
        percentOfNormal: 100
    },
    {
        value: 6,
        description: "Semi Expanded",
        cDefinition: "FWIDTH_SEMI_EXPANDED",
        percentOfNormal: 112.5
    },
    {
        value: 7,
        description: "Expanded",
        cDefinition: "FWIDTH_EXPANDED",
        percentOfNormal: 125
    },
    {
        value: 8,
        description: "Extra Expanded",
        cDefinition: "FWIDTH_EXTRA_EXPANDED",
        percentOfNormal: 150
    },
    {
        value: 9,
        description: "Ultra Expanded",
        cDefinition: "FWIDTH_ULTRA_EXPANDED",
        percentOfNormal: 200
    }
];

// https://learn.microsoft.com/en-us/typography/opentype/spec/os2#usweightclass
export const usWeightClass = [
    { value: 100, description: "Thin", cDefinition: "FW_THIN" },
    { value: 200, description: "ExtraLight (UltraLight)", cDefinition: "FW_EXTRALIGHT" },
    { value: 300, description: "Light", cDefinition: "FW_LIGHT" },
    { value: 400, description: "Normal (Regular)", cDefinition: "FW_NORMAL" },
    { value: 500, description: "Medium", cDefinition: "FW_MEDIUM" },
    { value: 600, description: "SemiBold (DemiBold)", cDefinition: "FW_SEMIBOLD" },
    { value: 700, description: "Bold", cDefinition: "FW_BOLD" },
    { value: 800, description: "ExtraBold (UltraBold)", cDefinition: "FW_EXTRABOLD" },
    { value: 900, description: "Black (Heavy)", cDefinition: "FW_BLACK" }
];
