"use client";

import { WindowInfoProvider as ProviderWindow } from "@faceless-ui/window-info";
import { ThemeProvider as ProviderTheme } from "next-themes";
import { ReactNode } from "react";
import { useDropzone } from "react-dropzone";
import { Toaster } from "react-hot-toast";

import { cn } from "@/libs/utils";

import Footer from "@/components/Footer";
import GridSystem from "@/components/GridSystem";
import Header from "@/components/Header";
import ProviderFont from "@/components/ProviderFont";
import ProviderFonts, { ConsumerFonts } from "@/components/ProviderFonts";
import ProviderAgent from "@/components/Providers/ProviderAgent";
import ProviderRuller from "@/components/Providers/ProviderRuller";

export default function Providers({
  children,
  agent,
}: {
  children: ReactNode;
  agent: string | null;
}) {
  const {
    acceptedFiles,
    isDragAccept,
    isDragReject,
    isDragActive,
    getInputProps,
    getRootProps,
    isFileDialogActive,
    open: openFileDialog,
  } = useDropzone({
    noClick: true,
    noKeyboard: true,
    accept: { "font/ttf": [], "font/otf": [], "application/font-woff": [] },
  });

  return (
    <ProviderTheme
      enableSystem
      disableTransitionOnChange
      defaultTheme="system"
      themes={["dark", "light"]}
    >
      <Toaster position="bottom-right" gutter={4} />

      <ProviderAgent agent={agent}>
        <ProviderWindow breakpoints={{}}>
          <ProviderRuller>
            <ProviderFonts files={acceptedFiles}>
              <ConsumerFonts>
                {({ fonts, isReadingOpentype }) => (
                  <ProviderFont>
                    <GridSystem />
                    {fonts && fonts.length > 0 && (
                      <>
                        <Header openFileDialog={openFileDialog} />
                        <Footer />
                      </>
                    )}

                    <main
                      {...getRootProps()}
                      className={cn(
                        "relative",
                        "min-h-screen",
                        "transition-[background-color]",
                        "duration-300",
                        isDragReject && "bg-red-500/30",
                        isDragAccept && "bg-neutral-400/50",
                      )}
                    >
                      {fonts && fonts.length > 0 ? (
                        children
                      ) : (
                        <div
                          data-grid
                          data-container
                          className={cn("items-center", "h-screen", "relative")}
                        >
                          <input {...getInputProps()} />

                          <div className={cn("col-span-3", "p-2")}>
                            <div
                              className={cn(
                                "p-6",
                                "border",
                                "text-3xl",
                                "bg-neutral-50",
                                "dark:bg-neutral-800",
                                "aspect-[4/5]",
                                "shadow",
                                "rounded-lg",
                                (isDragAccept || isFileDialogActive) &&
                                  "!bg-emerald-500",
                                "flex",
                                "flex-col",
                                "justify-between",
                                "transition-[background-color]",
                                "duration-300",
                              )}
                            >
                              {isDragActive && isDragAccept ? (
                                <>Drop everywhere...</>
                              ) : isDragActive && isDragReject ? (
                                <>We couldn&apos;t accept these files</>
                              ) : isReadingOpentype ? (
                                <>Reading opentype data...</>
                              ) : (
                                <div>
                                  Drag &amp; Drop your fonts
                                  <br />
                                  <button
                                    onClick={openFileDialog}
                                    className={cn(
                                      "border",
                                      "rounded-full",
                                      "text-base",
                                      "px-3",
                                    )}
                                  >
                                    Or click here
                                  </button>
                                </div>
                              )}
                              <div
                                className={cn("text-xs", "text-neutral-400")}
                              >
                                <p>
                                  Your font(s) stay locally in your browser.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </main>
                  </ProviderFont>
                )}
              </ConsumerFonts>
            </ProviderFonts>
          </ProviderRuller>
        </ProviderWindow>
      </ProviderAgent>
    </ProviderTheme>
  );
}
