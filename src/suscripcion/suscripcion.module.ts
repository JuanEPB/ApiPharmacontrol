import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Suscripcion } from './entities/suscripcion.entity';
import { SuscripcionService } from './suscripcion.service';
import { SuscripcionController } from './suscripcion.controller';
import { Empresa } from '../empresa/entities/empresa.entity';
import { Plan } from '../plan/entities/plan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Suscripcion, Empresa, Plan])],
  controllers: [SuscripcionController],
  providers: [SuscripcionService],
  exports: [SuscripcionService],
})
export class SuscripcionModule {}
