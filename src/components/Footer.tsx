import NextLink from "next/link";

import { cn } from "@/libs/utils";

export default function Footer() {
  return (
    <>
      <div
        data-blur="bottom-top"
        className={cn(
          "fixed",
          "h-12",
          "bottom-0",
          "right-0",
          "left-0",
          "z-20",
          "touch-none",
          "pointer-events-none",
          "select-none",
          // "bg-gradient-to-t",
          // "from-neutral-100",
          // "dark:from-neutral-900",
          // "to-transparent",
        )}
      />
      <footer
        data-container
        data-grid
        className={cn(
          "text-neutral-500",
          "h-12",
          "items-center",
          "z-50",
          "fixed",
          "bottom-0",
          "right-0",
          "left-0",
          "overflow-hidden",
          "text-xs",
        )}
      >
        <div className={cn("col-span-2", "px-3")}>
          &copy;2019–{new Date().getFullYear()}{" "}
          <NextLink
            href="https://unforma.club"
            target="_blank"
            rel="noopener noreferrer"
          >
            Unforma Club
          </NextLink>
          .
        </div>
      </footer>
    </>
  );
}
