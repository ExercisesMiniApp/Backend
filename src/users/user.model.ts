import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop()
  _id: number;

  @Prop()
  first_name: string;

  @Prop()
  last_name: string;

  @Prop()
  role: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
