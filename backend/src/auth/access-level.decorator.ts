import { SetMetadata } from '@nestjs/common';
import { AccessLevel as UserAccessLevel } from 'src/access-level/enum/access-level.enum';

export const SetAccessLevel = (level: UserAccessLevel) => SetMetadata('accessLevel', level);
