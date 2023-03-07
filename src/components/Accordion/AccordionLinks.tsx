import styles from "@/styles/modules/accordion.module.scss";
import { useRef, useState } from "react";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import { useOnClickOutside } from "usehooks-ts";
import NextLink from "next/link";
import { accordionLinks } from "@/libs/config";
import GlobalSetting from "../GlobalSetting";

export default function AccordionLinks() {
    const { pathname } = useRouter();
    const [isSetting, setIsSetting] = useState(false);

    const activeGlyphs = pathname === "/technicals";
    const activeReports = pathname === "/reports";
    const refDrawer = useRef<HTMLDivElement>(null);
    useOnClickOutside(refDrawer, () => setIsSetting(false));
    return (
        <>
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
                        className={styles.link}
                        data-name={item.name}
                        data-active={isActive}
                        data-position={position}
                        data-setting={isSetting}
                    >
                        <div className={styles.arrow} data-position={position}>
                            <div>&larr;</div>
                        </div>
                        <div
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
                            {isActive && <>&deg;</>}
                            {item.label}
                        </div>
                    </NextLink>
                );
            })}

            <button
                className={styles.link}
                onClick={() => setIsSetting((prev) => !prev)}
                data-position={isSetting ? "left" : "right"}
                data-name="settings"
                data-active={isSetting}
                style={{
                    appearance: "none",
                    borderBlock: "none",
                    borderRight: "none",
                    cursor: "pointer",
                    fontSize: "inherit"
                }}
            >
                <div className={styles.arrow} data-position={isSetting ? "left" : "right"}>
                    <div>&larr;</div>
                </div>
                <div
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

            <AnimatePresence initial={isSetting}>
                {isSetting && (
                    <motion.div
                        ref={refDrawer}
                        initial={{ translateX: "100%" }}
                        animate={{ translateX: "0%" }}
                        exit={{ translateX: "100%" }}
                        transition={{ duration: 0.05, type: "tween" }}
                        style={{
                            width: "calc(var(--drawer-setting-width) - var(--grid-unit) + 1px)",
                            height: "100vh",
                            position: "fixed",
                            right: 0,
                            backgroundColor: "var(--ufcb-porche)",
                            zIndex: 2000,
                            transition: "all 100ms cubic-bezier(0.075, 0.82, 0.165, 1)",
                            padding: "1em",
                            borderLeft: "1px solid var(--grid-color)"
                        }}
                    >
                        <GlobalSetting />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
