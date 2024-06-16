import Icon from "../Icon";
import Toggle from "./Toggle";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { cn } from "@/libs/utils";

export default function ThemeSelector() {
  const [mounted, setMounted] = useState(false);
  const { themes, theme, resolvedTheme, setTheme } = useTheme();
  useEffect(() => void setMounted(true), []);

  if (!mounted) return null;
  const isSystem = theme === "system";
  const isLight = resolvedTheme === "light";
  const isDark = resolvedTheme === "dark";
  return (
    <>
      <Toggle
        value={Number(isDark)}
        onClick={() => setTheme(isLight ? "dark" : "light")}
        icons={["dark_mode", "light_mode"]}
      />
      <button
        onClick={() => setTheme("system")}
        className={cn(
          "h-5",
          "aspect-square",
          "border",
          "rounded-full",
          "overflow-hidden",
          "p-[2px]",
          "bg-neutral-100",
          "dark:bg-neutral-900",
          isSystem && "bg-emerald-300 dark:bg-emerald-300",
        )}
      >
        <Icon icon="devices" />
      </button>
    </>
  );
}
