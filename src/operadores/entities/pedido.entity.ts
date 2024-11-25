import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Producto } from './../../productos/entities/producto.entity';
import { Comprador } from './comprador.entity';

@Schema()
export class Pedido extends Document {

  @Prop({ type: Date })
  date: Date;

  @Prop({ type: Types.ObjectId, ref: Comprador.name, required: true })
  comprador: Comprador | Types.ObjectId; 
  
  @Prop({ type: [{ type: Types.ObjectId, ref: Producto.name }] })
  productos: Types.Array<Producto>;
  
}
export const PedidoSchema = SchemaFactory.createForClass(Pedido);