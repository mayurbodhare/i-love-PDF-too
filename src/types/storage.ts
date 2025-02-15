export interface StorageService {
	uploadFile(fileBuffer: Buffer, filename: string): Promise<string>;
	getFileUrl(fileId: string): string;
	listFiles(): Promise<FileMeta[]>;
	deleteFile(fileId: string): Promise<void>;
	getFile(fileId: string): Promise<FileMeta>;
	downloadFile(fileId: string): string;
	getFilePreview(fileId: string, width?: number, height?: number): string;
}

export type FileMeta = {
	id: string;
	name: string;
	url: string;
	size: number;
	mimeType: string;
	uploadedAt: Date;
};

export type FileResponse = {
	id: string;
	url: string;
	name: string;
	createdAt: string;
};
