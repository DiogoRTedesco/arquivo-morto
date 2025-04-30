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
import {UploadFileDto} from './dto/uploadFile.dto'
import * as fs from 'fs';
import * as path from 'path';
import { DeleteFileDto } from './dto/deleteFile.dto';

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
        destination: '/app/uploads',
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
    @Body() body: UploadFileDto,
  ) {
    const employee = await this.prismaService.employee.findUnique({
      where: { id: employeeId },
    });

    if (!employee) {
      throw new Error('Employee not found');
    }
    
    const userId = body.userId;

    return this.filesService.uploadFile({
      fileName: file.filename,
      filePath: file.path,
      employee: {
        connect: { id: employeeId },
      },
    }, Number(userId));
   
    
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('download/:filename')
  async downloadFile(
    @Param('filename') filename: string,
    @Res() res: Response,
  ) {
    const filePath = path.join('/app/uploads', filename);

    if (!fs.existsSync(filePath)) {
      throw new BadRequestException('Arquivo não encontrado');
    }

    return res.download(filePath, filename, (err) => {
      if (err) {
        console.error('Erro ao fazer download do arquivo:', err);
        throw new BadRequestException('Erro ao baixar o arquivo');
      }
    });
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
    @Body() body: DeleteFileDto,
  ) {
    try {
      const filePath = path.join('/app/uploads', fileName);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    } else {
      throw new BadRequestException('File not found');
    }

    return this.filesService.deleteFile(id, fileName, Number(body.userId));
  } catch (error) {
    console.error('Error deleting file:', error);
    throw new BadRequestException('Error deleting file');
  }
}
}

