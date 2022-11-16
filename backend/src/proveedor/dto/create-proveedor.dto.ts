import { ApiProperty } from '@nestjs/swagger';

export class CreateProveedorDto {
  @ApiProperty()
  nombre: string;

  @ApiProperty({ required: false, default: false })
  estado?: boolean = false;
}
