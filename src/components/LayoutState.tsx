import Grid from "./Grid";

import type { CSSProperties, PropsWithChildren } from "react";

type LayoutStateProps = PropsWithChildren<{
  style?: CSSProperties;
  className?: string;
}>;

export default function LayoutState(props: LayoutStateProps) {
  const { children, style } = props;
  return (
    <Grid
      direction="horizontal"
      paddingInline
      style={{
        ...style,
        transition: "background-color 300ms cubic-bezier(0.5, 0, 0, 0.5)"
      }}
    >
      <Grid
        direction="vertical"
        style={{
          minHeight: "100vh",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "var(--font-display)",
          lineHeight: 1,
          textAlign: "center",
          WebkitTextStroke: 1,
          WebkitTextStrokeColor: "var(--accents-12)",
          WebkitTextFillColor: "var(--ufcb-porche)"
        }}
      >
        {children}
      </Grid>
    </Grid>
  );
}
