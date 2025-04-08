import { APIErrorCode, createApiError } from "@/lib/api/errors";
import { errorResponse, successResponse } from "@/lib/api/response.factory";
import { mergeQueue } from "@/services/queue/queues/merge.queue";
import type { MergeOptions, MergeRequestType } from "@/types/mergeRequest";
import { mergePdfs } from "@/utils/mergePdfs";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
	const formData = await request.formData();
	const files = formData.getAll("files") as File[];

	const rawOptions = formData.get("options") as string;
	const options: MergeOptions = JSON.parse(rawOptions);

	const { order, filesOrder, outputFileName } = options;

	
	try {
		
		// validate files
		if(!files || files.length < 2){
			throw new Error("At least 2 files are required to merge");
		}
		
		if(order === "custom" && filesOrder?.length !== files?.length){
			throw new Error("Custom order requires filesOrder array to be the same length as fileIds");
		}
		
		let orderedFiles = files;
		
		if(order === "custom" && filesOrder?.length === files?.length){
			orderedFiles = filesOrder.map(index => files[index]);
		}
		
		const mergedFile = await mergePdfs(orderedFiles, outputFileName);
		
		return successResponse(
			mergedFile, 
			200, 
			undefined,
			{
				isRaw : true,
				headers : {
					"Content-Type" : "application/pdf",
					"Content-Disposition": `attachment; filename="${`${outputFileName}-`}merged.pdf"`
				}
			}
		)

		
		
	} catch (error) {
		const errorMessage = (error as Error).message || "Failed to merge files";
		return errorResponse(
			createApiError(APIErrorCode.INTERNAL_SERVER_ERROR, {
				message: "Failed to merge files",
				error: errorMessage,
			}),
			500,
		);
	}
}



// export async function POST(request: NextRequest) {
// 	const { fileIds, options } = await request.json();
// 	const { order, filesOrder, outputFileName } = options;
// 	try {
// 		const job = await mergeQueue.add("merge-pdf", {
// 			fileIds,
// 			order,
// 			filesOrder,
// 			outputFileName,
// 		});
		
// 		return successResponse(
// 			{
// 				jobId: job.id,
// 				status: `/jobs/${job.id}`,
// 				message: "Merge job has been added to the queue",
// 			},
// 			202,
// 		);
		
// 	} catch (error) {
// 		return errorResponse(
// 			createApiError(APIErrorCode.INTERNAL_SERVER_ERROR, {
// 				message: "Failed to merge files",
// 				error,
// 			}),
// 			500,
// 		);
// 	}
// }
