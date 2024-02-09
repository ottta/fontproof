"use client";

import GlobalSetting from "../GlobalSetting";

import styles from "@/styles/modules/accordion.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";

import { accordionLinks } from "@/libs/config";
import { cn } from "@/libs/utils";

import useFileUpload from "@/hooks/use-file-upload";

export default function AccordionLinks() {
  const pathname = usePathname();
  const [isSetting, setIsSetting] = useState(false);

  const activeGlyphs = pathname === "/technicals";
  const activeReports = pathname === "/reports";
  const refDrawer = useRef<HTMLDivElement>(null);
  useOnClickOutside(refDrawer, () => setIsSetting(false));

  const { isDragActive } = useFileUpload();
  return (
    <div
      className={cn(
        "fixed",
        "inset-0",
        "grid",
        "grid-cols-12",
        "gap-x-4",
        "px-16"
      )}
    >
      {accordionLinks.map((item, i) => {
        const isActive = item.path === pathname;
        const position =
          item.name === "index"
            ? "left"
            : item.name === "technicals" && (activeGlyphs || activeReports)
              ? "left"
              : item.name === "reports" && activeReports
                ? "left"
                : "right";
        return (
          <NextLink
            key={i}
            href={item.path}
            // className={styles.link}
            data-name={item.name}
            data-active={isActive}
            data-position={position}
            data-setting={isSetting}
            data-drag-active={isDragActive}
            // className={cn("accordion")}
            className={cn(
              // "border-x",
              item.name === "technicals" &&
                position === "right" &&
                "col-start-11",
              item.name === "reports" && position === "right" && "col-start-12"
            )}
          >
            <div
              className={cn(
                // item.name !== "index" && "border-l",
                "w-full"
                // "border-b"
              )}
            >
              <div data-position={position}>
                <div data-position={position}>&larr;</div>
              </div>
              <div
                data-position={position}
                className={cn(
                  "rotate-180",
                  "w-full",
                  "text-xl",
                  "flex",
                  "items-center",
                  "uppercase"
                )}
                style={{
                  writingMode: "vertical-rl",
                  textOrientation: "mixed"
                }}
              >
                {/* {isActive && <>&deg;</>} */}
                {item.label}
              </div>
            </div>
          </NextLink>
        );
      })}

      <button
        className={cn("accordion")}
        onClick={() => setIsSetting((prev) => !prev)}
        data-position={isSetting ? "left" : "right"}
        data-name="settings"
        data-active={isSetting}
        data-drag-active={isDragActive}
        style={{
          appearance: "none",
          borderBlock: "none",
          borderRight: "none",
          cursor: "pointer",
          fontSize: "inherit"
        }}
      >
        <div
          className={styles.arrow}
          data-position={isSetting ? "left" : "right"}
        >
          <div data-position={isSetting ? "left" : "right"}>&larr;</div>
        </div>
        <div
          data-position={isSetting ? "left" : "right"}
          style={{
            transform: "rotate(180deg)",
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            width: "100%",
            fontSize: "1em",
            display: "flex",
            alignItems: "center",
            textTransform: "uppercase"
          }}
        >
          {isSetting && <>&deg;</>}
          Settings
        </div>
      </button>

      {/* <AnimatePresence initial={isSetting}>
        {isSetting && (
          <motion.div
            ref={refDrawer}
            initial={{ translateX: "100%" }}
            animate={{ translateX: "0%" }}
            exit={{ translateX: "100%" }}
            transition={{ duration: 0.05, type: "tween" }}
            style={{
              width:
                "calc(var(--drawer-setting-width) - var(--accordion-link-width) + 1px)",
              height: "100vh",
              position: "fixed",
              right: 0,
              zIndex: 2000,
              borderLeft: "1px solid var(--grid-color)",
              backgroundColor: "var(--accents-2)"
            }}
          >
            <GlobalSetting />
          </motion.div>
        )}
      </AnimatePresence> */}
    </div>
  );
}
