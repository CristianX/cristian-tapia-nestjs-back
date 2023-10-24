// src/ticket/dto/csv-record.dto.ts
import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsIn,
  MaxLength,
  IsNumber,
  IsDate,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CsvRecordDto {
  @IsInt()
  id: number;

  @IsNumber()
  balance: number;

  @IsString()
  @IsIn(['INTERNAL', 'PEOPLE', 'OPERATIONS'])
  account: string;

  @IsString()
  @MaxLength(500)
  description: string;

  @IsString()
  @IsIn(['PENDING', 'PROCESSED'])
  status: string;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  date: Date;
}
