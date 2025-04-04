import { IsInt, IsOptional, IsString, IsDate, IsNumber } from 'class-validator';

export class UpdateMedicamentoDto {
  @IsOptional()
  @IsString()
  readonly nombre?: string;

  @IsOptional()
  @IsString()
  readonly lote?: string;

  @IsOptional()
  @IsDate()
  readonly caducidad?: Date;

  @IsOptional()
  @IsInt()
  readonly proveedorId?: number;  // ID del proveedor

  @IsOptional()
  @IsInt()
  readonly stock?: number;

  @IsOptional()
  @IsNumber()
  readonly precio?: number;

  @IsOptional()
  @IsInt()
  readonly categoriaId?: number;  // ID de la categoría
}
