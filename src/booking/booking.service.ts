/* eslint-disable prettier/prettier */
// src/bookings/bookings.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking } from './schemas/booking.schema';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingsService {
  constructor(
    @InjectModel(Booking.name) private bookingModel: Model<Booking>,
  ) {}

  async createBooking(createBookingDto: CreateBookingDto): Promise<Booking> {
    const conflictingBookings = await this.bookingModel
      .find()
      .where('startTime').lt(createBookingDto.endTime)
      .where('endTime').gt(createBookingDto.startTime)
      .exec();

    if (conflictingBookings.length === 0) {
      const newBooking = new this.bookingModel(createBookingDto);
      return newBooking.save();
    } else {
      throw new Error('Conflicting bookings found');
    }
  }

  async findAll(): Promise<Booking[]> {
    return this.bookingModel.find().exec();
  }

  async findOne(id: string): Promise<Booking> {
    return this.bookingModel.findById(id).exec();
  }
}
