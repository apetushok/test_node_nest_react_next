import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../user/schemas/user.schema';

export type RoundDocument = mongoose.HydratedDocument<Round>;

@Schema()
export class Round {
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  users: User[];

  @Prop({ type: mongoose.Schema.Types.Map, of: mongoose.Schema.Types.Number })
  points: Map<string, number>; // Key: User ID, Value: Points set by the user for this round

  @Prop({ type: mongoose.Schema.Types.Map, of: mongoose.Schema.Types.Number })
  multiplier: Map<string, number>; // Key: User ID, Value: Multiplier set by the user for this round
}

export const RoundSchema = SchemaFactory.createForClass(Round);
