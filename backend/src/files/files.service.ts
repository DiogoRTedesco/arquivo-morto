import { Injectable } from '@nestjs/common';
import { File, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { LogsSystemService } from 'src/logs-system/logs-system.service';
import { LogsEnum } from 'src/logs-system/enum/logs.enum';

@Injectable()
export class FilesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logsService: LogsSystemService,
  ) {}

  async uploadFile(data: Prisma.FileCreateInput, userId: number): Promise<File> {
    try {
      const updateFile = await this.prisma.file.create({ data })
      await this.logsService.createLogs(LogsEnum.CRIAR_FICHA_EMPREGADO, userId, {updatedFile: updateFile.id })

      return updateFile
     } catch (error) {
      await this.logsService.createLogs(LogsEnum.CRIAR_FICHA_EMPREGADO_FAILED,userId, {
        errorMessage: error.message,
         attemptedData: {...data}
      })
    throw new Error(`Erro ao criar ficha do empregado ${error.message}`)
    }
    
   
  }

  async getFilesByEmployee(employeeId: number): Promise<File[]> {
    return this.prisma.file.findMany({ where: { employeeId } });
  }

  async deleteFile(id: number, fileName: string, userId: number): Promise<File>{
    try {
      const deteleFile =  this.prisma.file.delete({where:{id, fileName}})
      await this.logsService.createLogs(LogsEnum.DELETE_FICHA, userId, { deleteFile: (await deteleFile).id })
      return 
      
    } catch (error) {
      await this.logsService.createLogs(LogsEnum.CRIAR_FICHA_EMPREGADO_FAILED, userId, {
        errorMessage: error.message,
         attemptedData: {fileName}
      })
    throw new Error(`Erro ao tentar deletar o arquivo ${error.message}`)
    }
  }
}