// https://learn.microsoft.com/en-us/typography/opentype/spec/os2#uswidthclass
export const WidthClass: {
  [key: number]: {
    value: number;
    description: string;
    cDefinition: string;
    percentOfNormal: number;
  };
} = {
  1: {
    value: 1,
    description: "Ultra Condensed",
    cDefinition: "FWIDTH_ULTRA_CONDENSED",
    percentOfNormal: 50,
  },
  2: {
    value: 2,
    description: "Extra Condensed",
    cDefinition: "FWIDTH_EXTRA_CONDENSED",
    percentOfNormal: 62.5,
  },
  3: {
    value: 3,
    description: "Condensed",
    cDefinition: "FWIDTH_CONDENSED",
    percentOfNormal: 75,
  },
  4: {
    value: 4,
    description: "Semi Condensed",
    cDefinition: "FWIDTH_SEMI_CONDENSED",
    percentOfNormal: 87.5,
  },
  5: {
    value: 5,
    description: "Medium (Normal)",
    cDefinition: "FWIDTH_NORMAL",
    percentOfNormal: 100,
  },
  6: {
    value: 6,
    description: "Semi Expanded",
    cDefinition: "FWIDTH_SEMI_EXPANDED",
    percentOfNormal: 112.5,
  },
  7: {
    value: 7,
    description: "Expanded",
    cDefinition: "FWIDTH_EXPANDED",
    percentOfNormal: 125,
  },
  8: {
    value: 8,
    description: "Extra Expanded",
    cDefinition: "FWIDTH_EXTRA_EXPANDED",
    percentOfNormal: 150,
  },
  9: {
    value: 9,
    description: "Ultra Expanded",
    cDefinition: "FWIDTH_ULTRA_EXPANDED",
    percentOfNormal: 200,
  },
};

// https://learn.microsoft.com/en-us/typography/opentype/spec/os2#usweightclass
export const WeightClass: {
  [key: number]: {
    value: number;
    description: string;
    cDefinition: string;
  };
} = {
  100: { value: 100, description: "Thin", cDefinition: "FW_THIN" },
  200: {
    value: 200,
    description: "ExtraLight (UltraLight)",
    cDefinition: "FW_EXTRALIGHT",
  },
  300: { value: 300, description: "Light", cDefinition: "FW_LIGHT" },
  400: {
    value: 400,
    description: "Normal (Regular)",
    cDefinition: "FW_NORMAL",
  },
  500: { value: 500, description: "Medium", cDefinition: "FW_MEDIUM" },
  600: {
    value: 600,
    description: "SemiBold (DemiBold)",
    cDefinition: "FW_SEMIBOLD",
  },
  700: { value: 700, description: "Bold", cDefinition: "FW_BOLD" },
  800: {
    value: 800,
    description: "ExtraBold (UltraBold)",
    cDefinition: "FW_EXTRABOLD",
  },
  900: { value: 900, description: "Black (Heavy)", cDefinition: "FW_BLACK" },
};
