import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { ClienteEntity } from './entities/cliente.entity';

@Controller('cliente')
@ApiTags('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post()
  @ApiCreatedResponse({ type: ClienteEntity })
  create(@Body() createClienteDto: CreateClienteDto) {
    return this.clienteService.create(createClienteDto);
  }

  @Get()
  @ApiOkResponse({ type: ClienteEntity, isArray: true })
  findAll(@Query('estado') _estado: string) {
    const estado = JSON.parse(_estado);
    return this.clienteService.findAll(estado);
  }

  @Get(':id')
  @ApiOkResponse({ type: ClienteEntity })
  findOne(@Param('id') id: string) {
    return this.clienteService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ClienteEntity })
  update(@Param('id') id: string, @Body() updateClienteDto: UpdateClienteDto) {
    return this.clienteService.update(+id, updateClienteDto);
  }

  @Delete(':id')
  @ApiOkResponse({
    type: ClienteEntity,
    status: 204,
    description: 'Se eliminó el elemento',
  })
  remove(@Param('id') id: string) {
    return this.clienteService.remove(+id);
  }
}
