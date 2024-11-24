import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { Operador } from './operador.entity';
import { Producto } from './../../productos/entities/producto.entity';

@Schema()
export class Pedido extends Document {

  @Prop()
  date: Date;
  
  @Prop()
  operador: Operador;
  
  @Prop()
  products: Producto[];

}
export const PedidoSchema = SchemaFactory.createForClass(Pedido);