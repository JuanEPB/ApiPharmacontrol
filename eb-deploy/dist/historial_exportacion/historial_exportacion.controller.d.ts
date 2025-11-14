import { HistorialExportacionService } from './historial_exportacion.service';
import { HistorialExportacion } from './entity/historial_exportacion.entity';
export declare class HistorialExportacionController {
    private readonly historialService;
    constructor(historialService: HistorialExportacionService);
    findAll(): Promise<HistorialExportacion[]>;
    findByFecha(inicio: string, fin: string): Promise<HistorialExportacion[]>;
    findByNombreUsuario(nombre: string): Promise<HistorialExportacion[]>;
    findByUsuarioId(usuarioId: number): Promise<HistorialExportacion[]>;
    findByDocumentoId(documentoId: string): Promise<HistorialExportacion[]>;
    findOne(id: number): Promise<HistorialExportacion | null>;
}
