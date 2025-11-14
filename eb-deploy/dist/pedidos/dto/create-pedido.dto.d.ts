export declare class CreatePedidoItemDto {
    medicamentoId: number;
    cantidad: number;
    precioUnitario?: number;
    lote?: string;
    fechaCaducidad?: string;
}
export declare class CreatePedidoDto {
    proveedorId: number;
    farmaciaId: number;
    items: CreatePedidoItemDto[];
}
