import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProveedorService } from './proveedor.service';
import { CreateProveedorDto } from './dto/create-proveedor.dto';
import { UpdateProveedorDto } from './dto/update-proveedor.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ProveedorEntity } from './entities/proveedor.entity';

@Controller('proveedor')
@ApiTags('proveedor')
export class ProveedorController {
  constructor(private readonly proveedorService: ProveedorService) {}

  @Post()
  @ApiCreatedResponse({ type: ProveedorEntity })
  create(@Body() createProveedorDto: CreateProveedorDto) {
    return this.proveedorService.create(createProveedorDto);
  }

  @Get()
  @ApiOkResponse({ type: ProveedorEntity, isArray: true })
  findAll() {
    return this.proveedorService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: ProveedorEntity })
  findOne(@Param('id') id: string) {
    return this.proveedorService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ProveedorEntity })
  update(
    @Param('id') id: string,
    @Body() updateProveedorDto: UpdateProveedorDto,
  ) {
    return this.proveedorService.update(+id, updateProveedorDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: ProveedorEntity })
  remove(@Param('id') id: string) {
    return this.proveedorService.remove(+id);
  }
}
