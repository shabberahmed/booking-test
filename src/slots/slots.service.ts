import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Slot } from './schemas/slot.schema';
import { CreateSlotDto } from './dto/create-slot.dto';
import { BookingsService } from 'src/booking/booking.service';

@Injectable()
export class SlotsService {
  constructor(
    @InjectModel(Slot.name) private slotModel: Model<Slot>,
    private readonly bookingsService: BookingsService,
  ) {}

  async createSlot(createSlotDto: CreateSlotDto): Promise<Slot> {
    const newSlot = new this.slotModel(createSlotDto);
    return newSlot.save();
  }

  async createSlots(createSlotsDto: any): Promise<Slot[]> {
    console.log(createSlotsDto,"at services");
    // const newSlots = await createSlotsDto.slots.map(
    //   (dto) => new this.slotModel(dto),
    // );
    const createdSlots = await this.slotModel.insertMany(createSlotsDto);
    return createdSlots as any[]; // Type assertion here
  }

  async bookSlots(
    startTime: number,
    endTime: number,
    clientName: string,
  ): Promise<void> {
    const newBooking = await this.bookingsService.createBooking({
      startTime,
      endTime,
      clientName,
    });

    const slotsToBook = await this.slotModel
      .find()
      .where('startTime')
      .gte(startTime)
      .where('endTime')
      .lte(endTime)
      .exec();

    for (const slot of slotsToBook) {
      if (!slot.booked) {
        await this.slotModel.findByIdAndUpdate(slot._id, {
          $set: {
            booked: true,
            bookingId: newBooking._id,
          },
        });
      } else {
        throw new Error(
          `Slot from ${slot.startTime} to ${slot.endTime} is already booked`,
        );
      }
    }
  }

  async findAll(): Promise<Slot[]> {
    return this.slotModel.find().exec();
  }
}
