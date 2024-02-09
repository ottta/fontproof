"use client";

import { ThemeProvider as ProviderTheme } from "next-themes";
import { PropsWithChildren, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useEventListener } from "usehooks-ts";

import ProviderFileUpload from "@/components/ContextFileUpload";
import ProviderFont from "@/components/ContextFont";
import ProviderGlyph from "@/components/ContextGlyph";
import ProviderOpentype from "@/components/ContextOpentype";

function resizeHandler() {
  const doc = document.documentElement;
  const scrollBarWidth = window.innerWidth - doc.clientWidth;
  doc.style.setProperty("--scrollbar-width", `${scrollBarWidth}px`);
}

export default function Providers(props: PropsWithChildren) {
  const { children } = props;
  useEventListener("resize", resizeHandler);
  useEffect(() => void resizeHandler(), []);

  return (
    <ProviderTheme
      enableSystem
      disableTransitionOnChange
      defaultTheme="system"
      themes={["dark", "light"]}
    >
      <Toaster position="bottom-right" gutter={4} />

      <ProviderFileUpload>
        <ProviderOpentype>
          <ProviderFont>
            <ProviderGlyph>{children}</ProviderGlyph>
          </ProviderFont>
        </ProviderOpentype>
      </ProviderFileUpload>
    </ProviderTheme>
  );
}
