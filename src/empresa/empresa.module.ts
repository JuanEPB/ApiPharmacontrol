import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Empresa } from './entities/empresa.entity';
import { EmpresaService } from './empresa.service';
import { EmpresaController } from './empresa.controller';
import { Plan } from '../plan/entities/plan.entity';
import { Suscripcion } from '../suscripcion/entities/suscripcion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Empresa, Plan, Suscripcion])],
  controllers: [EmpresaController],
  providers: [EmpresaService],
})
export class EmpresaModule {}
