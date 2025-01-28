import { APIErrorCode, createApiError } from "@/lib/api/errors";
import { responseFactory } from "@/lib/api/response.factory";
import { storageService } from "@/lib/storage/factory";
import type { FileMeta, FileResponse } from "@/types/storage";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
	try {
		const files = await storageService.listFiles();
		return responseFactory.createSuccess<{ files: FileMeta[] }>({ files }, 200);
	} catch (error) {
		return responseFactory.createError(
            createApiError(APIErrorCode.INTERNAL_SERVER_ERROR, {
                message: "Failed to list files",
                error,
            }),
            500,
        )
	}
}

export async function POST(request: NextRequest) {
	try {
		const formData = await request.formData();
		const file = formData.get("file") as File;

		if (!file) {
			return responseFactory.createError(
				createApiError(APIErrorCode.INVALID_INPUT, {
					message: "No file uploaded",
				}),
				400,
			);
		}

		// Optional: Add file validation
		const maxSize = 10 * 1024 * 1024; // 10MB
		if (file.size > maxSize) {
			return responseFactory.createError(
				createApiError(APIErrorCode.INVALID_INPUT, {
					message: "File size exceeds maximum allowed (10MB)",
				}),
				400,
			);
		}

		const buffer = Buffer.from(await file.arrayBuffer());
		const fileId = await storageService.uploadFile(buffer, file.name);
		const fileUrl = storageService.getFileUrl(fileId);

		const response: FileMeta = {
			id: fileId,
			url: fileUrl,
			name: file.name,
			size: file.size,
			mimeType: file.type,
			uploadedAt: new Date(),
		};

		return responseFactory.createSuccess<{ id: string; url: string }>(
			response,
			201,
		);
	} catch (error) {
		return responseFactory.createError(
			createApiError(APIErrorCode.INTERNAL_SERVER_ERROR, {
				message: "Failed to upload file",
				error,
			}),
			500,
		);
	}
}
