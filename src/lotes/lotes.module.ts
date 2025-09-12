// filepath: c:\api\api\src\lotes\lotes.module.ts
// ...existing code...
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LotesService } from './lotes.service';
import { LotesController } from './lotes.controller';
import { Lote } from './entities/lote.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lote])],
  controllers: [LotesController],
  providers: [LotesService],
  exports: [LotesService],
})
export class LotesModule {}