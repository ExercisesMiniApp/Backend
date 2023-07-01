import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop()
  _id: number;

  @Prop()
  role: 0 | 1;
}

export const UserSchema = SchemaFactory.createForClass(User);
