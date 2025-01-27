import { PDFDocument } from 'pdf-lib';
import savePdfOnServer, { SavedFile } from '@/utils/savePdf';
import path from 'node:path';
import fs from "node:fs";

/**
 * Merges multiple PDF files and saves the merged file using the `savePdfOnServer` function.
 * @param filePaths - An array of file paths to the PDF files.
 * @param outputFilename - The name of the merged PDF file to be saved.
 * @returns A Promise that resolves to a `SavedFile` object containing details of the saved file.
 */
async function mergePDFs(filePaths: string[]): Promise<SavedFile> {
  try {
    if (filePaths.length === 0) {
        return {
          success: false,
          message: 'No files provided for merging.',
        };
      }
    // Derive the output filename from the first file
    const firstFileName = path.basename(filePaths[0], path.extname(filePaths[0]));
    const outputFilename = `${firstFileName}-merged.pdf`;
    
    // Create a new PDFDocument
    const mergedPdf = await PDFDocument.create();

    for (const filePath of filePaths) {
      // Load the current PDF file
      const pdfBytes = await fs.promises.readFile(filePath);
      const pdf = await PDFDocument.load(pdfBytes);

      // Copy all pages from the current PDF
      const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());

      // Add the copied pages to the merged PDF
      pages.forEach((page) => mergedPdf.addPage(page));
    }

    // Save the merged PDF as a Uint8Array
    const mergedPdfBytes = await mergedPdf.save();

    // Convert the Uint8Array to a File-like object
    const mergedFile = new File([mergedPdfBytes], outputFilename, {
      type: 'application/pdf',
    });

    // Save the merged PDF using the `savePdfOnServer` function
    await savePdfOnServer(mergedFile, outputFilename);

    return mergedFile;
  } catch (error) {
    console.error('Error merging and saving PDFs:', error);
    return {
      success: false,
      message: 'Failed to merge and save PDF',
    };
  }
}