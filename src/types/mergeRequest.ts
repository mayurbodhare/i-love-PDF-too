export type MergeOptions = {
	order: string;
	filesOrder: number[];
	outputFileName: string;
};

export type MergeRequestType = {
	files: File[];
	options: MergeOptions;
};
