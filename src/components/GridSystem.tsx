import { cn } from "@/libs/utils";

export default function GridSystem() {
  const gris = 12;
  return (
    <ul
      className={cn(
        "fixed",
        "inset-0",
        "-z-10",
        // "z-50",
        "pointer-events-none",
        "touch-none",
        "grid",
        "grid-cols-12",
        "gap-x-4",
        "px-16"
      )}
    >
      {Array(gris)
        .fill("")
        .map((_, i) => (
          <li key={i} className={cn("border-x", "h-full", "bg-red-500/0")}></li>
        ))}
    </ul>
  );
}
