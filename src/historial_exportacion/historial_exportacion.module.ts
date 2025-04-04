import { Module } from '@nestjs/common';
import { HistorialExportacionService } from './historial_exportacion.service';
import { HistorialExportacionController } from './historial_exportacion.controller';

@Module({
  providers: [HistorialExportacionService],
  controllers: [HistorialExportacionController]
})
export class HistorialExportacionModule {}
