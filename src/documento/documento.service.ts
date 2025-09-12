import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Documento, DocumentoDocument } from './schemas/documento.schema';

@Injectable()
export class DocumentoService {
  constructor(
    @InjectModel(Documento.name)
    private documentoModel: Model<DocumentoDocument>,
  ) {}

  async guardarDesdeBuffer(
    buffer: Buffer,
    filename: string,
    mimetype: string,
    generadoPor?: string,
    descripcion?: string,
    tipoReporte?: string,
  ): Promise<DocumentoDocument> {  // Aquí el cambio importante
    const doc = new this.documentoModel({
      filename,
      mimetype,
      data: buffer,
      generadoPor: generadoPor || 'IA',
      descripcion,
      tipoReporte,
    });

    return doc.save();
  }

  async obtenerDocumentoPorId(id: string): Promise<DocumentoDocument | null> {
    return this.documentoModel.findById(id).exec();
  }

 async listarDocumentos(): Promise<DocumentoDocument[]> {
  return this.documentoModel
    .find()
    .select('-data')
    .sort({ createdAt: -1 }) // más recientes primero
    .limit(100)              // solo los últimos 100 (opcional)
    .exec();
}



  async obtenerPorTipoReporte(tipo: string): Promise<DocumentoDocument[]> {
    return this.documentoModel.find({ tipoReporte: tipo }).select('-data').exec();
  }


}
