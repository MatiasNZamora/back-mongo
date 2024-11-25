import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Categoria } from './categoria.entity';
import { Fabricante } from './fabricante.entity';

@Schema()
export class Producto extends Document {
  
  @Prop({ required: true, unique: true })
  nombre: string;

  @Prop()
  descripcion: string;

  @Prop({ type: Number, index: true }) 
  precio: number;

  @Prop({ type: Number })
  stock: number;

  @Prop()
  origen: string;

  @Prop()
  imagen: string;

  @Prop(
    raw({
      nombre: { type: String },
      imagen: { type: String },
    }),
  )
  categoria: Record<string, any>; // Propiedad de tipo subdocumento.

  @Prop({ type: Types.ObjectId, ref: Fabricante.name }) // definimos la relacion 
  fabricante: Fabricante | Types.ObjectId; // campo nuevo en productos

}

export const ProductoSchema = SchemaFactory.createForClass(Producto);
ProductoSchema.index({ price: 1, stock: -1 });
