import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  Res,
  UploadedFiles,
  Body,
  Get,
  Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentoService } from './documento.service';
import { HistorialExportacionService } from 'src/historial_exportacion/historial_exportacion.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/auth/user.decorator';
import { Usuario } from 'src/users/entity/users.entity';
import { Response } from 'express';
import { Documento } from './schemas/documento.schema'; // Asegúrate de que la ruta sea correcta
import { Request } from 'express';
import { File } from 'multer'; 
import { UsersService } from 'src/users/users.service';
import { Express } from 'express';

@Controller('documentos')
export class DocumentoController {
  constructor(
    private readonly documentoService: DocumentoService,
    private readonly historialExportacionService: HistorialExportacionService,
    private readonly usersService: UsersService, // INYECTA UsersService
  ) {}

  @Post('subir')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async subirDocumento(
    @UploadedFile() file: File,
    @User() usuarioPayload: any,
    @Body() body: any, // esto es solo el payload del token
    @Res() res: Response,
  ) {
    if (!file) {
      return res.status(400).json({ mensaje: 'Archivo no enviado' });
    }

    // 🔍 Buscar al usuario en MySQL por correo
    const usuario = await this.usersService.findByEmail(usuarioPayload.userId);

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado en MySQL' });
    }

    const documento = await this.documentoService.guardarDesdeBuffer(
      file.buffer,
      file.originalname,
      file.mimetype,
      usuario.nombre || 'Usuario',
      body.descripcion || '', // descripción
      body.tipoReporte || '', // tipoReporte
    );

    await this.historialExportacionService.registrar(usuario, documento._id.toString());

    return res.status(201).json({
      mensaje: 'Documento guardado y historial registrado',
      idDocumento: documento._id,
    });
  }


    @Get('listar')
  @UseGuards(JwtAuthGuard)
  async listarDocumentos(): Promise<Documento[]> {
    return this.documentoService.listarDocumentos(); // NestJS devolverá el JSON automáticamente
  }


  @Get('tipo/:tipo')
  @UseGuards(JwtAuthGuard)
  async obtenerPorTipoReporte(
    @Param('tipo') tipo: string,
  ) {
    const documentos = await this.documentoService.obtenerPorTipoReporte(tipo);
    if (!documentos || documentos.length === 0) {
      return {
        mensaje: 'No se encontraron documentos para este tipo de reporte',
        statusCode: 404,
      };
    }

    return documentos;
  }

   @Get(':id')
  @UseGuards(JwtAuthGuard)
  async obtenerDocumentoPorId(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<void> {
    const documento = await this.documentoService.obtenerDocumentoPorId(id);
    if (!documento) {
      res.status(404).json({ mensaje: 'Documento no encontrado' });
      return;
    }

    res.set({
      'Content-Type': documento.mimetype,
      'Content-Disposition': `attachment; filename="${documento.filename}"`,
    });

    res.send(documento.data);
  }


}