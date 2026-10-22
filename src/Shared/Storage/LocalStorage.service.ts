import { Injectable } from '@nestjs/common';
import { IStorageService } from './IStorage.service.js';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
class LocalStorageService implements IStorageService {
    private readonly uploadPath = path.join(process.cwd(), 'public', 'uploads');

    constructor() {
        if (!fs.existsSync(this.uploadPath)) {
            fs.mkdirSync(this.uploadPath, { recursive: true });
        }
    }

    async uploadFile(file: Express.Multer.File, folder: string = 'products'): Promise<string> {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        const filename = `${folder}-${uniqueSuffix}${ext}`;
        
        const filePath = path.join(this.uploadPath, filename);
        await fs.promises.writeFile(filePath, file.buffer);
        return `/uploads/${filename}`;
    }

    async deleteFile(fileUrl: string): Promise<void> {
        const filename = path.basename(fileUrl);
        const filePath = path.join(this.uploadPath, filename);
        if (fs.existsSync(filePath)) {
            await fs.promises.unlink(filePath);
        }
    }
}
export{LocalStorageService}