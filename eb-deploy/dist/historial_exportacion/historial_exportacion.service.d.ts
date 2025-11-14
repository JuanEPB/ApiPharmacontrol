import { Repository } from 'typeorm';
import { HistorialExportacion } from './entity/historial_exportacion.entity';
import { Usuario } from 'src/users/entity/users.entity';
export declare class HistorialExportacionService {
    private historialRepo;
    private usuarioRepo;
    constructor(historialRepo: Repository<HistorialExportacion>, usuarioRepo: Repository<Usuario>);
    findAll(): Promise<HistorialExportacion[]>;
    findOne(id: number): Promise<HistorialExportacion | null>;
    findByFecha(fechaInicio: Date, fechaFin: Date): Promise<HistorialExportacion[]>;
    findByNombreUsuario(nombre: string): Promise<HistorialExportacion[]>;
    findByUsuarioId(usuarioId: number): Promise<HistorialExportacion[]>;
    findbyiddocumento(documentoId: string): Promise<HistorialExportacion[]>;
    registrar(usuario: Usuario, documentoId: string): Promise<HistorialExportacion>;
}
