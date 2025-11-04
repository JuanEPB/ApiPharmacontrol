import { IsOptional, IsString, IsBoolean } from 'class-validator';

export class CreateConfiguracionDto {
  @IsOptional()
  @IsString()
  logo_url?: string;

  @IsOptional()
  @IsString()
  lema?: string;

  @IsOptional()
  @IsString()
  color_primario?: string;

  @IsOptional()
  @IsString()
  color_secundario?: string;

  @IsOptional()
  @IsBoolean()
  mostrar_marca?: boolean;

  empresa_id: number;
}
