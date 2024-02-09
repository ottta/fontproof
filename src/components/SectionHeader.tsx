import { DetailedHTMLProps, HTMLAttributes } from "react";

import { cn } from "@/libs/utils";

interface SectionHeaderProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {}

export default function SectionHeader(props: SectionHeaderProps) {
  const { children, ...rest } = props;
  return (
    <header
      {...rest}
      className={cn(
        "sticky",
        "top-0",
        "h-12",
        "flex",
        "items-center",
        "justify-between",
        "bg-neutral-50 dark:bg-neutral-950",
        "border-b",
        "overflow-hidden",
        "z-10",
        "border-x",
        "px-4"
      )}
    >
      {children}
    </header>
  );
}
