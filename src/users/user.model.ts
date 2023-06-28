import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop()
  _id: number;

  @Prop()
  firstname: string;

  @Prop()
  lastname: string;

  @Prop()
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
