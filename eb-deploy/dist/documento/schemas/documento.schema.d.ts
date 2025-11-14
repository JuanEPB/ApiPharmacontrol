import { Document, Types } from 'mongoose';
export type DocumentoDocument = Documento & Document & {
    _id: Types.ObjectId;
};
export declare class Documento {
    filename: string;
    mimetype: string;
    data: Buffer;
    descripcion?: string;
    generadoPor?: string;
    tipoReporte?: string;
}
export declare const DocumentoSchema: import("mongoose").Schema<Documento, import("mongoose").Model<Documento, any, any, any, Document<unknown, any, Documento, any> & Documento & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Documento, Document<unknown, {}, import("mongoose").FlatRecord<Documento>, {}> & import("mongoose").FlatRecord<Documento> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
