"use client";

import { useAgent } from "../Providers/ProviderAgent";

import { useWindowInfo } from "@faceless-ui/window-info";

import { cn } from "@/libs/utils";

import useClient from "@/hooks/use-client";

export default function SiteDimension() {
  const isClient = useClient();
  const { width, height } = useWindowInfo();
  const { browser, engine, os } = useAgent();
  if (!isClient) return null;
  return (
    <div
      style={{ fontFeatureSettings: `"tnum"` }}
      className={cn(
        "grid",
        "grid-cols-3",
        "gap-2",
        "text-xs",
        "leading-tight",
        // "bg-red-500",
        "w-full",
      )}
    >
      <div className={cn("px-3", "overflow-hidden")}>
        <div className={cn("text-2xs", "text-neutral-400")}>System</div>
        <div
          className={cn(
            "whitespace-nowrap",
            "overflow-hidden",
            "text-ellipsis",
          )}
        >
          {os.name} – {os.version}
        </div>
      </div>

      <div className={cn("px-3", "overflow-hidden")}>
        <div className={cn("text-2xs", "text-neutral-400")}>Engine</div>
        <div
          className={cn(
            "whitespace-nowrap",
            "overflow-hidden",
            "text-ellipsis",
          )}
        >
          {engine.name} – {engine.version}
        </div>
      </div>

      {/* <div className={cn("px-3", "overflow-hidden")}>
        <div className={cn("text-2xs", "text-neutral-400")}>Browser</div>
        <div
          className={cn(
            "whitespace-nowrap",
            "overflow-hidden",
            "text-ellipsis",
          )}
        >
          {browser.name} – {browser.version}
        </div>
      </div> */}

      <div className={cn("px-3", "overflow-hidden")}>
        <div className={cn("text-2xs", "text-neutral-400")}>Dimension</div>
        <div
          className={cn(
            "whitespace-nowrap",
            "overflow-hidden",
            "text-ellipsis",
          )}
        >
          {width}*{height}
        </div>
      </div>
    </div>
  );
}
