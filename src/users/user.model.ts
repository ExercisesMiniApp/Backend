import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class User {
  @Prop()
  _id: number;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
export const UserModel = mongoose.model<User>('User', UserSchema);
