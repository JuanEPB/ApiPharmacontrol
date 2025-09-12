import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Documento, DocumentoSchema } from './schemas/documento.schema';
import { DocumentoService } from './documento.service';
import { DocumentoController } from './documento.controller';
// Si no existe historial_exportacion, omitir su import.
import { UsuariosModule } from '../usuarios/usuarios.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Documento.name, schema: DocumentoSchema }]),
    UsuariosModule
  ],
  providers: [DocumentoService],
  controllers: [DocumentoController],
  exports: [DocumentoService], // Exportamos el servicio para que pueda ser usado en otros módulos
})
export class DocumentoModule {}
