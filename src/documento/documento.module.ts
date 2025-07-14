import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Documento, DocumentoSchema } from './schemas/documento.schema';
import { DocumentoService } from './documento.service';
import { DocumentoController } from './documento.controller';
import { HistorialExportacionModule } from 'src/historial_exportacion/historial_exportacion.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Documento.name, schema: DocumentoSchema }]),
    HistorialExportacionModule,
    UsersModule
  ],
  providers: [DocumentoService],
  controllers: [DocumentoController],
  exports: [DocumentoService], // Exportamos el servicio para que pueda ser usado en otros módulos
})
export class DocumentoModule {}
