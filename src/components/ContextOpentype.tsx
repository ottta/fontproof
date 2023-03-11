import { PropsWithChildren, useMemo } from "react";
import type { IFont } from "@/types/font";
import { createContext, useCallback, useEffect, useState } from "react";
import { load } from "opentype.js";
import toast from "react-hot-toast";
import parseNames from "@/libs/opentype/parse-names";
import ParseGlyphs from "@/libs/opentype/parse-glyphs";
import parseMetrics from "@/libs/opentype/parse-metrics";
import nProgress from "nprogress";
import { IFileReader } from "@/types/files";
import LayoutState from "./LayoutState";
import useFileUpload from "@/hooks/use-file-upload";

type ContextOpentypeAttr = {
    fonts: IFont[];
    processOT: boolean;
};

export const ContextOpentype = createContext<ContextOpentypeAttr>(undefined!);
export const ConsumerOpentype = ContextOpentype.Consumer;

function installFontToTheDOM(fonts: IFont[]) {
    return Promise.all(
        fonts.map(async (item) => {
            const url = item.url;
            const family = item.names.postScriptName;
            const fontStyle = item.names.fontFace.fontStyle;
            const fontWeight = item.names.fontFace.fontWeight.value;
            const fontStretch = item.names.fontFace.fontStretch.percentOfNormal;
            try {
                const fontface = new FontFace(family, `url("${url}")`, {
                    style: fontStyle,
                    stretch: `${fontStretch}%`,
                    weight: fontWeight.toString()
                });
                await fontface.load().then((loaded) => {
                    const newName = loaded.family as string;
                    document.fonts.add(loaded);
                    console.log(
                        `%c>>> [new] ${newName} - ${loaded.weight} - ${loaded.style} - ${loaded.stretch}.`,
                        `color: #ff00ff;`
                    );
                });
            } catch (error) {
                console.log(error);
            }

            return Promise.resolve();
        })
    );
}

type ComponentProps = PropsWithChildren<{
    files: IFileReader[];
}>;
function Component(props: ComponentProps) {
    const { files, children } = props;
    const [fonts, setFonts] = useState<IFont[]>([]);
    const [processOT, setProcessOT] = useState(true);

    const readOpentypeData = useCallback(async () => {
        nProgress.start();
        setProcessOT(true);
        const fonts: IFont[] = await Promise.all(
            files.map(async (file, i) => {
                if (!file.fileUrl) return Promise.reject();
                const font = await load(file.fileUrl as string);
                const names = parseNames(font);
                const glyphs = await ParseGlyphs(font);
                const metrics = parseMetrics(font);
                return Promise.resolve({
                    names,
                    glyphs,
                    metrics,
                    url: file.fileUrl
                    // binary: binaries[i]
                });
            })
        );

        const filterItalic = fonts
            .filter((item) => item.names.italicAngle !== 0)
            .sort((a, b) => a.names.fontFace.fontWeight.value - b.names.fontFace.fontWeight.value);
        const filterRoman = fonts
            .filter((item) => item.names.italicAngle === 0)
            .sort((a, b) => a.names.fontFace.fontWeight.value - b.names.fontFace.fontWeight.value);
        const filterFontStretch = filterRoman
            .concat(filterItalic)
            .sort(
                (a, b) =>
                    a.names.fontFace.fontStretch.percentOfNormal -
                    b.names.fontFace.fontStretch.percentOfNormal
            );

        await installFontToTheDOM(filterFontStretch);

        setFonts(filterFontStretch);

        nProgress.done();
        setProcessOT(false);
        return fonts;
    }, [files]);

    useEffect(() => {
        toast.promise(
            readOpentypeData(),
            {
                loading: `Installing\n\n${files.map((item) => item.fileName).join(", ")}`,
                success: (data) =>
                    `Installed\n\n${data.map((item) => item.names.postScriptName).join(", ")}`,
                error: "Cannot be install"
            },
            { success: { duration: 1000, icon: "🔥" } }
        );
    }, [files, readOpentypeData]);

    return (
        <ContextOpentype.Provider value={{ fonts, processOT }}>
            {processOT || !fonts || fonts.length === 0 ? (
                <LayoutState style={{ backgroundColor: "var(--grid-color)" }}>
                    <div style={{ fontSize: "4vw" }}>Reading Opentype...</div>
                </LayoutState>
            ) : (
                children
            )}
        </ContextOpentype.Provider>
    );
}

type ProviderOpentypeProps = PropsWithChildren<{ files?: IFileReader[] }>;
export default function ProviderOpentype(props: ProviderOpentypeProps) {
    const { children } = props;
    const { files } = useFileUpload();
    const memoizedFiles = useMemo(() => files, [files]);
    return <Component files={memoizedFiles}>{children}</Component>;
}
