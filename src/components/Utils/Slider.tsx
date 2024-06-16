import { InputHTMLAttributes } from "react";

import { cn } from "@/libs/utils";

interface SliderProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function Slider(props: SliderProps) {
  const { label, value, ...rest } = props;
  return (
    <label>
      <div
        style={{ fontFeatureSettings: `"tnum"` }}
        className={cn("text-xs", "flex", "justify-between")}
      >
        <div>{label}</div>
        <div>{value}</div>
      </div>
      <div className={cn("flex", "items-center")}>
        <button
          className={cn(
            "h-5",
            "aspect-square",
            "rounded-full",
            "p-0",
            "m-0",
            "border",
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            height="100%"
            width="100%"
          >
            <path d="M393.15-327.62 632.38-480 393.15-632.38v304.76Zm87.01 224.54q-77.6 0-146.33-29.82-68.72-29.83-119.96-81.1-51.23-51.27-81.01-119.8-29.78-68.53-29.78-146.04 0-78.22 29.82-147.13 29.83-68.92 81.1-119.91 51.27-50.98 119.8-80.51 68.53-29.53 146.04-29.53 78.22 0 147.14 29.69 68.92 29.69 119.9 80.6 50.98 50.9 80.51 119.62 29.53 68.72 29.53 146.85 0 77.6-29.57 146.33-29.58 68.72-80.6 119.96-51.02 51.23-119.74 81.01-68.72 29.78-146.85 29.78Zm-.21-43.84q138.63 0 235.88-97.52 97.25-97.51 97.25-235.51 0-138.63-97.21-235.88-97.2-97.25-235.82-97.25-138.01 0-235.57 97.21-97.56 97.2-97.56 235.82 0 138.01 97.52 235.57 97.51 97.56 235.51 97.56ZM480-480Z" />
          </svg>
        </button>

        <input
          type="range"
          value={value}
          // step={range === 1 ? 0.1 : 1}
          // min={min}
          // max={max}
          {...rest}
        />

        {/* <button
          type="reset"
          className={cn(
            "h-5",
            "aspect-square",
            // "bg-blue-300",
            "rounded-full",
            "p-0",
            "m-0",
            "border",
          )}
          // onClick={() => reset(item.tag)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            height="100%"
            width="100%"
          >
            <path d="M442.12-150.54q-110.31-13.81-182.58-96.48-72.27-82.67-72.27-193.79 0-60.8 24.48-116.13t68.67-96.52l40.04 39.84q-38.15 33-57.69 77.83t-19.54 94.98q0 87.69 55.94 154 55.95 66.31 142.95 80.31v55.96Zm75.96.77v-55.96q86.11-16.54 142.65-82.25 56.54-65.71 56.54-152.83 0-98.88-69.19-168.07-69.2-69.2-168.08-69.2h-15.77l55.62 55.62-39.23 39.42-122.93-122.92 122.93-122.92 39.23 39.23-55.62 55.61H480q122.31 0 207.77 85.46 85.46 85.47 85.46 207.77 0 110.81-72.71 193.19-72.71 82.39-182.44 97.85Z" />
          </svg>
        </button> */}
      </div>
    </label>
  );
}
