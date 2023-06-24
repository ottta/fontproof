import { jsPDF, jsPDFOptions } from "jspdf";

// import PDFDocument from "pdfkit";
// import blobStream from "blob-stream";

type generatePDFProps = jsPDFOptions & {
    fontFamily: string;
    fontBinary: string;
    fontFileName: string;
    fontStyle: "italic" | "normal";
    text: string[];
};
export default function generatePDF(props: generatePDFProps) {
    const { fontFamily, fontBinary, fontFileName, fontStyle, text, ...rest } = props;
    const doc = new jsPDF({ ...rest });
    doc.addFileToVFS(fontFileName, fontBinary);
    doc.addFont(fontFileName, fontFamily, fontStyle);
    doc.setFont(fontFamily);
    doc.setFontSize(12);

    // A4 595x842 pt.

    for (let index = 0; index < text.length; index++) {
        doc.text(fontFamily, 40, 40);
        doc.text(text[index], 40, 80, { maxWidth: 515 });

        if (index < text.length - 1) {
            doc.addPage();
        }
    }

    doc.save(`${fontFamily}.pdf`);
}
