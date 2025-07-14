import { IsArray, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class DetalleDto {
  @IsNumber()
  medicamentoId: number;

  @IsNumber()
  cantidad: number;

  @IsNumber()
  precioUnitario: number;
}

export class CreateVentaDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetalleDto)
  detalles: DetalleDto[];

  @IsNumber()
  total: number;
}
