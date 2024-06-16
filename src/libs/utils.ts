import { ClassValue, clsx } from "clsx";

import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function groupBy<T, K extends keyof any>(list: T[], key: (i: T) => K) {
  return list.reduce(
    (groups, item) => {
      (groups[key(item)] ||= []).push(item);
      return groups;
    },
    {} as Record<K, T[]>,
  );
}

export function ASYNC_TIMEOUT(delay: number): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), delay);
  });
}

type CalcMetrics = {
  upm: number;
  typoAscender: number;
  typoDescender: number;
  hheaAscender: number;
  hheaDescender: number;
  lineGap?: number;
};
export function calcLineHeight({
  upm,
  typoAscender,
  typoDescender,
  hheaAscender,
  hheaDescender,
  lineGap = 0,
}: CalcMetrics) {
  // const tallest = Math.max(typoAscender, hheaAscender);
  // const deepest = Math.min(typoDescender, hheaDescender);
  const tallest = Math.max(hheaAscender);
  const deepest = Math.min(hheaDescender);
  return (tallest + Math.abs(deepest) + lineGap) / upm;
}
