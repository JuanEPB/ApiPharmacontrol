import { IsInt, IsNotEmpty, IsOptional, IsString, IsDate, IsNumber } from 'class-validator';

export class CreateMedicamentoDto {
  @IsNotEmpty()
  @IsString()
  readonly nombre: string;

  @IsNotEmpty()
  @IsString()
  readonly lote: string;

  @IsNotEmpty()
  @IsDate()
  readonly caducidad: Date;

  @IsOptional()
  @IsInt()
  readonly proveedorId: number;  // ID del proveedor

  @IsNotEmpty()
  @IsInt()
  readonly stock: number;

  @IsNotEmpty()
  @IsNumber()
  readonly precio: number;

  @IsOptional()
  @IsInt()
  readonly categoriaId: number;  // ID de la categoría
}
