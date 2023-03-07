import type { PropsWithChildren } from "react";
import { motion } from "framer-motion";
import useFileUpload from "@/hooks/use-file-upload";
import useFont from "@/hooks/use-font";
import useOpentypeData from "@/hooks/use-opentype-data";
import Grid from "./Grid";

type LayoutProps = PropsWithChildren<{}>;
export default function Layout(props: LayoutProps) {
    const { children } = props;
    const { fonts } = useOpentypeData();
    const { font } = useFont();
    const { isDragActive } = useFileUpload();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "just", delay: 0.1 }}
        >
            {(!font || fonts.length <= 0) && !font ? (
                <Grid
                    direction="horizontal"
                    paddingInline
                    style={{
                        backgroundColor: isDragActive ? "var(--ufcb-porche)" : "initial",
                        transition: "background-color 100ms cubic-bezier(0.5, 0, 0, 0.5)"
                    }}
                >
                    <Grid direction="vertical">
                        <div
                            style={{
                                minHeight: "100vh",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            <div
                                style={{
                                    fontFamily: "Lug Straight",
                                    textAlign: "center",
                                    fontSize: "4vw",
                                    lineHeight: 1
                                }}
                            >
                                Drag &amp; Drop
                                <br />
                                Font Files
                                <br />
                                Anywhere...
                                {/* Fontproof by
                                <br />
                                Unforma Club
                                <br />
                                In Layout */}
                            </div>
                        </div>
                    </Grid>
                </Grid>
            ) : (
                children
            )}
        </motion.div>
    );
}
