import { Usuario } from 'src/users/entity/users.entity';
import { Medicamentos } from 'src/products/entity/products.entity';
export declare class HistorialImportacion {
    id: number;
    fecha: Date;
    usuario: Usuario;
    medicamento: Medicamentos;
    cantidad: number;
    detalles: string;
}
