export type MergeJobData = {
	fileIds: string[];
	order: string;
	filesOrder: number[];
	outputFileName?: string;
	userId?: string;
};

export type MergeJobResult = {
	success: boolean;
	mergeFileId: string;
	pages?: number;
};
