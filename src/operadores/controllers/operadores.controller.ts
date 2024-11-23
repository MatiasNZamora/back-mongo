import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';

import { OperadoresService } from '../services/operadores.service';
import { CreateOperadorDto, UpdateOperadorDto } from '../dtos/operador.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Operadores')
@Controller('operadores')
export class OperadoresController {
  constructor(private operadoresService: OperadoresService) {}

  @Get()
  findAll() {
    return this.operadoresService.findAll();
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.operadoresService.findOne(id);
  }

  @Get(':id/pedidos')
  getOrders(@Param('id', ParseIntPipe) id: number) {
    return this.operadoresService.getOrderByUser(id);
  }

  @Post()
  create(@Body() payload: CreateOperadorDto) {
    return this.operadoresService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateOperadorDto,
  ) {
    return this.operadoresService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.operadoresService.remove(+id);
  }
}
