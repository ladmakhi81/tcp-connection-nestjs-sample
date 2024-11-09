import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema()
export class Task {
  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop()
  userId: string;
}

export type TaskDocument = HydratedDocument<Task>;

export const TaskSchema = SchemaFactory.createForClass(Task);
