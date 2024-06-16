import { IconType, iconPaths } from "../Icon";

import { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from "react";

import { cn } from "@/libs/utils";

function Icon({ children }: { children: ReactNode }) {
  return (
    <div
      className={cn(
        "relative",
        "text-center",
        "p-[2px]",
        "select-none",
        "pointer-events-none",
        "touch-none",
        "text-3xs",
        "text-neutral-700",
        "h-full",
        "aspect-square",
        "inline-flex",
        "items-center",
        "justify-center",
        "overflow-hidden",
      )}
    >
      {children}
    </div>
  );
}

interface ToggleProps extends InputHTMLAttributes<HTMLInputElement> {
  icons?: [left: IconType, right: IconType];
  sizes?: "small" | "medium" | "large";
}
export default function Toggle(props: ToggleProps) {
  const { value, icons, sizes = "small", ...rest } = props;

  return (
    <label
      className={cn(
        "relative",
        "flex",
        "items-center",
        "border",
        "rounded-full",
        "overflow-hidden",
        "bg-neutral-100",
        "cursor-pointer",
        "!transition-[background-color]",
        "duration-100",
        "font-sans",
        value && "bg-emerald-300",
        sizes === "small"
          ? "h-5"
          : sizes === "medium"
            ? "h-6"
            : sizes === "large"
              ? "h-8"
              : "h-12",
      )}
    >
      <input
        {...rest}
        type="checkbox"
        className={cn("absolute", "left-0", "opacity-0", "cursor-pointer")}
      />

      {icons
        ? icons.map((icon, i) => (
            <Icon key={i}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                height="100%"
                width="100%"
              >
                {iconPaths[icon].map((path, i) => (
                  <path key={i} d={path} />
                ))}
              </svg>
            </Icon>
          ))
        : ["ON", "OFF"].map((icon, i) => <Icon key={i}>{icon}</Icon>)}

      <span
        className={cn(
          "inline-block",
          "aspect-square",
          "absolute",
          "left-0",
          "top-0",
          "bottom-0",
          "h-full",
          "bg-neutral-100",
          "dark:bg-emerald-800",
          "rounded-full",
          "shadow-[0_0_0.5rem_-0.25rem]",
          "shadow-neutral-800",
          "dark:shadow-neutral-200",
          value && "translate-x-full",
          "!transition-transform",
          "duration-100",
        )}
      />
    </label>
  );
}
