import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProveedorDto } from './dto/create-proveedor.dto';
import { UpdateProveedorDto } from './dto/update-proveedor.dto';

@Injectable()
export class ProveedorService {
  constructor(private prisma: PrismaService) {}

  create(createProveedorDto: CreateProveedorDto) {
    return this.prisma.proveedor.create({ data: createProveedorDto });
  }

  findAll() {
    return this.prisma.proveedor.findMany({ where: { estado: true } });
  }

  findOne(id: number) {
    return this.prisma.proveedor.findFirst({ where: { id } });
  }

  update(id: number, updateProveedorDto: UpdateProveedorDto) {
    return this.prisma.proveedor.update({
      where: { id },
      data: updateProveedorDto,
    });
  }

  remove(id: number) {
    return this.prisma.proveedor.delete({ where: { id } });
  }
}
