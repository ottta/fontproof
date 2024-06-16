import { useCallback, useEffect, useState } from "react";

import { OTVarAxis, OTVarInstance } from "@/libs/opentype/OTVariable";

type LocalAxis = {
  [key: string]: number;
};

type Props = {
  axes?: OTVarAxis[];
  instances?: OTVarInstance[];
};

export default function useFontVariable(props: Props) {
  const { axes: baseAxes, instances: baseInstances } = props;
  const [axes, setAxes] = useState<LocalAxis>();

  // //   const axes = Object.fromEntries(
  // //     listAxes.map((item) => [item.tag, { ...item, value: item.defaultValue }]),
  // //   ) as Record<string, CustomAxis>;

  useEffect(() => {
    if (!baseAxes) return;
    const compose = Object.fromEntries(
      baseAxes.map((item) => [item.tag, item.defaultValue]),
    );
    setAxes(compose);
  }, [baseAxes]);

  const reset = useCallback(
    (key: string) => {
      if (!baseAxes) return;
      const compose = Object.fromEntries(
        baseAxes.map((item) => [item.tag, item.defaultValue]),
      );
      setAxes((prev) => ({
        ...prev,
        [key]: compose[key],
      }));
    },
    [baseAxes],
  );

  const change = useCallback(
    (key: string, value: number) =>
      setAxes((prev) => ({
        ...prev,
        [key]: value,
      })),
    [],
  );

  return { axes, setAxes, reset, change };
}
