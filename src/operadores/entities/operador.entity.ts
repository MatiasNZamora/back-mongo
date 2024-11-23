import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Operador  extends Document{
  
  @Prop()
  email: string;
  
  @Prop()
  password: string;
  
  @Prop()
  role: string;

}

export const OperadorSchema = SchemaFactory.createForClass(Operador);