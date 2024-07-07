import Providers from "./Providers";
import "./globals.css";

import { Metadata } from "next";
import { headers } from "next/headers";
import { UAParser } from "ua-parser-js";

import { fontGeorgia } from "@/libs/fonts";
import { cn } from "@/libs/utils";

import Ruller from "@/components/Ruller";

export const metadata: Metadata = {
  title: {
    template: "%s | Unforma Club",
    default: "Fontproof by Unforma Club",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headerList = headers();
  const agent = headerList.get("user-agent");
  const ua = new UAParser(agent!);
  const browser = ua.getBrowser();
  const device = ua.getDevice();
  const os = ua.getOS();
  return (
    <html
      lang="en"
      data-browser={browser.name}
      data-device={device.vendor}
      data-os={os.name}
      suppressHydrationWarning
      className={cn(fontGeorgia.variable)}
    >
      <body>
        <Providers agent={agent}>
          <Ruller />
          {children}
        </Providers>
      </body>
    </html>
  );
}
