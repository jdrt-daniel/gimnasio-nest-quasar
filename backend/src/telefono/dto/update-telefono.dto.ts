import { PartialType } from '@nestjs/swagger';
import { CreateTelefonoDto } from './create-telefono.dto';

export class UpdateTelefonoDto extends PartialType(CreateTelefonoDto) {}
