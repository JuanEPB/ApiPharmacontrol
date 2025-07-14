import { IsInt, IsNotEmpty, IsOptional, IsString, IsDate, IsNumber } from 'class-validator';

export class CreateHistorialExportacionesDto {

  @IsNotEmpty()
  @IsDate()
  readonly fechaExportacion: Date;

  @IsNotEmpty()
  @IsInt()
  readonly usuarioId: number; // ID del usuario que realiza la exportación
 
  @IsNotEmpty()
  @IsString()
  readonly documento: string;
}