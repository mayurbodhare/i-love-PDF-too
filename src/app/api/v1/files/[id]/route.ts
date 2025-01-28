import { APIErrorCode, createApiError } from "@/lib/api/errors";
import { responseFactory } from "@/lib/api/response.factory";
import { storageService } from "@/lib/storage/factory";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(
	request: NextRequest,
	props: {params : Promise<{id : string}>},
) {
    const params = await props.params;
	const { id } = params;
	try {
        const file = storageService.getFileUrl(id);
        return responseFactory.createSuccess<{ file: string }>({ file }, 200);
	} catch (error) {
        return responseFactory.createError(
            createApiError(APIErrorCode.INTERNAL_SERVER_ERROR, {
                message: "Failed to get file",
                error,
            }),
            500,
        );
    }
}


export async function DELETE(request: NextRequest, props: {params : Promise<{id : string}>}) {
    const params = await props.params;
    const { id } = params;
    try {
        await storageService.deleteFile(id);
        return responseFactory.createSuccess<{ message: string, deleted: boolean }>({ message: "File deleted successfully", deleted: true }, 200);
    } catch (error) {
        return responseFactory.createError(
            createApiError(APIErrorCode.INTERNAL_SERVER_ERROR, {
                message: "Failed to delete file",
                error,
            }),
            500,
        );
    }

}