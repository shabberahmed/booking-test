import { Module } from '@nestjs/common';
import { MyServiceService } from './my-service.service';
import { MyServiceController } from './my-service.controller';

@Module({
  providers: [MyServiceService],
  controllers: [MyServiceController]
})
export class MyServiceModule {}
