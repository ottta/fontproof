import { useMemo } from "react";

type LayerFont = {
    name: string;
    fontWeight: number;
    fontStyle: "italic" | "normal";
    fontStretch: number;
};

type useLayerFontProps = {
    text: string;
    fonts: LayerFont[];
};

export default function useLayerFont(props: useLayerFontProps) {
    const { text, fonts } = props;
    const texts = useMemo(
        () =>
            fonts
                .sort((a, b) => a.fontStretch - b.fontStretch)
                .map((item, i) => {
                    return {
                        text,
                        fontWeight: item.fontWeight,
                        fontStretch: item.fontStretch,
                        fontStyle: item.fontStyle,
                        fontFamily: item.name
                    };
                }),
        []
    );
    return texts;
}
