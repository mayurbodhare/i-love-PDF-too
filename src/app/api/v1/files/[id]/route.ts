import { APIErrorCode, createApiError } from "@/lib/api/errors";
import { errorResponse, successResponse } from "@/lib/api/response.factory";
import { storageService } from "@/lib/storage/factory";
import { FileMeta } from "@/types/storage";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(
	request: NextRequest,
	props: { params: Promise<{ id: string }> },
) {
	const params = await props.params;
	const { id } = params;
	try {
		const fileData = await storageService.getFile(id);

		if (fileData) {
			return successResponse<FileMeta>(fileData, 200);
		}

		const fileUrl = storageService.getFileUrl(id);
		return successResponse<{ file: string }>({ file: fileUrl }, 200);
	} catch (error: any) {
		if (error.code === 404) {
			return errorResponse(
				createApiError(APIErrorCode.NOT_FOUND, {
					message: "File not found",
				}),
				404,
			);
		}
		return errorResponse(
			createApiError(APIErrorCode.INTERNAL_SERVER_ERROR, {
				message: "Failed to get file",
				error,
			}),
			500,
		);
	}
}

export async function DELETE(
	request: NextRequest,
	props: { params: Promise<{ id: string }> },
) {
	const params = await props.params;
	const { id } = params;
	try {
		await storageService.deleteFile(id);
		return successResponse<{ message: string; deleted: boolean }>(
			{ message: "File deleted successfully", deleted: true },
			200,
		);
	} catch (error) {
		return errorResponse(
			createApiError(APIErrorCode.INTERNAL_SERVER_ERROR, {
				message: "Failed to delete file",
				error,
			}),
			500,
		);
	}
}
