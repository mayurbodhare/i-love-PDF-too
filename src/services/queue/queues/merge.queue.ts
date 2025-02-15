import { Queue } from "bullmq";
import { connection } from "../config";
import type { MergeJobData, MergeJobResult } from "../jobs/merge.job";

export const mergeQueue = new Queue<MergeJobData, MergeJobResult>("merge-pdf-queue", {
	connection,
	defaultJobOptions: {
		attempts: 3,
		backoff: {
			type: "exponential",
			delay: 1000,
		},
		removeOnComplete: { age: 3600 },
	},
});
