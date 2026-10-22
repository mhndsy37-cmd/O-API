interface IStorageService {
    
    uploadFile(file: any, folder: string): Promise<string>;
    
    deleteFile(fileUrl: string): Promise<void>;
}
export{IStorageService}
