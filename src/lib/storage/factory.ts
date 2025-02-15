import { storageProvider } from "@/conf/conf";
import type { StorageService } from "@/types/storage";
import { AppwriteStorage } from "./appwite.service";

export const createStorageService = (): StorageService => {
	switch (storageProvider) {
		default:
			return new AppwriteStorage();
	}
};

export const storageService = createStorageService();
