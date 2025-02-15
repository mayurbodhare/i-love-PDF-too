import { APIErrorCode, createApiError } from "@/lib/api/errors";
import { errorResponse, successResponse } from "@/lib/api/response.factory";
import { storageService } from "@/lib/storage/factory";
import type { FileMeta } from "@/types/storage";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
	try {
		const files = await storageService.listFiles();
		return successResponse<{ files: FileMeta[] }>({ files }, 200);
	} catch (error) {
		return errorResponse(
			createApiError(APIErrorCode.INTERNAL_SERVER_ERROR, {
				message: "Failed to list files",
				error,
			}),
			500,
		);
	}
}

export async function POST(request: NextRequest) {
	try {
		const formData = await request.formData();
		const files = formData.getAll("files") as File[]; // Changed to get multiple files

		if (!files || files.length === 0) {
			return errorResponse(
				createApiError(APIErrorCode.INVALID_INPUT, {
					message: "No files uploaded",
				}),
				400,
			);
		}

		// Validate all files
		const maxSize = 10 * 1024 * 1024; // 10MB
		for (const file of files) {
			if (file.size > maxSize) {
				return errorResponse(
					createApiError(APIErrorCode.INVALID_INPUT, {
						message: `File '${file.name}' exceeds maximum size (10MB)`,
					}),
					400,
				);
			}
		}

		// Process all files in parallel
		const uploadPromises = files.map(async (file) => {
			const buffer = Buffer.from(await file.arrayBuffer());
			const fileId = await storageService.uploadFile(buffer, file.name);
			return {
				id: fileId,
				url: storageService.getFileUrl(fileId),
				name: file.name,
				size: file.size,
				mimeType: file.type,
				uploadedAt: new Date(),
			} as FileMeta;
		});

		const uploadedFiles = await Promise.all(uploadPromises);

		return successResponse<FileMeta[]>(uploadedFiles, 201);
	} catch (error) {
		return errorResponse(
			createApiError(APIErrorCode.INTERNAL_SERVER_ERROR, {
				message: "Failed to upload files",
				error,
			}),
			500,
		);
	}
}