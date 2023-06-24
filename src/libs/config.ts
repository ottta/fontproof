import { IFileReader } from "@/types/files";

type AccordionLinkAttr = {
    name: "index" | "technicals" | "reports";
    label: string;
    path: string;
};

export const accordionLinks: AccordionLinkAttr[] = [
    { name: "index", label: "Index", path: "/" },
    { name: "technicals", label: "Technicals", path: "/technicals" },
    { name: "reports", label: "Reports", path: "/reports" }
];

export const defaultFontFiles: IFileReader[] = [
    {
        fileName: "LugStraight-Thin",
        fileSize: 0,
        fileUrl: "http://localhost:3000/fonts/lug-straight/ttf/LugStraight-Thin.ttf"
    },
    {
        fileName: "LugStraight-ExtraLight",
        fileSize: 0,
        fileUrl: "http://localhost:3000/fonts/lug-straight/ttf/LugStraight-ExtraLight.ttf"
    },
    {
        fileName: "LugStraight-Light",
        fileSize: 0,
        fileUrl: "http://localhost:3000/fonts/lug-straight/ttf/LugStraight-Light.ttf"
    },
    {
        fileName: "LugStraight-Regular",
        fileSize: 0,
        fileUrl: "http://localhost:3000/fonts/lug-straight/ttf/LugStraight-Regular.ttf"
    },
    {
        fileName: "LugStraight-Medium",
        fileSize: 0,
        fileUrl: "http://localhost:3000/fonts/lug-straight/ttf/LugStraight-Medium.ttf"
    },
    {
        fileName: "LugStraight-SemiBold",
        fileSize: 0,
        fileUrl: "http://localhost:3000/fonts/lug-straight/ttf/LugStraight-SemiBold.ttf"
    },
    {
        fileName: "LugStraight-Bold",
        fileSize: 0,
        fileUrl: "http://localhost:3000/fonts/lug-straight/ttf/LugStraight-Bold.ttf"
    },
    {
        fileName: "LugStraight-ExtraBold",
        fileSize: 0,
        fileUrl: "http://localhost:3000/fonts/lug-straight/ttf/LugStraight-ExtraBold.ttf"
    },
    {
        fileName: "LugStraight-Black",
        fileSize: 0,
        fileUrl: "http://localhost:3000/fonts/lug-straight/ttf/LugStraight-Black.ttf"
    }
    // {
    //     fileName: "FK-Screamer",
    //     fileSize: 0,
    //     fileUrl: "http://localhost:3000/fonts/fk-screamer/FKScreamerVariable-wght400.ttf"
    // }
];
