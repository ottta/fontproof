import { HTMLAttributes } from "react";

import { cn } from "@/libs/utils";

interface AsideProps extends HTMLAttributes<HTMLElement> {}

export default function Aside(props: AsideProps) {
  const { children, className, ...rest } = props;
  return (
    <aside {...rest} className={cn("col-span-3", className)}>
      <div className={cn("sticky", "top-16")}>{children}</div>
    </aside>
  );
}
