import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AccessLevel } from 'src/access-level/enum/access-level.enum';
import { DeleteUserDto } from './dto/delete-user.dto';

@Controller('users')
@UseGuards(RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() body: any) {
    const { userId, ...createUserDto } = body;
    return this.usersService.create(createUserDto, Number(userId));
  }
  @Get()
  async findUsers() {
    return this.usersService.findUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number, @Body() body:DeleteUserDto) {
    this.usersService.deleteUser(id, Number(body.userId));
  }
  @UseGuards(JwtAuthGuard)
  @Put('password/:id')
  async updatePassword(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: any
  ) {
    const {password, userId} = body
    this.usersService.putPassword(id, password, Number(userId));
  }

  @UseGuards(JwtAuthGuard)
  @Put('/accessLevel/:id')
  async updateAccessLevel(
    @Param('id', ParseIntPipe) id: number,
    @Body() body:any,
  ) {
    const {accessLevel, userId} = body
    return this.usersService.putAccessLevel(id, accessLevel, userId);
  }
}
