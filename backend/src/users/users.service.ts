import { AccessLevel } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: {
        ...createUserDto,
      },
    });
  }

  async findByUsername(username: string) {
    return this.prisma.user.findUnique({
      where: { username },
    });
  }

  async findById(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async deleteUser(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
  async putPassword(id: number, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.prisma.user.update({
      where: { id },
      data:{
        password:hashedPassword
      }
    });
  }
  async putAccessLevel(id: number, accessLevel: AccessLevel) {
    return this.prisma.user.update({
      where: { id },
      data:{
        accessLevel
      }
    });
  }
  async findUsers() {
    return this.prisma.user.findMany();
  }
}
