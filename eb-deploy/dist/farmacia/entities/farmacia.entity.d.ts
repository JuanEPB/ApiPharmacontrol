import { Empresa } from '../../empresa/entities/empresa.entity';
import { Usuario } from '../../users/entity/users.entity';
import { Venta } from '../../venta/entities/venta.entity';
export declare class Farmacia {
    id: number;
    nombre: string;
    rfc: string;
    direccion: string;
    telefono: string;
    email: string;
    lema: string;
    logo_url: string;
    empresa: Empresa;
    activo: boolean;
    fechaRegistro: Date;
    usuarios: Usuario[];
    ventas: Venta[];
}
