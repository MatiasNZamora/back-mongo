import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Patch,
} from '@nestjs/common';

import { OperadoresService } from '../services/operadores.service';
import { CreateOperadorDto, UpdateOperadorDto } from '../dtos/operador.dto';
import { ApiTags } from '@nestjs/swagger';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';

@ApiTags('Operadores')
@Controller('operadores')
export class OperadoresController {
  constructor(private operadoresService: OperadoresService) {}

  @Get()
  findAll() {
    return this.operadoresService.findAll();
  }

  @Get(':id')
  get(@Param('id', MongoIdPipe) id: string) {
    return this.operadoresService.findOne(id);
  }

  @Get(':id/pedidos')
  getOrders(@Param('id', MongoIdPipe) id: string) {
    return this.operadoresService.getOrderByUser(id);
  }

  @Post()
  create(@Body() payload: CreateOperadorDto) {
    return this.operadoresService.create(payload);
  }

  @Patch(':id')
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateOperadorDto,
  ) {
    return this.operadoresService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', MongoIdPipe) id: string) {
    return this.operadoresService.remove(id);
  }
}
