"use client";

import { ReactNode, createContext, useContext, useEffect } from "react";
import { useBoolean } from "usehooks-ts";

type ContextRullerAttr = {
  active: boolean;
  toggle: () => void;
};
const ContextRuller = createContext<ContextRullerAttr>(undefined!);

export function useRuller() {
  const ruller = useContext(ContextRuller);
  if (!ruller) throw new Error("Must be inside <ProviderRuler />");
  return ruller;
}

export default function ProviderRuller({ children }: { children: ReactNode }) {
  const { value, toggle } = useBoolean();
  useEffect(() => {
    const handler = (e: globalThis.KeyboardEvent) => {
      // Adobe Illustrator shortcut (Cmd + ')
      if (e.metaKey && e.code === "Quote") {
        toggle();
      }
      // Custom shortcut (Opt + Cmd + G)
      if (e.altKey && e.metaKey && e.code === "KeyG") {
        toggle();
      }
    };

    document.body.addEventListener("keydown", handler);
    return () => document.body.removeEventListener("keydown", handler);
  }, []);
  return (
    <ContextRuller.Provider value={{ active: value, toggle }}>
      {children}
    </ContextRuller.Provider>
  );
}
