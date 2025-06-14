import { IsOptional, IsString } from 'class-validator';

export class UpdateCategoriaDto {
    @IsOptional()
    @IsString()
    readonly nombre?: string;

}