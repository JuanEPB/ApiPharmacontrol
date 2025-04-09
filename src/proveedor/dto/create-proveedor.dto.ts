import { IsNotEmpty, IsString, IsDate } from 'class-validator';

export class CreateProveedorDto{
 @IsNotEmpty()
  @IsString()
  readonly nombre: string;

  @IsNotEmpty()
  @IsString()
  readonly contacto: string;

  @IsNotEmpty()
  @IsString()
  readonly direccion: string;

}