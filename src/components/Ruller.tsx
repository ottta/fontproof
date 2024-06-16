"use client";

import { useRuller } from "./Providers/ProviderRuller";

import { useState } from "react";
import { useEventListener } from "usehooks-ts";

import { cn } from "@/libs/utils";

export default function Ruller() {
  const { active } = useRuller();

  const [pos, setPos] = useState({ y: 500, x: 500 });
  const posHandler = (e: globalThis.MouseEvent) => {
    const { clientY, clientX } = e;
    setPos({ y: clientY, x: clientX });
  };
  useEventListener("mousemove", posHandler);

  return (
    active && (
      <div
        className={cn(
          "fixed",
          "inset-0",
          "pointer-events-none",
          "touch-none",
          "z-50",
        )}
      >
        <div
          style={{ top: pos.y - 0.5 }}
          className={cn(
            "absolute",
            "right-0 left-0",
            "border-b",
            "border-dotted",
            "shadow",
            "border-red-500",
            "dark:border-red-500",
          )}
        />
        <div
          style={{ left: pos.x - 0.5 }}
          className={cn(
            "absolute",
            "top-0 bottom-0",
            "border-r",
            "border-dotted",
            "shadow",
            "border-red-500",
            "dark:border-red-500",
          )}
        />
        <div
          style={{ top: pos.y, left: pos.x }}
          className={cn(
            "absolute",
            "w-2 h-2",
            "bg-current",
            "-translate-x-1/2",
            "-translate-y-1/2",
            "shadow",
          )}
        >
          <div
            className={cn(
              "absolute",
              "top-4",
              "left-4",
              "whitespace-nowrap",
              "font-mono",
              "font-bold",
              "text-2xs",
              "leading-normal",
              "border",
              "px-2",
              "py-1",
              "bg-emerald-200",
              "dark:bg-emerald-500",
              "text-neutral-900",
              "rounded",
              "shadow",
            )}
          >
            Y: {pos.y}
            <br />
            X: {pos.x}
          </div>
        </div>
      </div>
    )
  );
}
