import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose";

@Schema()
export class DetallePedido extends Document {

    @Prop()
    id: number;

    @Prop()
    cantidad: number;

};
export const DetallePedidoSchema = SchemaFactory.createForClass( DetallePedido );