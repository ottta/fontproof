import styles from "@/styles/modules/grid.module.scss";
import type { DetailedHTMLProps, HTMLAttributes } from "react";

interface GridProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    direction: "vertical" | "horizontal";
    paddingInline?: boolean;
}

export default function Grid(props: GridProps) {
    const { children, direction, paddingInline = false, ...rest } = props;
    delete rest.style?.backgroundImage;
    delete rest.style?.backgroundSize;
    delete rest.style?.backgroundRepeat;
    if (direction === "vertical") {
        delete rest.style?.backgroundColor;
    }
    return (
        <div
            {...rest}
            data-direction={direction}
            data-padding-inline={paddingInline}
            className={rest.className ? `${styles.container} ${rest.className}` : styles.container}
            style={rest.style}
        >
            {children}
        </div>
    );
}
