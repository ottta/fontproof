"use client";

import { cn } from "@/libs/utils";

import Aside from "@/components/Aside";
import { useFont } from "@/components/ProviderFont";
import { CustomFont } from "@/components/ProviderFonts";

export default function Page() {
  const { font } = useFont();
  if (!font) return null;
  return <Comp font={font} />;
}

function Comp({ font }: { font: CustomFont }) {
  return (
    <div data-container data-grid className={cn("py-16")}>
      <Aside>
        <div>Info</div>
      </Aside>

      <ul
        className={cn(
          "col-span-9",
          // "border",
          // "border-dotted",
          // "bg-neutral-50",
          // "dark:bg-neutral-700",
        )}
      >
        {[
          ["Full Name", font.names.fullName || "-"],
          ["Family", font.names.fontFamily || "-"],
          ["SubFamily", font.names.fontSubfamily || "-"],
          ["Postscript Name", font.names.postScriptName || "-"],
          [
            "Designer",
            `<a href=${font.names.designerURL || "#"} target="_blank" rel="noopener noreferrer">
                ${font.names.designer || "-"}
              </a>`,
          ],
          [
            "Manufacturer",
            `<a href=${font.names.manufacturerURL || "#"} target="_blank" rel="noopener noreferrer">
                ${font.names.manufacturer || "-"}
              </a>`,
          ],
          ["Copyright", font.names.copyright || "-"],
          [
            "License",
            `<a href=${font.names.licenseURL || "#"} target="_blank" rel="noopener noreferrer">${font.names.license || "-"}</a>`,
          ],
          ["Description", font.names.description || "-"],
          // font.instances
          //   ? [
          //       "Instances",
          //       `<pre>${JSON.stringify(font.instances, null, 2)}</pre>`,
          //     ]
          //   : [],
          // [
          //   "Axes",
          //   font.axes
          //     ? `<pre>${JSON.stringify(font.axes, null, 2)}</pre>`
          //     : "-",
          // ],
        ].map((item, i) => {
          const [key, value] = item;
          return (
            <li key={i} className={cn("p-2")}>
              <div className={cn("text-xs", "font-bold", "text-neutral-400")}>
                {key}
              </div>
              <div dangerouslySetInnerHTML={{ __html: value }} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
