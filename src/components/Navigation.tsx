import NextLink from "next/link";

import { accordionLinks } from "@/libs/config";
import { cn } from "@/libs/utils";

export default function Navigation() {
  return (
    <nav
      className={cn(
        "fixed",
        "top-0",
        "bottom-0",
        "left-0",
        // "-translate-x-1/2",
        "z-50",
        "bg-neutral-50 dark:bg-neutral-950",
        "w-12",
        "border-r",
        "overflow-hidden"
      )}
    >
      <ul>
        {accordionLinks.map((item, i) => (
          <li key={i}>
            <NextLink href={item.path}>{item.label}</NextLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
