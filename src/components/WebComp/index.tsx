import FontSelector from "../FontSelector";
import SectionHeader from "../SectionHeader";

import type {
  ButtonHTMLAttributes,
  CSSProperties,
  DetailedHTMLProps,
  HTMLAttributes
} from "react";

import { cn } from "@/libs/utils";

import useFont from "@/hooks/use-font";

interface LayoutComparerProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

function LayoutComparer(props: LayoutComparerProps) {
  const { children, ...rest } = props;
  return (
    <div
      {...rest}
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        width: "100%",
        ...rest.style
      }}
    >
      {children}
    </div>
  );
}

interface WebButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  defaultComp?: boolean;
  styled?: true;
}

function WebButton(props: WebButtonProps) {
  const { children, defaultComp, name, styled, ...rest } = props;
  const { font } = useFont();

  const customFont: CSSProperties = {
    fontFamily: font.names.postScriptName
  };

  const unStyleButton: CSSProperties = {
    font: "inherit",
    fontSize: "2.5em",
    color: "currentcolor",
    cursor: "pointer",
    fontWeight: font.names.fontFace.fontWeight.value,
    fontStyle: font.names.fontFace.fontStyle,
    fontStretch: `${font.names.fontFace.fontStretch.percentOfNormal}%`,
    overflow: "hidden"
  };
  const styledButton: CSSProperties = {
    ...unStyleButton,
    appearance: "none",
    background: "none",
    border: "1px solid var(--grid-color)",
    backgroundColor: "var(--accents-1)",
    borderRadius: "1em",
    paddingInline: "0.5em",
    boxShadow: "0 0 1em -0.15em var(--grid-color)",
    paddingBlock: 0,
    margin: 0
  };
  return (
    <LayoutComparer style={{ alignItems: "center" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5em",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <div>Font Default</div>
        <button
          {...rest}
          style={{
            ...(!styled ? unStyleButton : styledButton)
          }}
        >
          {children}
        </button>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5em",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <div className={cn("line-clamp-1")}>{font.names.fullName}</div>
        <button
          {...rest}
          style={{
            ...(!styled ? unStyleButton : styledButton),
            ...customFont
          }}
        >
          {children}
        </button>
      </div>
    </LayoutComparer>
  );
}

export default function WebComp() {
  const buttonText = "Àmigoś";
  return (
    <div>
      <SectionHeader>
        <div style={{ fontSize: "2em" }}>Web Component</div>
        <div>
          <FontSelector />
        </div>
      </SectionHeader>

      <LayoutComparer>
        <WebButton className={cn("border")} name="Default Unstyled">
          {buttonText}
        </WebButton>
        <WebButton className={cn("border")} name="Default Unstyled" styled>
          {buttonText}
        </WebButton>
      </LayoutComparer>
    </div>
  );
}
