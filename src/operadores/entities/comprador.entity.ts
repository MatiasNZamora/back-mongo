
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { cp } from "fs";
import { Document, Types } from "mongoose";

@Schema()
export class Comprador extends Document {
  
  @Prop()
  id: number;
  
  @Prop()
  nombre: string;
  
  @Prop()
  apellido: string;
  
  @Prop()
  telefono: string;

  @Prop({
    type: [
      {
        calle: { type: String },
        numero: { type: String },
        ciudad: { type: String },
      },
    ],
  })
  direcciones: Types.Array<Record <string, any>>

}

export const CompradorSchema = SchemaFactory.createForClass(Comprador);