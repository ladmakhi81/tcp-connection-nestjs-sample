import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

@Schema()
export class Token {
  @Prop({ required: true, type: Types.ObjectId, ref: "user" })
  userId: string;

  @Prop({ required: true })
  code: string;
}

export type TokenDocument = HydratedDocument<Token>;

export const TokenSchema = SchemaFactory.createForClass(Token);
