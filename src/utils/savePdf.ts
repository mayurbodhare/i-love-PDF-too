import fs from "node:fs";
import path from "node:path";

export interface SavedFile {
	success: boolean;
	message: string;
	filename?: string;
	path?: string;
	relativePath?: string;
}

const DIR_PATH = path.join(process.cwd(), "public", "uploads");

// ensure this directory exists
async function ensureDirExists() {
	if (!fs.existsSync(DIR_PATH)) {
		await fs.promises.mkdir(DIR_PATH, { recursive: true });
	}
}

async function savePdfOnServer(file: File): Promise<SavedFile> {
	try {
		await ensureDirExists();

		const filename = file.name;

		// Convert the file to a buffer
		const bytes = await file.arrayBuffer();
		const buffer = Buffer.from(bytes);

		// Write the file to the server
		const filePath = path.join(DIR_PATH, filename);
		console.log("file path :", filePath);
		await fs.promises.writeFile(filePath, buffer);

		// Construct the public URL path
		const relativePath = path.join("/uploads", filename);

		return {
			success: true,
			message: "PDF uploaded successfully",
			filename: filename,
			path: filePath, // Return the full server path if needed
			relativePath: relativePath, // Return the public path
		};
	} catch (error) {
		console.error("Upload error:", error);
		return {
			success: false,
			message: "Failed to upload PDF",
		};
	}
}

export default savePdfOnServer;
