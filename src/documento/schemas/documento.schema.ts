import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type DocumentoDocument = Documento & Document & { _id: Types.ObjectId };

@Schema({ timestamps: true })
export class Documento {
  @Prop({ required: true })
  filename: string;

  @Prop({ required: true })
  mimetype: string;

  @Prop({ required: true, type: Buffer })
  data: Buffer;

  @Prop()
  descripcion?: string;

  @Prop()
  generadoPor?: string;

  @Prop()
  tipoReporte?: string; 
}

export const DocumentoSchema = SchemaFactory.createForClass(Documento);
