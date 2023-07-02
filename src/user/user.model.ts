import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class User {
  @Prop()
  _id: number;

  @Prop()
  role: 0 | 1;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Group' }] })
  groups?: string[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Group' }] })
  availableGroups?: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
