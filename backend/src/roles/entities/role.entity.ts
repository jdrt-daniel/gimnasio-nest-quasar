import { rol } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
export class RolEntity implements rol {
  @ApiProperty()
  id: number;

  @ApiProperty()
  nombre: string;

  @ApiProperty()
  estado: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
