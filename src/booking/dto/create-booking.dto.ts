// src/bookings/dto/create-booking.dto.ts
export class CreateBookingDto {
  readonly startTime: number;
  readonly endTime: number;
  readonly clientName: string;
}
