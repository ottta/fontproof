import type { DetailedHTMLProps, HTMLAttributes } from "react";
import type { IFileReader } from "@/types/files";
import { createContext, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/router";

export type ContextFileUploadAttr = {
    files: IFileReader[];
    isDragActive: boolean;
    isDragAccept: boolean;
    isDragReject: boolean;
};
export const ContextFileUpload = createContext<ContextFileUploadAttr>(undefined!);
export const ConsumerFileUpload = ContextFileUpload.Consumer;

interface ProviderFileUploadProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export default function ProviderFileUpload(props: ProviderFileUploadProps) {
    const { children, ...rest } = props;
    const [files, setFiles] = useState<IFileReader[]>([]);
    const { pathname } = useRouter();
    const isIndex = pathname === "/";
    const isGlyphs = pathname === "/technicals";

    const fileReader = (files: File[]) =>
        Promise.all(
            files.map((file) => {
                const reader = new FileReader();
                return new Promise<IFileReader>((resolve, reject) => {
                    reader.onload = (e) =>
                        resolve({
                            fileUrl: e.target?.result,
                            fileName: file.name,
                            fileSize: file.size
                        });
                    reader.onerror = () => reject();
                    reader.readAsDataURL(file);
                });
            })
        );

    const onDrop = useCallback(async (files: File[]) => {
        const urls: IFileReader[] = await fileReader(files).then((res) => res);
        setFiles(urls);
    }, []);

    const { getRootProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
        onDrop,
        multiple: true,
        accept: { "font/ttf": [], "font/otf": [], "application/font-woff": [] },
        noClick: files.length !== 0
    });

    return (
        <ContextFileUpload.Provider value={{ files, isDragActive, isDragAccept, isDragReject }}>
            <main
                {...rest}
                {...getRootProps()}
                style={{
                    minHeight: "100vh",
                    borderLeft: "1px solid var(--grid-color)",
                    marginInline: isIndex
                        ? "var(--grid-unit) calc((var(--grid-unit) * 3) - 1px)"
                        : isGlyphs
                        ? "calc(var(--grid-unit) * 2) calc((var(--grid-unit) * 2) - 2px)"
                        : "calc(var(--grid-unit) * 3) 0"
                }}
            >
                {children}
            </main>
        </ContextFileUpload.Provider>
    );
}
