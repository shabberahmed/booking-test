// src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SlotsModule } from './slots/slots.module';
import { BookingsModule } from './booking/booking.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/test-booking'),
    BookingsModule,
    SlotsModule,
  ],
})
export class AppModule {}
