import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TelefonoService } from './telefono.service';
import { CreateTelefonoDto } from './dto/create-telefono.dto';
import { UpdateTelefonoDto } from './dto/update-telefono.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('telefono')
@ApiTags('telefono')
export class TelefonoController {
  constructor(private readonly telefonoService: TelefonoService) {}

  @Post()
  create(@Body() createTelefonoDto: CreateTelefonoDto) {
    return this.telefonoService.create(createTelefonoDto);
  }

  @Get()
  findAll() {
    return this.telefonoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.telefonoService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTelefonoDto: UpdateTelefonoDto,
  ) {
    return this.telefonoService.update(+id, updateTelefonoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.telefonoService.remove(+id);
  }
}
