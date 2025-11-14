import { VentaService } from './venta.service';
import { CreateVentaDto } from './dto/create-venta.dto';
export declare class VentaController {
    private readonly ventaService;
    constructor(ventaService: VentaService);
    crearVenta(dto: CreateVentaDto, userId: number): Promise<import("./entities/venta.entity").Venta>;
}
