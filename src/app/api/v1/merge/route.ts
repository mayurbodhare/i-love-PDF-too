import { mergePdfs } from "@/services/mergePdfs";
import savePdfOnServer from "@/utils/savePdf";
import { scanPdf } from "@/utils/scanPdf";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const formData = await req.formData();
	const files = formData.getAll("files") as File[];


	if (files.length === 1 && files[0].type !== "application/pdf") {
		return NextResponse.json(
			{ error: "Invalid file type", message: "Only PDF files are allowed" },
			{ status: 400 },
		);
	}

	const pdfFiles = files.filter((file) => {
		if (file.type === "application/pdf") {
			return file;
		}
	});

	console.log(pdfFiles[0]);

	const { path, relativePath} = await savePdfOnServer(pdfFiles[0]);
	
	if (!path) {
		return NextResponse.json(
			{ error: "File save error", message: "Failed to save the file" },
			{ status: 500 },
		);
	}
	const isOk = await scanPdf(path);
	


	// const PDFpaths = [];

	// for (const file of pdfFiles) {
	// 	const { path, filename } = await savePdfOnServer(file);
	// 	PDFpaths.push(path);
	// 	if (!path) {
	// 		return NextResponse.json(
	// 			{ error: "File save error", message: "Failed to save the file" },
	// 			{ status: 500 },
	// 		);
	// 	}
	// 	const isOk = await scanPdf(path);
	// 	if (!isOk) {
	// 		return NextResponse.json(
	// 			{ error: "File is infected", message: `File ${filename} is infected` },
	// 			{ status: 400 },
	// 		);
	// 	}
	// }

	

	// const mergedFile = await mergePdfs(pdfFiles);

	return NextResponse.json({path, isOk, relativePath, message: "File uploaded successfully" });
}
