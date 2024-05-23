import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Booking extends Document {
  @Prop({ type: Number, required: true })
  startTime: number;

  @Prop({ type: Number, required: true })
  endTime: number;

  @Prop({ type: String, required: true })
  clientName: string;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
