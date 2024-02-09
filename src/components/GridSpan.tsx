import { DetailedHTMLProps, HTMLAttributes } from "react";

import { cn } from "@/libs/utils";

interface GridSpanProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  span?: number;
  bg?: boolean;
}

const spans = [
  "col-span-1",
  "col-span-2",
  "col-span-3",
  "col-span-4",
  "col-span-5",
  "col-span-6",
  "col-span-7",
  "col-span-8",
  "col-span-9",
  "col-span-10",
  "col-span-11",
  "col-span-12"
];
const cols = [
  "grid-cols-1",
  "grid-cols-2",
  "grid-cols-3",
  "grid-cols-4",
  "grid-cols-5",
  "grid-cols-6",
  "grid-cols-7",
  "grid-cols-8",
  "grid-cols-9",
  "grid-cols-10",
  "grid-cols-11",
  "grid-cols-12"
];

export default function GridSpan(props: GridSpanProps) {
  const { children, span = 1, bg = false } = props;
  return (
    <div
      className={cn(
        "grid",
        cols[span - 1],
        spans[span - 1],
        "gap-x-4",
        "relative",
        bg && "bg-neutral-50 dark:bg-neutral-950"
      )}
    >
      <ul
        className={cn(
          "absolute",
          "inset-0",
          "grid",
          cols[span - 1],
          spans[span - 1],
          "gap-x-4"
        )}
      >
        {Array(span)
          .fill("")
          .map((_, i) => (
            <li key={i} className={cn("border-x")}></li>
          ))}
      </ul>

      {children}
    </div>
  );
}
