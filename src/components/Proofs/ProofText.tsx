import { useEffect, useState } from "react";

import useFont from "@/hooks/use-font";

{
  /* <div>
    <button
        onClick={() => {
            const pdf = new jsPDF("p", "pt", "a4");

            const postScriptName = font.names.postScriptName;

            pdf.addFont(font.url as string, postScriptName, "normal");
            pdf.setFont(postScriptName, "normal");

            pdf.setFontSize(64);
            pdf.text(BASIC_CHARACTERS.join(""), 40, 80, { maxWidth: 515 });

            pdf.addPage();
            pdf.setFontSize(12);
            pdf.text(`${textProof.Kerning.kerning}\n\n${textProof.Kerning.trio}`, 40, 40, {
                maxWidth: 515,
                lineHeightFactor: 1.3
            });

            pdf.save(font.names.postScriptName);
        }}
    >
        PDF
    </button>
</div>; */
}

type ProofTextProps = {
  title: string;
  text: string;
  defaultFontSize?: number;
  defaultLineHeight?: number;
};

export default function ProofText(props: ProofTextProps) {
  const { text, defaultFontSize = 16, defaultLineHeight = 1.2, title } = props;
  const { font } = useFont();
  const [fontFamily, setFontFamily] = useState(font.names.postScriptName);
  const [fontSize, setFontSize] = useState(defaultFontSize);

  const lineHeight = (
    (font.metrics.hheaAscender + Math.abs(font.metrics.hheaDescender)) /
    font.metrics.unitsPerEm
  ).toFixed(2);

  useEffect(() => {
    setFontFamily(font.names.postScriptName);
  }, [font]);

  return (
    <div>
      <div>
        <aside>
          <div>
            <div>
              <div style={{ fontFeatureSettings: `"tnum"` }}>
                {fontSize}px – {fontSize * 0.75}pt
              </div>
              <input
                type="range"
                min={8}
                max={96}
                step={2}
                value={fontSize}
                onChange={(e) => setFontSize(e.target.valueAsNumber)}
              />
            </div>
          </div>
        </aside>

        <div>
          <div
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              gap: "calc(var(--grid-unit) * 1)",
              fontFamily: `"${fontFamily}", Times New Roman`,
              wordBreak: "break-word",
              overflow: "hidden",
              // aspectRatio: "620/877", // A4 Paper Size
              // aspectRatio: "877/620", // A4 Paper Size
              boxShadow: "0 0 1em -0.25em var(--grid-color)",
              // padding: "calc(var(--grid-unit) * 1.5) var(--grid-unit)",
              padding: "var(--grid-unit)",
              backgroundColor: "var(--accents-1)",
              border: "1px solid var(--grid-color)"
            }}
          >
            <div>
              <div style={{ fontSize: "2em" }}>{title}</div>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "space-between"
                  // height: "var(--grid-unit)"
                }}
              >
                <div>{fontFamily}</div>
                <div style={{ fontSize: "0.75em" }}>
                  {fontSize}px – {fontSize * 0.75}pt
                </div>
              </div>
            </div>

            <div
              style={{ fontSize, lineHeight }}
              dangerouslySetInnerHTML={{ __html: text }}
            />

            <div
              style={{
                // position: "absolute",
                // bottom: 0,
                // left: "var(--grid-unit)",
                // right: "var(--grid-unit)",
                // height: "var(--grid-unit)",
                display: "flex",
                alignItems: "flex-start"
              }}
            >
              <div>
                &copy;
                {font.names.manufacturer || font.names.designer || "Unknown"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
