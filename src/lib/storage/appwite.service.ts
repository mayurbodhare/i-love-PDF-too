import type { FileMeta, StorageService } from "@/types/storage";
import { Client, ID, ImageFormat, ImageGravity, Storage } from "appwrite";
import { appwriteBucketId, appwriteProjectId, appwriteUrl } from "@/conf/conf";

export class AppwriteStorage implements StorageService {
	private client: Client;
	private storage: Storage;

	constructor() {
		this.client = new Client()
			.setEndpoint(appwriteUrl)
			.setProject(appwriteProjectId);
		this.storage = new Storage(this.client);
	}

	async uploadFile(fileBuffer: Buffer, filename: string): Promise<string> {
		const file = new File([fileBuffer], filename);
		const result = await this.storage.createFile(
			appwriteBucketId, // bucketId
			ID.unique(), // fileId
			file,
		);

		console.log(result);
		return result.$id;
	}

	getFileUrl(fileId: string): string {
		return this.storage.getFileDownload(appwriteBucketId, fileId);
	}

	async listFiles(): Promise<FileMeta[]> {
		const { files } = await this.storage.listFiles(appwriteBucketId);
		return files.map((file) => ({
			id: file.$id,
			name: file.name,
			url: this.getFileUrl(file.$id),
			size: file.sizeOriginal,
			uploadedAt: new Date(file.$createdAt),
			mimeType: file.mimeType,
		}));
	}

	async deleteFile(fileId: string): Promise<void> {
		const result = await this.storage.deleteFile(appwriteBucketId, fileId);
	}

	async getFile(fileId: string): Promise<FileMeta> {
		const fileData = await this.storage.getFile(appwriteBucketId, fileId);
		const fileMetaData = {
			id: fileData.$id,
			name: fileData.name,
			url: this.getFileUrl(fileData.$id),
			size: fileData.sizeOriginal,
			uploadedAt: new Date(fileData.$createdAt),
			mimeType: fileData.mimeType,
		};

		return fileMetaData;
	}

	downloadFile(fileId: string): string {
		return this.storage.getFileDownload(appwriteBucketId, fileId);
	}

	getFilePreview(fileId: string, width = 200, height = 300): string {
		const result = this.storage.getFilePreview(
			appwriteBucketId,
			fileId,
			width,
			height,
			ImageGravity.Center,
			80,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			ImageFormat.Webp,
		);
		return result;
	}
}
