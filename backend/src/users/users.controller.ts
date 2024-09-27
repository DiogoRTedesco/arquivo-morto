import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { AccessLevel as UserAccessLevel, type AccessLevel } from '@prisma/client';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
@UseGuards(RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: { username: string, password: string, accessLevel: UserAccessLevel }) {
    return this.usersService.create(createUserDto);
  }
  @Get()
  async findUsers(){
    return this.usersService.findUsers();
  } 

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number){
    this.usersService.deleteUser(id)
  }
  @UseGuards(JwtAuthGuard)
  @Put('password/:id')
  async updatePassword(@Param('id', ParseIntPipe) id: number, @Body('password') password: string ){
    this.usersService.putPassword(id, password)
  }
  
  @UseGuards(JwtAuthGuard)
  @Put('accessLevel/:id')
  async updateAccessLevel(@Param('id', ParseIntPipe) id: number, @Body('accessLevel')accessLevel: AccessLevel){
    this.usersService.putAccessLevel(id, accessLevel)
  }
  
}
