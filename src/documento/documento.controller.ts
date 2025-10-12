import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  Res,
  Body,
  Get,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentoService } from './documento.service';
import { HistorialExportacionService } from 'src/historial_exportacion/historial_exportacion.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/auth/user.decorator';
import { Response } from 'express';
import { Documento } from './schemas/documento.schema';
import { UsersService } from 'src/users/users.service';
import { File } from 'multer';
import mongoose from 'mongoose';

@Controller('documentos')
export class DocumentoController {
  constructor(
    private readonly documentoService: DocumentoService,
    private readonly historialExportacionService: HistorialExportacionService,
    private readonly usersService: UsersService,
  ) {}

  // 🔹 SUBIR DOCUMENTO
  @Post('subir')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async subirDocumento(
    @UploadedFile() file: File,
    @User() usuarioPayload: any,
    @Body() body: any,
    @Res() res: Response,
  ) {
    if (!file) {
      return res.status(400).json({ mensaje: 'Archivo no enviado' });
    }

    const usuario = await this.usersService.findByEmail(usuarioPayload.userId);
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado en MySQL' });
    }

    // Convertimos a Buffer limpio antes de guardar
    const buffer = Buffer.isBuffer(file.buffer)
      ? file.buffer
      : Buffer.from(file.buffer);

    const documento = await this.documentoService.guardarDesdeBuffer(
      buffer,
      file.originalname,
      file.mimetype,
      usuario.nombre || 'Usuario',
      body.descripcion || '',
      body.tipoReporte || '',
    );

    await this.historialExportacionService.registrar(
      usuario,
      documento._id.toString(),
    );

    return res.status(201).json({
      mensaje: 'Documento guardado y historial registrado',
      idDocumento: documento._id,
    });
  }

  // 🔹 LISTAR DOCUMENTOS (sin campo binario data)
 @Get('listar')
@UseGuards(JwtAuthGuard)
async listarDocumentos(): Promise<any[]> {
  const documentos = await this.documentoService.listarDocumentos();
  return documentos.map((doc) => ({
    _id: doc._id,
    filename: doc.filename,
    mimetype: doc.mimetype,
    descripcion: doc.descripcion,
    tipoReporte: doc.tipoReporte,
    generadoPor: doc.generadoPor,
    createdAt: (doc as any).createdAt,
    updatedAt: (doc as any).updatedAt,
  }));
}


  // 🔹 OBTENER DOCUMENTOS POR TIPO
  @Get('tipo/:tipo')
  @UseGuards(JwtAuthGuard)
  async obtenerPorTipoReporte(@Param('tipo') tipo: string) {
    const documentos = await this.documentoService.obtenerPorTipoReporte(tipo);
    if (!documentos || documentos.length === 0) {
      return {
        mensaje: 'No se encontraron documentos para este tipo de reporte',
        statusCode: 404,
      };
    }
    return documentos;
  }

  // 🔹 OBTENER DOCUMENTO POR ID (parsea JSON o devuelve binario inline)
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async obtenerDocumentoPorId(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<void> {
    const documento = await this.documentoService.obtenerDocumentoPorId(id);
    if (!documento) {
      throw new NotFoundException('Documento no encontrado');
    }

    // Si es JSON, lo devolvemos como objeto
    if (documento.mimetype === 'application/json') {
      try {
        let jsonString: string;

        const data: any = documento.data;
        if (Buffer.isBuffer(data)) {
          jsonString = data.toString('utf8');
        } else if (data?.type === 'Buffer' && Array.isArray(data?.data)) {
          jsonString = Buffer.from(data.data).toString('utf8');
        } else if (data?.buffer) {
          jsonString = Buffer.from(data.buffer).toString('utf8');
        } else {
          throw new Error('Formato de documento no reconocido');
        }

        const cleanString = jsonString.trim().replace(/\0/g, '');
        const lastBrace = Math.max(
          cleanString.lastIndexOf('}'),
          cleanString.lastIndexOf(']'),
        );
        const safeJSON = cleanString.slice(0, lastBrace + 1);

        const parsed = JSON.parse(safeJSON);
        res.json(parsed);
        return;
      } catch (error) {
        console.error('❌ Error parseando JSON del documento:', error);
        res.status(500).json({ mensaje: 'Error procesando documento JSON' });
        return;
      }
    }

    // Si es otro tipo de archivo (imagen, pdf, etc.)
    res.set({
      'Content-Type': documento.mimetype,
      'Content-Disposition': `inline; filename="${documento.filename}"`,
    });
    res.send(documento.data);
  }

  // 🔹 DESCARGAR DOCUMENTO POR ID (descarga forzada)
  @Get('descargar/:id')
  @UseGuards(JwtAuthGuard)
  async descargarDocumentoPorId(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<void> {

    if (!mongoose.isValidObjectId(id)) {
      throw new NotFoundException('ID ${id} de documento no válido');
    }
    const documento = await this.documentoService.obtenerDocumentoPorId(id);
    if (!documento) {
      throw new NotFoundException('Documento no encontrado');
    }

    const data: any = documento.data;
    const buffer = Buffer.isBuffer(data)
      ? data
      : Buffer.from(data.buffer || data.data);


    res.set({
      'Content-Type': documento.mimetype,
      'Content-Disposition': `attachment; filename="${documento.filename}"`,
    });

    res.send(buffer);
  }
}
