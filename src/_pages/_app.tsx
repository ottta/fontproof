import "@/styles/global.scss";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useEventListener } from "usehooks-ts";
import { ThemeProvider as ProviderTheme } from "next-themes";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";
import nProgress from "nprogress";

import ProviderFileUpload from "@/components/ContextFileUpload";
import ProviderOpentype from "@/components/ContextOpentype";
import ProviderGlyph from "@/components/ContextGlyph";
import ProviderFont from "@/components/ContextFont";

nProgress.configure({
    showSpinner: true,
    easing: "ease-in-out",
    speed: 250,
    minimum: 0.01,
    trickleSpeed: 200
});

function resizeHandler() {
    const doc = document.documentElement;
    const scrollBarWidth = window.innerWidth - doc.clientWidth;
    doc.style.setProperty("--scrollbar-width", `${scrollBarWidth}px`);
}

export default function App({ Component, pageProps }: AppProps) {
    const { events } = useRouter();

    useEventListener("resize", resizeHandler);
    useEffect(() => void resizeHandler(), []);
    useEffect(() => {
        const handleStart = () => nProgress.start();
        const handleStop = (url: string) => nProgress.done();

        events.on("routeChangeStart", handleStart);
        events.on("routeChangeComplete", handleStop);
        events.on("routeChangeError", handleStop);

        return () => {
            events.off("routeChangeStart", handleStart);
            events.off("routeChangeComplete", handleStop);
            events.off("routeChangeError", handleStop);
        };
    }, [events]);

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
                            borderRadius: "0.5em",
                            fontSize: "0.65em"
                        },
                        success: {
                            duration: 1000,
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
