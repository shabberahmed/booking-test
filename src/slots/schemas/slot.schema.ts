import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Slot extends Document {
  @Prop({ type: Number, required: true })
  startTime: number;

  @Prop({ type: Number, required: true })
  endTime: number;

  @Prop({ type: Boolean, required: true, default: false })
  booked: boolean;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Booking' })
  bookingId?: MongooseSchema.Types.ObjectId;
}

export const SlotSchema = SchemaFactory.createForClass(Slot);
