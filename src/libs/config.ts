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
