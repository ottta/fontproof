import useFont from "@/hooks/use-font";
import { IMetric } from "@/types/metrics";
import { useEffect, useState } from "react";

type MetricName = "hhea" | "typo" | "win";

interface MetricState {
    ascent: number;
    descent: number;
    unitsPerEm: number;
    capHeight: number;
    xHeight: number;
}

type useMetricTextProps = {
    use: MetricName;
    fontSize: number;
    lineHeight: number;
    fontMetric: IMetric;
};
function useMetricText(props: useMetricTextProps) {
    const { use, fontMetric, fontSize, lineHeight } = props;
    const [metrics, setMetrics] = useState<MetricState>({
        ascent: fontMetric.ascender,
        descent: fontMetric.descender,
        unitsPerEm: fontMetric.unitsPerEm,
        capHeight: fontMetric.capHeight,
        xHeight: fontMetric.xHeight
    });

    // useEffect(() => {
    //     setMetrics((prev) => ({
    //         ascent: fontMetric.ascender,
    //         descent: fontMetric.descender,
    //         unitsPerEm: fontMetric.unitsPerEm,
    //         capHeight: fontMetric.capHeight,
    //         xHeight: fontMetric.xHeight
    //     }));
    // }, [use, fontMetric]);

    const lineHeightRatio = lineHeight;
    const upm = metrics.unitsPerEm;
    const capHeightRatio = metrics.capHeight / upm;
    const xHeightRatio = metrics.xHeight / upm;
    const ascenderRatio = metrics.ascent / upm;
    const descenderRatio = metrics.descent / upm;

    const baselineRatio = descenderRatio * -1;
    const boundingBoxRatio = (metrics.ascent + Math.abs(metrics.descent)) / upm;
    const lineGapRatio = lineHeightRatio - boundingBoxRatio;
    const originOffset = (lineGapRatio / 2) * fontSize;

    const baselineOffset = originOffset + baselineRatio + fontSize;
    const ascenderOffset = baselineOffset + ascenderRatio * fontSize;
    const capHeightOffset = baselineOffset + capHeightRatio * fontSize;
    const xHeightOffset = baselineOffset + xHeightRatio * fontSize;
    const descenderOffset = baselineOffset + descenderRatio * fontSize;

    return {
        baselineOffset,
        ascenderOffset,
        capHeightOffset,
        xHeightOffset,
        descenderOffset,
        lineHeightRatio,
        boundingBoxRatio,
        lineGapRatio,
        originOffset,
        fontSize,
        lineHeight
    };
}

export default function TextMetric() {
    const { font } = useFont();
    const {
        fontSize,
        lineHeight,
        baselineOffset,
        xHeightOffset,
        descenderOffset,
        ascenderOffset,
        originOffset
    } = useMetricText({
        use: "hhea",
        fontMetric: font.metrics,
        fontSize: 200,
        lineHeight: 1.6
    });

    return (
        <div
            style={{
                position: "relative",
                height: "calc(var(--grid-unit) * 10)",
                overflow: "hidden",
                border: "1px solid",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            <div style={{ border: "1px solid", position: "relative", marginBlock: "3em" }}>
                <div
                    style={{
                        position: "absolute",
                        bottom: ascenderOffset,
                        width: "100%",
                        borderBottom: "1px solid blue"
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        bottom: baselineOffset,
                        width: "100%",
                        borderBottom: "1px solid red"
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        bottom: descenderOffset,
                        width: "100%",
                        borderBottom: "1px solid red"
                    }}
                />
                <div style={{ fontFamily: font.names.postScriptName, fontSize, lineHeight }}>
                    Hxfg
                </div>
            </div>
        </div>
    );
}
