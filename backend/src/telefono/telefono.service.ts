import { Injectable } from '@nestjs/common';
import { CreateTelefonoDto } from './dto/create-telefono.dto';
import { UpdateTelefonoDto } from './dto/update-telefono.dto';

@Injectable()
export class TelefonoService {
  create(createTelefonoDto: CreateTelefonoDto) {
    return 'This action adds a new telefono';
  }

  findAll() {
    return `This action returns all telefono`;
  }

  findOne(id: number) {
    return `This action returns a #${id} telefono`;
  }

  update(id: number, updateTelefonoDto: UpdateTelefonoDto) {
    return `This action updates a #${id} telefono`;
  }

  remove(id: number) {
    return `This action removes a #${id} telefono`;
  }
}
