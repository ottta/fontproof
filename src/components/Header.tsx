"use client";

import Icon from "./Icon";
import { useRuller } from "./Providers/ProviderRuller";
// import SelectorFont from "./SelectorFont";
import SiteDimension from "./Utils/SiteDimension";
import ThemeSelector from "./Utils/ThemeSelector";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { useBoolean } from "usehooks-ts";

import { cn } from "@/libs/utils";

const staticLinks: { slug: string; label: string; icon: ReactNode }[] = [
  {
    slug: "/",
    label: "Overview",
    icon: <Icon icon="overview" className={cn("h-4")} />,
  },
  {
    slug: "/feature",
    label: "Feature",
    icon: <Icon icon="feature" className={cn("h-4")} />,
  },
  {
    slug: "/glyph",
    label: "Glyph",
    icon: <Icon icon="glyph" className={cn("h-4")} />,
  },
  {
    slug: "/info",
    label: "Info",
    icon: <Icon icon="info" className={cn("h-4")} />,
  },
  // {
  //   slug: "/specimen",
  //   label: "Specimen",
  //   icon: <Icon icon="specimen" className={cn("h-4")} />,
  // },
  // {
  //   slug: "/test",
  //   label: "Test",
  //   icon: <Icon icon="specimen" className={cn("h-4")} />,
  // },
];

type HeaderProps = {
  openFileDialog(): void;
};

function StaticMenu() {
  const pathname = usePathname();
  const { value, setFalse, setTrue } = useBoolean();
  const active = staticLinks.find((item) => item.slug === pathname);
  return (
    <menu onMouseLeave={setFalse} className={cn("relative", "col-span-4")}>
      <button
        onMouseOver={setTrue}
        className={cn(
          "h-8",
          "border",
          "pl-3",
          "flex",
          "items-center",
          "rounded-full",
          "bg-neutral-50",
          "dark:bg-neutral-800",
          "shadow",
          value && "shadow border-solid",
          value && "bg-neutral-50 dark:bg-neutral-800",
          "group",
        )}
      >
        <div
          className={cn(
            "shrink-0",
            "w-16",
            "overflow-hidden",
            "text-ellipsis",
            "whitespace-nowrap",
            "text-left",
          )}
        >
          {active?.label ?? "Overview"}
        </div>
        <div
          className={cn(
            "shrink-0",
            "h-full",
            "flex",
            "items-center",
            "justify-center",
            // "bg-red-400",
            "aspect-square",
            value && "rotate-90",
            "transition-all",
            "duration-300",
          )}
        >
          <Icon
            icon="chevron_right"
            className={cn(
              "bg-neutral-300",
              "dark:bg-neutral-700",
              "border",
              "border-dotted",
              "rounded-full",
              "h-5",
              "group-hover:shadow",
              "transition-all",
              "duration-300",
              value && "shadow",
            )}
          />
        </div>
      </button>

      {value && (
        <div
          className={cn(
            "absolute",
            "-bottom-0",
            "translate-y-full",
            "z-50",
            "pt-1",
            "min-w-36",
          )}
        >
          <ul
            className={cn(
              // "flex",
              // "gap-1",
              "text-neutral-500",
              "flex",
              "flex-col",
              "divide-y",
              "border",
              // "border-dotted",
              "divide-dotted",
              "bg-neutral-50",
              "dark:bg-neutral-700",
              "shadow",
              "rounded-lg",
              "overflow-hidden",
            )}
          >
            {staticLinks.map((item, i, arr) => {
              const isActive = pathname === item.slug;
              return (
                <li key={i}>
                  <NextLink
                    href={item.slug}
                    className={cn(
                      isActive && "text-neutral-950 dark:text-neutral-50",
                      // "border",
                      // "border-dotted",
                      "h-8",
                      "pr-3",
                      "pl-2",
                      "flex",
                      "items-center",
                      "bg-neutral-50",
                      "dark:bg-neutral-800",
                      "hover:bg-neutral-100",
                      "hover:dark:bg-neutral-950",
                      isActive && "border-solid",
                      isActive && "bg-neutral-100 dark:bg-neutral-950",
                      "flex",
                      "gap-2",
                    )}
                  >
                    {item.icon} {item.label}
                  </NextLink>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </menu>
  );
}

export default function Header(props: HeaderProps) {
  const { openFileDialog } = props;
  const { active, toggle } = useRuller();
  return (
    <>
      <div
        data-blur="top-bottom"
        className={cn(
          "fixed",
          "h-16",
          "top-0",
          "right-0",
          "left-0",
          "z-20",
          "touch-none",
          "pointer-events-none",
          "select-none",
          // "bg-gradient-to-b",
          // "from-neutral-100",
          // "dark:from-neutral-900",
          // "to-transparent",
        )}
      />

      <header
        data-container
        data-grid
        className={cn(
          "h-16",
          "items-center",
          "z-50",
          "fixed",
          "top-0",
          "right-0",
          "left-0",
          // "border-b",
        )}
      >
        <div className={cn("col-span-6", "flex", "gap-1", "items-center")}>
          <NextLink
            href="/"
            className={cn(
              "px-3",
              "bg-emerald-200",
              "dark:bg-emerald-400",
              "dark:text-neutral-900",
              "border",
              // "border-dotted",
              "h-8",
              "inline-flex",
              "items-center",
              "rounded-full",
              "shadow",
              // "hover:shadow",
              "hover:border-solid",
            )}
          >
            Unforma Club
            {/* Fontproof by Unforma Club */}
          </NextLink>
          <StaticMenu />
        </div>

        <div
          className={cn(
            "col-span-3",
            "overflow-hidden",
            "flex",
            "items-center",
            "gap-2",
          )}
        >
          {/* <SelectorFont /> */}
          <SiteDimension />
        </div>

        <div
          className={cn(
            "col-span-3",
            "flex",
            "justify-end",
            "items-center",
            "gap-1",
            "px-3",
          )}
        >
          <button onClick={openFileDialog}>Find</button>

          <button
            onClick={toggle}
            className={cn("h-5", "aspect-square", "border", "rounded-sm")}
          >
            <Icon icon={active ? "grid_off" : "grid_on"} />
          </button>
          <ThemeSelector />
        </div>
      </header>
    </>
  );
}
