import { Injectable, BadRequestException } from '@nestjs/common';
import * as csvParser from 'csv-parser';
import * as fs from 'fs';
import { validateOrReject } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { CsvRecordDto } from 'src/aplicacion/dtos/csv-record.dto';

@Injectable()
export class FileUploadService {
  async processCsvFile(filePath: string): Promise<CsvRecordDto[]> {
    const results: CsvRecordDto[] = [];
    const uniqueIds = new Set();

    const stream = fs.createReadStream(filePath).pipe(csvParser());

    for await (const record of stream) {
      const dto: CsvRecordDto = plainToClass(CsvRecordDto, record, {
        excludeExtraneousValues: true,
      });

      const today = new Date();
      dto.date.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);
      if (dto.date.getTime() !== today.getTime()) {
        throw new BadRequestException(
          'Invalid date. Date must be the current day.',
        );
      }

      try {
        await validateOrReject(dto);
      } catch (errors) {
        throw new BadRequestException(errors);
      }

      if (uniqueIds.has(dto.id)) {
        throw new BadRequestException(`Duplicate record found: ${dto.id}`);
      }
      uniqueIds.add(dto.id);

      results.push(dto);
    }

    return results;
  }
}
