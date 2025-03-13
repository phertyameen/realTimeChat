import { Injectable, BadRequestException } from '@nestjs/common';
import { CloudinaryService } from 'src/cloudinary-provider/cloudinary.service';

@Injectable()
export class FileUploadService {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  async upload(file: Express.Multer.File): Promise<string | undefined> {
    if (!file) return undefined;
    try {
      const uploadResult = await this.cloudinaryService.uploadFile(file);
      return uploadResult.secure_url;
    } catch (error) {
      throw new BadRequestException('File upload failed');
    }
  }
}
