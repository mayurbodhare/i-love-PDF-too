import { PDFDocument } from "pdf-lib";

export const mergePdfs = async (files: File[], name = ""): Promise<File> => {
    const mergedPDF = await PDFDocument.create();

    // Process each file sequentially
    for (const file of files) {
        const pdf = await PDFDocument.load(await file.arrayBuffer());
        const copiedPages = await mergedPDF.copyPages(pdf, pdf.getPageIndices());
        for (const page of copiedPages) {
            mergedPDF.addPage(page);
        }

		// copiedPages.forEach((page) => mergedPDF.addPage(page));
    }

    const mergedPdfFile = await mergedPDF.save();
    return new File([mergedPdfFile], `${name}merged.pdf`, {
        type: "application/pdf",
    });
};