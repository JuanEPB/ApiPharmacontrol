import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Farmacia } from './entities/farmacia.entity';
import { Empresa } from '../empresa/entities/empresa.entity';
import { FarmaciaService } from './farmacia.service';
import { FarmaciaController } from './farmacia.controller';
import { Plan } from '../plan/entities/plan.entity';
import { PlanModule } from '../plan/plan.module';

@Module({
  imports: [TypeOrmModule.forFeature([Farmacia, Empresa, Plan]), PlanModule],
  controllers: [FarmaciaController],
  providers: [FarmaciaService],
  exports: [FarmaciaService],
})
export class FarmaciaModule {}
