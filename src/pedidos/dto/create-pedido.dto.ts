import { IsArray, ArrayMinSize, ValidateNested, IsInt, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePedidoItemDto {
  @IsInt()
  medicamentoId: number;

  @IsInt()
  @IsPositive()
  cantidad: number;

  // opcional: si ya tienes precio por proveedor-medicamento, puedes omitirlo en el body
  @IsPositive()
  precioUnitario?: number;

  // opcional para escalabilidad (si manejas lote/caducidad por ítem)
  lote?: string;
  fechaCaducidad?: string; // ISO: 'YYYY-MM-DD'
}

export class CreatePedidoDto {
  @IsInt()
  proveedorId: number;

  @IsInt()
  farmaciaId: number;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreatePedidoItemDto)
  items: CreatePedidoItemDto[];
}
