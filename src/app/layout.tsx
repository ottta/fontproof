import Providers from "./Providers";
import "./globals.css";

import { Georama, Open_Sans } from "next/font/google";
import localFont from "next/font/local";
import { ReactNode } from "react";

import { cn } from "@/libs/utils";

import GridSystem from "@/components/GridSystem";

type LayoutProps = {
  children: ReactNode;
};

const sans = localFont({
  display: "block",
  variable: "--font-sans",
  src: [
    {
      path: "../../public/Ordinal[slnt,wght].woff2",
      weight: "300 700",
      style: "normal"
    },
    {
      path: "../../public/Ordinal[slnt,wght].woff2",
      weight: "300 700",
      style: "italic"
    }
  ]
});

// const sans = Open_Sans({
//   display: "block",
//   subsets: ["latin", "latin-ext"],
//   variable: "--font-sans",
//   weight: "variable",
//   style: ["normal", "italic"]
// });

export default function RootLayout(props: LayoutProps) {
  const { children } = props;
  return (
    <html lang="en" suppressHydrationWarning className={cn(sans.variable)}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
