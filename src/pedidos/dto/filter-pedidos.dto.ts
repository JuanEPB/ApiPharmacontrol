import { IsEnum, IsInt, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { PedidoStatus } from './pedido-status.enum';

export class FilterPedidosDto {
  @IsOptional()
  @IsEnum(PedidoStatus)
  estatus?: PedidoStatus;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;
}
