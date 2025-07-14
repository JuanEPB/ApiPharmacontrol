import { Module } from '@nestjs/common';
import { HistorialExportacionService } from './historial_exportacion.service';
import { HistorialExportacionController } from './historial_exportacion.controller';
import { HistorialExportacion } from './entity/historial_exportacion.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/users/entity/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HistorialExportacion, Usuario])],
  exports: [HistorialExportacionService],
  providers: [HistorialExportacionService],
  controllers: [HistorialExportacionController]
})
export class HistorialExportacionModule {}
