import { IsInt, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class DeleteUserDto {
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  userId: number;
}