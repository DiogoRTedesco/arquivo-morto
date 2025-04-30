import { IsInt, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class UploadFileDto {
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  userId: number;
}