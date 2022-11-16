import { ApiProperty } from '@nestjs/swagger';

export class CreateClienteDto {
  @ApiProperty({ required: true, default: 'Daniel' })
  nombre: string;

  @ApiProperty({ required: true, default: '4533232' })
  ci: string;

  @ApiProperty({ required: true, default: 'Trujillo' })
  ap: string;

  @ApiProperty({ required: false, default: 'Gutierrez' })
  am: string;

  @ApiProperty({ default: true })
  estado: boolean;
}
