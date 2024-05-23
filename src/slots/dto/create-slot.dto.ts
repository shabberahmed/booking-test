export class CreateSlotDto {
  readonly startTime: number;
  readonly endTime: number;
}
export class CreateSlotsDto {
  readonly slots: CreateSlotDto[];
}
