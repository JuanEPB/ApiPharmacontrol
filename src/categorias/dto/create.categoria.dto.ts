import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCategoriaDto {
  @IsString()
  @IsNotEmpty()
  readonly nombre: string;

}