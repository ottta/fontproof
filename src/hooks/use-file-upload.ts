import { useContext } from "react";
import { ContextFileUpload } from "@/components/ContextFileUpload";

export default function useFileUpload() {
    const fileUpload = useContext(ContextFileUpload);
    if (!fileUpload) throw new Error("Must be inside <ProviderFileUpload />");
    return fileUpload;
}
