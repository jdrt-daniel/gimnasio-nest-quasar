import { Module } from '@nestjs/common';
import { TelefonoService } from './telefono.service';
import { TelefonoController } from './telefono.controller';

@Module({
  controllers: [TelefonoController],
  providers: [TelefonoService]
})
export class TelefonoModule {}
