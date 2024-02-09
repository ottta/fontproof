import AccordionLinks from "./Accordion/AccordionLinks";
import GridSystem from "./GridSystem";
import Navigation from "./Navigation";

import type { IFileReader } from "@/types/files";

import { usePathname } from "next/navigation";
import type { DetailedHTMLProps, HTMLAttributes } from "react";
import { createContext, useState } from "react";
import { useDropzone } from "react-dropzone";

import { cn } from "@/libs/utils";

export type ContextFileUploadAttr = {
  files: IFileReader[];
  isDragActive: boolean;
  isDragAccept: boolean;
  isDragReject: boolean;
};
export const ContextFileUpload = createContext<ContextFileUploadAttr>(
  undefined!
);
export const ConsumerFileUpload = ContextFileUpload.Consumer;

interface ProviderFileUploadProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export default function ProviderFileUpload(props: ProviderFileUploadProps) {
  const { children, ...rest } = props;
  const [files, setFiles] = useState<IFileReader[]>([]);
  const pathname = usePathname();
  const isIndex = pathname === "/";
  const isGlyphs = pathname === "/technicals";
  const isReports = pathname === "/reports";

  const fileReader = (files: File[]) =>
    Promise.all(
      files.map((file) => {
        const reader = new FileReader();
        return new Promise<IFileReader>((resolve, reject) => {
          reader.onload = (e) =>
            resolve({
              fileUrl: e.target?.result,
              fileName: file.name,
              fileSize: file.size,
              fileType: file.type
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
    accept: {
      "font/ttf": [],
      "font/otf": [],
      "application/font-woff": []
    },
    noClick: true,
    noKeyboard: true
  });

  if (files.length === 0)
    return (
      <main {...rest} {...getRootProps()}>
        <input {...getInputProps()} />
        <div
          className={cn(
            "fixed",
            "inset-0",
            "flex",
            "items-center",
            "justify-center",
            isDragAccept
              ? "bg-red-500/20"
              : isDragReject
                ? "bg-blue-300"
                : isFileDialogActive
                  ? "bg-emerald-500"
                  : "bg-neutral-50 dark:bg-neutral-950"
          )}
        >
          <GridSystem />
          <div className={cn("leading-none")} style={{ fontSize: "4vw" }}>
            {isDragAccept && <>Drop Here...</>}
            {isDragReject && (
              <>
                Some File(s) Might Be Rejected
                <br />
                <em>(Only *.ttf, *.otf and *.woff fonts will be accepted)</em>
                <br />
                {fileRejections.map((item) => item.file.name).join(", ")}
              </>
            )}
            {!isDragActive && (
              <>
                Drag &amp; Drop Font(s)
                <br />
                <button onClick={open}>&rarr; Open File Dialog &larr;</button>
              </>
            )}
          </div>
        </div>
      </main>
    );
  return (
    <ContextFileUpload.Provider
      value={{ files, isDragActive, isDragAccept, isDragReject }}
    >
      <GridSystem />
      <Navigation />
      <main
        {...rest}
        {...getRootProps()}
        className={cn(
          "grid",
          "grid-cols-12",
          "gap-x-4",
          "px-16",
          "min-h-screen"
          // "bg-red-500/20",
          // "border-l",
          // isIndex && "ml-16 mr-48",
          // isGlyphs && "mx-32",
          // isReports && "ml-48 mr-16",
          // "px-4"
        )}
      >
        {children}
      </main>
    </ContextFileUpload.Provider>
  );
}
