import "@/styles/global.scss";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { useEventListener } from "usehooks-ts";
import { ThemeProvider as ProviderTheme } from "next-themes";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";
import ProviderFileUpload from "@/components/ContextFileUpload";
import ProviderOpentype from "@/components/ContextOpentype";
import AccordionLinks from "@/components/Accordion/AccordionLinks";
import ProviderGlyph from "@/components/ContextGlyph";
import ProviderFont from "@/components/ContextFont";

function resizeHandler() {
    const doc = document.documentElement;
    const scrollBarWidth = window.innerWidth - doc.clientWidth;
    doc.style.setProperty("--scrollbar-width", `${scrollBarWidth}px`);
}

export default function App({ Component, pageProps }: AppProps) {
    useEventListener("resize", resizeHandler);
    useEffect(() => void resizeHandler(), []);

    return (
        <>
            <ProviderTheme
                enableSystem
                disableTransitionOnChange
                defaultTheme="system"
                themes={["dark", "light"]}
            >
                <Toaster
                    position="bottom-right"
                    containerStyle={{ inset: "var(--grid-unit)" }}
                    gutter={4}
                    toastOptions={{
                        style: {
                            border: "1px solid var(--grid-color)",
                            backgroundColor: "var(--accents-2)",
                            color: "var(--accents-12)",
                            borderRadius: "0.5em"
                        },
                        success: {
                            duration: 10000,
                            iconTheme: {
                                primary: "green",
                                secondary: "var(--accents-12)"
                            }
                        },
                        error: {
                            iconTheme: {
                                primary: "red",
                                secondary: "var(--accents-12)"
                            }
                        }
                    }}
                />
                <AccordionLinks />
                <ProviderFileUpload>
                    <ProviderOpentype>
                        <ProviderFont>
                            <ProviderGlyph>
                                <AnimatePresence
                                    mode="wait"
                                    initial={false}
                                    onExitComplete={() => window.scrollTo(0, 0)}
                                >
                                    <Component {...pageProps} />
                                </AnimatePresence>
                            </ProviderGlyph>
                        </ProviderFont>
                    </ProviderOpentype>
                </ProviderFileUpload>
            </ProviderTheme>
        </>
    );
}
