export interface StorageService{
    uploadFile(fileBuffer : Buffer, filename: string) : Promise<string>;
    getFileUrl(fileId: string) : string;
    listFiles(): Promise<FileMeta[]>;
    deleteFile(fileId: string) : Promise<void>;
    // getFilePreview(dileId: string, ):
}

export type FileMeta = {
    id: string;
    name: string;
    url: string;
    size:number;
    uploadedAt: Date;
}