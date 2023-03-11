import type { DetailedHTMLProps, HTMLAttributes } from "react";
import type { IFileReader } from "@/types/files";
import { createContext, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/router";
import AccordionLinks from "./Accordion/AccordionLinks";
import LayoutState from "./LayoutState";

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

    const onDrop = async (files: File[]) => {
        const urls: IFileReader[] = await fileReader(files).then((res) => res);
        setFiles(urls);
    };

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
        isFileDialogActive,
        fileRejections,
        open
    } = useDropzone({
        onDrop,
        multiple: true,
        accept: { "font/ttf": [], "font/otf": [], "application/font-woff": [] },
        noClick: true,
        noKeyboard: true
    });

    if (files.length === 0)
        return (
            <main {...rest} {...getRootProps()}>
                <input {...getInputProps()} />
                <LayoutState
                    style={{
                        backgroundColor: isDragAccept
                            ? "var(--grid-color)"
                            : isDragReject
                            ? "red"
                            : isFileDialogActive
                            ? "blue"
                            : "initial"
                    }}
                >
                    <div style={{ fontSize: "4vw" }}>
                        {isDragAccept && <>All Files Accepted</>}
                        {isDragReject && (
                            <>
                                Some File(s) Might Be Rejected
                                <br />
                                <em style={{ fontSize: "0.5em" }}>
                                    (Only *.ttf, *.otf and *.woff fonts will be accepted)
                                </em>
                                <br />
                                {fileRejections.map((item) => item.file.name).join(", ")}
                            </>
                        )}
                        {!isDragActive && (
                            <>
                                Drag &amp; Drop Font(s)
                                <br />
                                <button
                                    onClick={open}
                                    style={{
                                        appearance: "none",
                                        border: "none",
                                        font: "inherit",
                                        cursor: "pointer",
                                        background: "none",
                                        textTransform: "inherit",
                                        WebkitTextFillColor: "deeppink"
                                    }}
                                >
                                    &rarr; Open File Dialog &larr;
                                </button>
                            </>
                        )}
                    </div>
                </LayoutState>
            </main>
        );
    return (
        <ContextFileUpload.Provider value={{ files, isDragActive, isDragAccept, isDragReject }}>
            <AccordionLinks />
            <main
                {...rest}
                {...getRootProps()}
                style={{
                    minHeight: "100vh",
                    borderLeft: "1px solid var(--grid-color)",
                    marginInline: isIndex
                        ? "var(--accordion-link-width) calc((var(--accordion-link-width) * 3) - 1px)"
                        : isGlyphs
                        ? "calc(var(--accordion-link-width) * 2) calc((var(--accordion-link-width) * 2) - 1px)"
                        : "calc(var(--accordion-link-width) * 3 - 0px) calc(var(--accordion-link-width) - 1px)"
                }}
            >
                {children}
            </main>
        </ContextFileUpload.Provider>
    );
}
