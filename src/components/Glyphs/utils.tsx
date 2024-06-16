import { HTMLAttributes, LiHTMLAttributes, SVGProps, memo } from "react";

import { cn } from "@/libs/utils";

interface GlypGroupProps extends HTMLAttributes<HTMLUListElement> {}
export function GlyphGroup(props: GlypGroupProps) {
  const { children, ...rest } = props;
  return (
    <ul {...rest} className={cn("flex", "flex-col", "gap-y-1")}>
      {children}
    </ul>
  );
}

interface GlyphBlockProps extends HTMLAttributes<HTMLUListElement> {}
export function GlyphBlock(props: GlyphBlockProps) {
  const { children, ...rest } = props;
  return (
    <div className={cn("border", "overflow-hidden")}>
      <ul
        {...rest}
        className={cn(
          "grid",
          "grid-cols-8",
          "lg:grid-cols-10",
          "xl:grid-cols-12",
          "2xl:grid-cols-14",
          "3xl:grid-cols-16",
          // "3xl:grid-cols-20",
          "-mr-px",
          "-mt-px",
          "bg-neutral-100",
          "dark:bg-neutral-900",
        )}
      >
        {children}
      </ul>
    </div>
  );
}

interface GlyphThumbProps extends LiHTMLAttributes<HTMLLIElement> {
  isActive?: boolean;
}
export const GlyphThumb = memo((props: GlyphThumbProps) => {
  const { children, isActive = false, ...rest } = props;
  return (
    <li
      {...rest}
      className={cn(
        "relative",
        "border",
        "border-dotted",
        "-mb-px",
        "-ml-px",
        "overflow-hidden",
        "hover:bg-pattern-chuck",
        "hover:dark:bg-pattern-chuck-invert",
        "hover:border-solid",
        "hover:z-10",
        "bg-neutral-50",
        "dark:bg-neutral-800",
        isActive && "bg-pattern-chuck",
        isActive && "dark:bg-pattern-chuck-invert",
        isActive && "border-solid",
        isActive && "z-10",
        // "bg-neutral-50",
        // "dark:bg-neutral-700",
        // "hover:bg-neutral-100",
        // "dark:hover:bg-neutral-900",
        rest.className,
      )}
    >
      {children}
    </li>
  );
});

type GlyphThumbLabelProps = {
  label: (string | number | null)[];
};
export function GlyphThumbLabel(props: GlyphThumbLabelProps) {
  const { label } = props;
  return (
    <div
      className={cn(
        "border-b",
        "border-dotted",
        // "border-neutral-300",
        "w-full",
        "text-2xs",
        "h-5",
        "flex",
        "items-center",
        "px-3",
        "text-neutral-400",
      )}
    >
      <div
        className={cn("text-ellipsis", "whitespace-nowrap", "overflow-hidden")}
      >
        {label.join(", ")}
      </div>
    </div>
  );
}

interface GlyphSVGProps extends SVGProps<SVGSVGElement> {
  paths: string[];
  metrics?: {
    lsb: number;
    rsb: number;
    adv: number;
  };
}
export function GlyphSVG(props: GlyphSVGProps) {
  const { children, width, height, metrics, paths, ...rest } = props;
  return (
    <div
      className={cn(
        "aspect-square",
        "relative",
        "flex",
        "items-center",
        "justify-center",
        "overflow-hidden",
      )}
    >
      <div
        data-ratio={`${width}/${height}`}
        style={{ transform: `scale(${rest.scale})`, width: `${width}%` }}
        className={cn("relative", "h-full")}
      >
        {metrics && (
          <div
            data-lsb={metrics.lsb}
            data-rsb={metrics.rsb}
            style={{ fontFeatureSettings: `"tnum"` }}
            className={cn(
              "text-2xs",
              "absolute",
              "inset-0",
              "border-x",
              "before:content-[attr(data-lsb)]",
              "before:absolute",
              "before:bottom-1",
              "before:-left-2",
              "before:-translate-x-full",
              "before:px-1",
              "before:bg-neutral-300",
              "before:dark:bg-neutral-700",
              "before:rounded-full",
              "after:content-[attr(data-rsb)]",
              "after:absolute",
              "after:bottom-1",
              "after:-right-2",
              "after:translate-x-full",
              "after:px-1",
              "after:bg-neutral-300",
              "after:dark:bg-neutral-700",
              "after:rounded-full",
            )}
          >
            <div
              className={cn(
                "text-center",
                "absolute",
                "bottom-1",
                "left-1/2",
                "-translate-x-1/2",
                "bg-neutral-300",
                "dark:bg-neutral-700",
                "px-1",
                "rounded-full",
              )}
            >
              {metrics.adv}
            </div>
          </div>
        )}
        <svg
          {...rest}
          overflow="visible"
          height="100%"
          className={cn("relative", rest.className)}
        >
          {paths.map((item, i) => (
            <path key={i} d={item} />
          ))}
        </svg>
      </div>
    </div>
  );
}
