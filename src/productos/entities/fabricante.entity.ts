import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export class Fabricante extends Document {
  
  @Prop()
  nombre: string;
  
  @Prop()
  direccion: string;
  
  @Prop()
  email: string;
  
  @Prop()
  imagen?: string;

}

export const FabricanteSchema = SchemaFactory.createForClass(Fabricante);