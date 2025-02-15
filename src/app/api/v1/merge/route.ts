import { APIErrorCode, createApiError } from "@/lib/api/errors";
import { errorResponse, successResponse } from "@/lib/api/response.factory";
import { mergeQueue } from "@/services/queue/queues/merge.queue";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
	const { fileIds, options } = await request.json();
	const { order, filesOrder, outputFileName } = options;
	try {
		const job = await mergeQueue.add("merge-pdf", {
			fileIds,
			order,
			filesOrder,
			outputFileName,
		});
		
		return successResponse(
			{
				jobId: job.id,
				status: `/jobs/${job.id}`,
				message: "Merge job has been added to the queue",
			},
			202,
		);
	} catch (error) {
		return errorResponse(
			createApiError(APIErrorCode.INTERNAL_SERVER_ERROR, {
				message: "Failed to merge files",
				error,
			}),
			500,
		);
	}
}
