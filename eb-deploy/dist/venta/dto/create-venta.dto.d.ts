declare class DetalleDto {
    medicamentoId: number;
    cantidad: number;
    precioUnitario: number;
}
export declare class CreateVentaDto {
    detalles: DetalleDto[];
    total: number;
}
export {};
