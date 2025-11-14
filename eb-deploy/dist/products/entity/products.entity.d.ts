import { Categoria } from 'src/categorias/entity/categorias.entity';
import { Proveedor } from 'src/proveedor/entity/proveedor.entity';
export declare class Medicamentos {
    id: number;
    nombre: string;
    lote: string;
    caducidad: Date;
    proveedor: Proveedor;
    stock: number;
    precio: number;
    categoria: Categoria;
}
