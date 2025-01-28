export interface StorageService{
    uploadFile(fileBuffer : Buffer, filename: string) : Promise<string>;
    getFileUrl(fileId: string) : string;
    listFiles(): Promise<FileMeta[]>;
    deleteFile(fileId: string) : Promise<void>;
    getFilePreview(fileId: string, width?: number, height?: number) : string;
}

export type FileMeta = {
    id: string;
    name: string;
    url: string;
    size:number;
    mimeType: string;
    uploadedAt: Date;
}