import { z } from "zod";

export const pdfFileSchema = z.object({
	file: z
		.instanceof(File)
		.refine(
			(file) => file.type === "application/pdf",
			"Only PDF files are allowed",
		),
});
