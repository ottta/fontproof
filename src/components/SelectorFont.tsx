"use client";

import { useFont } from "./ProviderFont";
import { useFonts } from "./ProviderFonts";

import { groupBy } from "@/libs/utils";

export default function SelectorFont() {
  const { fonts } = useFonts();
  const { font, chooseFont } = useFont();
  if (!fonts) return;
  if (!font) return;
  const group = groupBy(fonts, (i) => (i.italic ? "Italic" : "Roman"));
  const groupKeys = Object.keys(group);

  return (
    <select
      value={font.names.postScriptName}
      onChange={(e) => chooseFont(e.target.value)}
    >
      {groupKeys.map((key, i) => (
        <optgroup label={key} key={i}>
          {/* @ts-ignore */}
          {group[key].map((item, i) => (
            <option key={i} value={item.names.postScriptName}>
              {item.names.fullName}
            </option>
          ))}
        </optgroup>
      ))}
    </select>
  );
}
