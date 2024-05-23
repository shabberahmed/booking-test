import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SlotsService } from './slots.service';
import { SlotsController } from './slots.controller';
import { Slot, SlotSchema } from './schemas/slot.schema';
import { Booking, BookingSchema } from 'src/booking/schemas/booking.schema';
import { BookingsService } from 'src/booking/booking.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Slot.name, schema: SlotSchema }]),
    MongooseModule.forFeature([{ name: Booking.name, schema: BookingSchema }]),
  ],
  providers: [SlotsService, BookingsService],
  controllers: [SlotsController],
})
export class SlotsModule {}
