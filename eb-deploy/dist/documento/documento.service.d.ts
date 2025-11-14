import { Model } from 'mongoose';
import { DocumentoDocument } from './schemas/documento.schema';
export declare class DocumentoService {
    private documentoModel;
    constructor(documentoModel: Model<DocumentoDocument>);
    guardarDesdeBuffer(buffer: Buffer, filename: string, mimetype: string, generadoPor?: string, descripcion?: string, tipoReporte?: string): Promise<DocumentoDocument>;
    obtenerDocumentoPorId(id: string): Promise<DocumentoDocument | null>;
    listarDocumentos(): Promise<DocumentoDocument[]>;
    obtenerPorTipoReporte(tipo: string): Promise<DocumentoDocument[]>;
}
