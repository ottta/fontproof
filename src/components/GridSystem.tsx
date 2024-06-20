import { cn } from "@/libs/utils";

export default function GridSystem() {
  return (
    <div
      role="Grid System"
      className={cn(
        "fixed",
        "inset-0",
        "select-none",
        "pointer-events-none",
        "touch-none",
        "overflow-hidden",
      )}
    >
      <ul data-container data-grid className={cn("h-full", "relative")}>
        {Array.from({ length: 12 }).map((_, i) => (
          <li key={i} className={cn("border-x", "border-dotted")}>
            <div
              className={cn(
                "bg-pattern-chuck",
                "dark:bg-pattern-chuck-invert",
                "w-full",
                "h-full",
              )}
            />
          </li>
        ))}
        <li
          className={cn(
            "absolute",
            "top-0",
            "bottom-0",
            "left-5 lg:left-7",
            "w-[50vw]",
            "-translate-x-full",
            "border-r",
            "border-dotted",
            "bg-pattern-chuck",
            "dark:bg-pattern-chuck-invert",
          )}
        />
        <li
          className={cn(
            "absolute",
            "top-0",
            "bottom-0",
            "right-5 lg:right-7",
            "w-[50vw]",
            "translate-x-full",
            "border-l",
            "border-dotted",
            "bg-pattern-chuck",
            "dark:bg-pattern-chuck-invert",
          )}
        />
      </ul>
    </div>
  );
}
