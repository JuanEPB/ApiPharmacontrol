import { DocumentoService } from './documento.service';
import { HistorialExportacionService } from 'src/historial_exportacion/historial_exportacion.service';
import { Response } from 'express';
import { UsersService } from 'src/users/users.service';
import { File } from 'multer';
export declare class DocumentoController {
    private readonly documentoService;
    private readonly historialExportacionService;
    private readonly usersService;
    constructor(documentoService: DocumentoService, historialExportacionService: HistorialExportacionService, usersService: UsersService);
    subirDocumento(file: File, usuarioPayload: any, body: any, res: Response): Promise<Response<any, Record<string, any>>>;
    listarDocumentos(): Promise<any[]>;
    obtenerPorTipoReporte(tipo: string): Promise<import("./schemas/documento.schema").DocumentoDocument[] | {
        mensaje: string;
        statusCode: number;
    }>;
    obtenerDocumentoPorId(id: string, res: Response): Promise<void>;
    descargarDocumentoPorId(id: string, res: Response): Promise<void>;
}
