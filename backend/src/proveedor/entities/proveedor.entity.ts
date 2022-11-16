import { ApiProperty } from '@nestjs/swagger';
import { proveedor } from '@prisma/client';
export class ProveedorEntity implements proveedor {
  @ApiProperty()
  id: number;

  @ApiProperty()
  nombre: string;

  @ApiProperty({ default: true })
  estado: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  created_at: Date;

  updated_at: Date;
}
