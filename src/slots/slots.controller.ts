/* eslint-disable prettier/prettier */
// src/slots/slots.controller.ts
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Controller, Get, Post, Body, Param, Res } from '@nestjs/common';
import { SlotsService } from './slots.service';
// import { CreateSlotDto } from './dto/create-slot.dto';
import { Response } from 'express';
@Controller('slots')
export class SlotsController {
  constructor(private readonly slotsService: SlotsService) {}

  @Post('book1')
  async createMultipleSlots(@Body() createSlotsDto: any) {
    console.log("c",createSlotsDto)
    return this.slotsService.createSlots(createSlotsDto.slots);
  }

  @Post('book')
  bookSlots(
    @Body('startTime') startTime: number,
    @Body('endTime') endTime: number,
    @Body('clientName') clientName: string,
    @Res() response: Response,
  ) {
    this.slotsService.bookSlots(startTime, endTime, clientName);
    return response.json({ m: 'booked' });
  }

  

  @Get()
  findAll() {
    return this.slotsService.findAll();
  }
}
