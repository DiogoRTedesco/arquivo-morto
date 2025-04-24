import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PrismaService } from '../prisma/prisma.service';
import { FilesService } from './files.service';
import * as fs from 'fs';
import * as path from 'path';

@ApiTags('files')
@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly prismaService: PrismaService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('upload/:employeeId')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const filename: string = uuidv4();
          const extension: string = file.originalname.split('.').pop();
          cb(null, `${filename}.${extension}`);
        },
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadFile(
    @UploadedFile() file,
    @Param('employeeId', ParseIntPipe) employeeId: number,
    @Body('userId',ParseIntPipe) userId: number
  ) {
    const employee = await this.prismaService.employee.findUnique({
      where: { id: employeeId },
    });

    if (!employee) {
      throw new Error('Employee not found');
    }

    return this.filesService.uploadFile({
      fileName: file.filename,
      filePath: file.path,
      employee: {
        connect: { id: employeeId },
      }
    },
      Number(userId));
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('download/:filename')
  async downloadFile(
    @Param('filename') filename: string,
    @Res() res: Response,
  ) {
    res.download(`./uploads/${filename}`);
  }

  @Get('employee/:employeeId')
  async getFilesByEmployee(
    @Param('employeeId', ParseIntPipe) employeeId: number,
  ) {
    return this.filesService.getFilesByEmployee(employeeId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete('delete/:id/:fileName')
  async deleteFile(
    @Param('id', ParseIntPipe) id: number,
    @Param('fileName') fileName: string,
    @Body('userId', ParseIntPipe) userId: number 
  ) {
    try {
      const filePath = path.join(process.cwd(), 'uploads', fileName); // Caminho absoluto do arquivo

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath); 
      } else {
        throw new BadRequestException('File not found');
      }
      return this.filesService.deleteFile(id, fileName, Number(userId));
    } catch (error) {
      console.error('Error deleting file:', error);
      throw new BadRequestException('Error deleting file');
    }
  }
}

