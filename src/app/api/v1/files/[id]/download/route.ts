import { APIErrorCode, createApiError } from "@/lib/api/errors";
import { errorResponse, successResponse } from "@/lib/api/response.factory";
import { storageService } from "@/lib/storage/factory";
import { log } from "console";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(
	request: NextRequest,
	props: { params: Promise<{ id: string }> },
) {
	const params = await props.params;
	const { id } = params;
	try {
		const file = storageService.downloadFile(id);
		log(file);
		return successResponse<{ file: string }>({ file }, 200);
	} catch (error) {
		return errorResponse(
			createApiError(APIErrorCode.INTERNAL_SERVER_ERROR, {
				message: "Failed to get download file",
				error,
			}),
			500,
		);
	}
}
