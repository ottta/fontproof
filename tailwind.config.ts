import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", "[data-theme='dark']"],
  plugins: [require("@tailwindcss/typography")],
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "pattern-chuck": `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAAXNSR0IArs4c6QAAABxJREFUGFdjvHLlyn8dHR1GBiiAMzAEYCoxVAAAYNUIBclC/GQAAAAASUVORK5CYII=")`,
        "pattern-chuck-invert": `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAAXNSR0IArs4c6QAAABxJREFUGFdj5OLi+v/t2zdGBiiAMzAEYCoxVAAATeUIBYbFTy8AAAAASUVORK5CYII=")`,
        // "pattern-chuck": `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAAXNSR0IArs4c6QAAACJJREFUGFdjZEACT58+/c8I44M40tLSjGABGAfEZkTmgAQAC+oPs9ZqtlkAAAAASUVORK5CYII=")`,
        // "pattern-chuck-invert": `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAAXNSR0IArs4c6QAAACJJREFUGFdjZEAC4uLi/xlhfBDn5cuXjGABGAfEZkTmgAQAbIcNSSVevdoAAAAASUVORK5CYII=")`,
      },
      fontSize: {
        "2xs": "0.5625rem",
        "3xs": "0.375rem",
      },
      screens: {
        "3xl": "1800px",
      },
      gridTemplateColumns: {
        "13": "repeat(13, minmax(0, 1fr))",
        "14": "repeat(14, minmax(0, 1fr))",
        "15": "repeat(15, minmax(0, 1fr))",
        "16": "repeat(16, minmax(0, 1fr))",
        "17": "repeat(17, minmax(0, 1fr))",
        "18": "repeat(18, minmax(0, 1fr))",
        "19": "repeat(19, minmax(0, 1fr))",
        "20": "repeat(20, minmax(0, 1fr))",
        "21": "repeat(21, minmax(0, 1fr))",
        "22": "repeat(22, minmax(0, 1fr))",
        "23": "repeat(23, minmax(0, 1fr))",
        "24": "repeat(24, minmax(0, 1fr))",
      },
      typography: ({ theme }: any) => ({
        neutral: {
          css: {
            // "--tw-prose-body": theme("colors.neutral.900"),
            "--tw-prose-invert-body": theme("colors.neutral.400"),
            "--tw-prose-invert-headings": theme("colors.neutral.300"),
            "--tw-prose-invert-bold": theme("colors.red.500"),
          },
        },
      }),
    },
  },
};

export default config;
