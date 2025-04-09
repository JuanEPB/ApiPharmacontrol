import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { Rol } from './roles.enum';

export class UpdateUsuarioDto {
  @IsOptional()
  @IsString()
  readonly nombre?: string;

  @IsOptional()
  @IsString()
  readonly apellido?: string;

  @IsOptional()
  @IsEmail()
  readonly email?: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  readonly contraseña?: string;

  @IsOptional()
  @IsEnum(Rol)
  readonly rol?: Rol;
}
