import { Rol } from '../dto/roles.enum';
import { Farmacia } from '../../farmacia/entities/farmacia.entity';
export declare class Usuario {
    id: number;
    nombre: string;
    apellido: string;
    rol: Rol;
    contraseña: string;
    email: string;
    farmacia: Farmacia;
    static farmacia: any;
}
