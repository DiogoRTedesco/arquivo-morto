import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { AccessLevel } from 'src/access-level/enum/access-level.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(AccessLevel)
  @IsOptional()
  accessLevel?: AccessLevel;
}
