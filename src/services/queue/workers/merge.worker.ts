import { storageService } from "@/lib/storage/factory";
import type { MergeJobData, MergeJobResult } from "../jobs/merge.job";
import { mergePdfs } from "@/utils/mergePdfs";
import { Worker } from "bullmq";
import { connection } from "../config";

const worker = new Worker<MergeJobData, MergeJobResult>(
	"merge-pdf-queue",
	async (job) => {
		// console.log(`Merge job added to the queue: ${job.id}`);
		const { fileIds, outputFileName = "", order, filesOrder } = job.data;

		try {

			// 1.validate inputs
			if(!fileIds || fileIds.length < 2) {
				throw new Error("At least 2 files are required to merge");
			}

			const files: File[] = [];

			for (const fileId of fileIds) {
				const responseUrl = storageService.downloadFile(fileId);
				const response = await fetch(responseUrl);
				const buffer = await response.arrayBuffer();
				const file = new File([buffer], `${fileId}.pdf`, {
					type: "application/pdf",
				});
				files.push(file);
			}

			let orderedFiles = files;

			if(order === "custom" && filesOrder?.length !== files.length) {
				throw new Error("Custom order requires filesOrder array to be the same length as fileIds");
			}

			if(order === "custom" && filesOrder?.length === files.length) {
				orderedFiles = filesOrder.map(index => files[index]);
			}

			const mergedFile = await mergePdfs(orderedFiles, outputFileName);

			const mergedFileId = await storageService.uploadFile(
				Buffer.from(await mergedFile.arrayBuffer()),
				mergedFile.name,
			);

			console.log("merged file uploaded", mergedFileId);

			return { success: true, mergeFileId: mergedFileId };
		} catch (error) {
			console.error("Error merging PDFs:", error);
			throw new Error(
				`Worker Error: Merge failed, please try again.\n${error}`,
			);
		}
	},
	{
		connection: connection,
	},
);

worker.on("ready", () => {
	console.log("Merge worker is ready");
});

// Error handling
worker.on("failed", (job, err) => {
	console.error(`Job ${job?.id} failed with error: ${err.message}`);
});

// Completed job
worker.on("completed", (job) => {
	console.log(`Job ${job.id} completed`);
});

export { worker };


// Keep the process alive
process.on('SIGINT', () => process.exit());
process.on('SIGTERM', () => process.exit());