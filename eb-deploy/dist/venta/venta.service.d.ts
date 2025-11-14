import { Repository } from 'typeorm';
import { Venta } from './entities/venta.entity';
import { VentaDetalle } from './entities/venta_detalle.entity';
import { CreateVentaDto } from './dto/create-venta.dto';
import { Usuario } from 'src/users/entity/users.entity';
import { Medicamentos } from 'src/products/entity/products.entity';
import { DocumentoService } from 'src/documento/documento.service';
import { HistorialExportacionService } from 'src/historial_exportacion/historial_exportacion.service';
export declare class VentaService {
    private ventaRepo;
    private detalleRepo;
    private medicamentoRepo;
    private usuarioRepo;
    private readonly documentoService;
    private readonly historialService;
    constructor(ventaRepo: Repository<Venta>, detalleRepo: Repository<VentaDetalle>, medicamentoRepo: Repository<Medicamentos>, usuarioRepo: Repository<Usuario>, documentoService: DocumentoService, historialService: HistorialExportacionService);
    crearVenta(createVentaDto: CreateVentaDto, userId: number): Promise<Venta>;
}
