"use client";

import { DetailedHTMLProps, HTMLAttributes } from "react";

import proof from "@/libs/proof.json";
import { cn } from "@/libs/utils";

import { useFont } from "@/components/ProviderFont";
import { CustomFont } from "@/components/ProviderFonts";

export default function Page() {
  const { font } = useFont();
  if (!font) return null;
  return <Comp font={font} />;
}

interface ArticleProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {}
function Article(props: ArticleProps) {
  return (
    <article
      {...props}
      dangerouslySetInnerHTML={{
        __html: [
          `<p>${proof.Hoefler.Small}</p>`,
          `<br/>`,
          `<p>${proof.Hoefler.Capital}</p>`,
        ].join(""),
      }}
    />
  );
}

function Comp({ font }: { font: CustomFont }) {
  return (
    <div
      className={cn(
        "bg-neutral-50",
        "dark:bg-neutral-900",
        "min-h-screen",
        "py-16",
      )}
    >
      <div data-container data-grid>
        <div className={cn("col-span-6")}>
          <Article
            // style={{ fontFamily: "Times New Roman" }}
            className={cn(
              // Diff
              "font-georgia",
              // "font-helvetica",
              // "font-optima",
            )}
          />
        </div>
        <div className={cn("col-span-6", "col-start-7")}>
          <Article style={{ fontFamily: font.names.fontFamily }} />
        </div>
      </div>
    </div>
  );
}
