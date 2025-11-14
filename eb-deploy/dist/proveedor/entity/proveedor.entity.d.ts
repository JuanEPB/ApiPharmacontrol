import { Medicamentos } from 'src/products/entity/products.entity';
export declare class Proveedor {
    id: number;
    nombre: string;
    contacto: string;
    direccion: string;
    medicamentos: Medicamentos[];
}
