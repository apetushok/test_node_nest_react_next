import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  _id: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: false, default: false })
  bot: boolean;

  @Prop({ required: false, default: false })
  active: boolean;

  @Prop({ required: false, default: 0 })
  points: number;

  @Prop({ required: false, default: 0 })
  multiplier: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
