import { DetailedHTMLProps, HTMLAttributes } from "react";

interface SectionHeaderProps extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {}

export default function SectionHeader(props: SectionHeaderProps) {
    const { children, ...rest } = props;
    return (
        <header
            {...rest}
            style={{
                position: "sticky",
                top: -1,
                height: "calc(var(--grid-unit) + 1px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "var(--accents-2)",
                border: "1px solid var(--grid-color)",
                paddingInline: "calc(var(--site-padding) * 1)",
                zIndex: 100,
                fontFamily: "var(--font-display)",
                ...rest.style
            }}
        >
            {children}
        </header>
    );
}
