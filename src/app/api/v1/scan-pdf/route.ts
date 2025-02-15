import { mergePdfs } from "@/services/mergePdfs";
import savePdfOnServer from "@/utils/savePdf";
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

	const mergedFile = await mergePdfs(pdfFiles);

	return NextResponse.json({ message: "File uploaded successfully" });
}
