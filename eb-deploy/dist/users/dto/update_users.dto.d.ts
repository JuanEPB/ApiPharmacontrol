import { Rol } from './roles.enum';
export declare class UpdateUsuarioDto {
    readonly nombre?: string;
    readonly apellido?: string;
    readonly email?: string;
    readonly contraseña?: string;
    readonly rol?: Rol;
}
