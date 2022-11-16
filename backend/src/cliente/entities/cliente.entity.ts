import { ApiProperty } from '@nestjs/swagger';
import { cliente } from '@prisma/client';

export class ClienteEntity implements cliente {
  @ApiProperty()
  id: number;

  @ApiProperty({ required: true })
  nombre: string;

  @ApiProperty({ required: true })
  ci: string;

  @ApiProperty({ required: true })
  ap: string;

  @ApiProperty({ required: false })
  am: string;

  @ApiProperty({ default: true })
  estado: boolean;

  createdAt: Date;

  updatedAt: Date;

  updated_at: Date;

  created_at: Date;
}
