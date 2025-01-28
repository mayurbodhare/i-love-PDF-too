import { APIErrorCode, createApiError } from "@/lib/api/errors";
import { responseFactory } from "@/lib/api/response.factory";
import { storageService } from "@/lib/storage/factory";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, props: {params : Promise<{id : string}>}) {
    const params = await props.params;
    const { id } = params;
    try {
        const file = storageService.getFilePreview(id, 200, 300);
        return responseFactory.createSuccess<{ file: string }>({ file }, 200); 
    } catch (error) {
        return responseFactory.createError(
            createApiError(APIErrorCode.INTERNAL_SERVER_ERROR, {
                message: "Failed to get preview file",
                error,
            }),
            500,
        )
    }
}