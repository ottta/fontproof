import type { PropsWithChildren } from "react";
import type { IFont } from "@/types/font";
import { createContext, useCallback, useEffect, useState } from "react";
import { load } from "opentype.js";
import toast from "react-hot-toast";
import parseNames from "@/libs/opentype/parse-names";
import useFileUpload from "@/hooks/use-file-upload";

type ContextOpentypeAttr = {
    fonts: IFont[];
};

export const ContextOpentype = createContext<ContextOpentypeAttr>(undefined!);

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
                    toast.success(`"${item.names.postScriptName}" — Installed`, { duration: 5000 });
                });
            } catch (error) {
                console.log(error);
            }

            return Promise.resolve();
        })
    );
}

type ProviderOpentypeProps = PropsWithChildren<{}>;
export default function ProviderOpentype(props: ProviderOpentypeProps) {
    const { children } = props;
    const { files } = useFileUpload();

    const [fonts, setFonts] = useState<IFont[]>([]);

    const readOpentypeData = useCallback(async () => {
        const fonts: IFont[] = await Promise.all(
            files.map(async (file) => {
                if (!file.fileUrl) return Promise.reject();
                const font = await load(file.fileUrl as string);
                const names = parseNames(font);
                const metrics = {
                    unitsPerEm: font.unitsPerEm
                };
                return Promise.resolve({ names, metrics, url: file.fileUrl });
            })
        );

        return fonts;
    }, [files]);

    useEffect(() => {
        if (files.length === 0) return;

        readOpentypeData().then(async (res) => {
            const filterItalic = res
                .filter((item) => item.names.italicAngle !== 0)
                .sort(
                    (a, b) => a.names.fontFace.fontWeight.value - b.names.fontFace.fontWeight.value
                );
            const filterRoman = res
                .filter((item) => item.names.italicAngle === 0)
                .sort(
                    (a, b) => a.names.fontFace.fontWeight.value - b.names.fontFace.fontWeight.value
                );
            const filterFontStretch = filterRoman
                .concat(filterItalic)
                .sort(
                    (a, b) =>
                        a.names.fontFace.fontStretch.percentOfNormal -
                        b.names.fontFace.fontStretch.percentOfNormal
                );

            // Install font file to DOM
            await installFontToTheDOM(filterFontStretch);

            setFonts(filterFontStretch);
        });
    }, [files, readOpentypeData]);

    return <ContextOpentype.Provider value={{ fonts }}>{children}</ContextOpentype.Provider>;
}
