import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { FileUploadService } from 'src/dominio/servicios/file-upload/file-upload.service';

@Controller('file-upload')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const fileExtName = path.extname(file.originalname);
          cb(null, `${Date.now()}${fileExtName}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (file.mimetype === 'text/csv') {
          cb(null, true);
        } else {
          cb(new BadRequestException('Tipo de archivo inválido'), false);
        }
      },
    }),
  )
  async uploadFile(@UploadedFile() file) {
    if (!file) {
      throw new BadRequestException('El archivo está vacío!');
    }

    const records = await this.fileUploadService.processCsvFile(file.path);
    return records;
  }
}
