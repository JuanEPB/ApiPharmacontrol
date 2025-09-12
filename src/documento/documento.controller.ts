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
// Si historial_exportacion no existe en el proyecto, comentar o eliminar esa dependencia.
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../auth/user.decorator';
import { Usuario } from '../usuarios/entities/usuario.entity';
import type { Response } from 'express';
import { Documento } from './schemas/documento.schema'; // Asegúrate de que la ruta sea correcta
import { Request } from 'express';
import { File } from 'multer';
import { UsuariosService } from '../usuarios/usuarios.service';
import { ServiceTokenGuard } from '../auth/service-token.guard';

@Controller('documentos')
export class DocumentoController {
  constructor(
    private readonly documentoService: DocumentoService,
    private readonly usersService: UsuariosService, // INYECTA UsuariosService
  ) {}

  @Post('subir')
  @UseGuards(ServiceTokenGuard, JwtAuthGuard)
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

    // 🔍 Buscar al usuario en MySQL por correo o identificador del token
    const usuario = await this.usersService.findByEmail(usuarioPayload.correo ?? usuarioPayload.email ?? usuarioPayload.userId);
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

    // Si no existe HistorialExportacion, omitir el registro aquí.
    // Si más adelante añades ese servicio, llama a su método registrar(usuario, documento._id.toString())

    return res.status(201).json({
      mensaje: 'Documento guardado',
      idDocumento: documento._id,
    });
  }

  @Get('listar')
  @UseGuards(JwtAuthGuard)
  async listarDocumentos(): Promise<Documento[]> {
    return this.documentoService.listarDocumentos();
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