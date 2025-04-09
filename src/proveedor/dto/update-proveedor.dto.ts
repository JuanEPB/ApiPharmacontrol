import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateProvedorDto{
 @IsNotEmpty()
  @IsString()
  readonly nombre?: string;

  @IsNotEmpty()
  @IsString()
  readonly contacto?: string;

  @IsNotEmpty()
  @IsString()
  readonly direccion?: string;

}