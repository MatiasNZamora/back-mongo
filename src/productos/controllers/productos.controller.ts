import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
  Res,
  Query,
  //ParseIntPipe,
} from '@nestjs/common';
import { Response } from 'express';

import { ProductosService } from '../services/productos.service';
import { ParseIntPipe } from '../../common/parse-int.pipe';
import {
  CreateProductDTO,
  FilterProductsDto,
  UpdateProductDTO,
} from '../dtos/productos.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { MongoIdPipe } from './../../common/mongo-id.pipe';

@ApiTags('Productos')
@Controller('productos')
export class ProductosController {
  constructor(private productsService: ProductosService) {}

  @Get()
  @ApiOperation({ summary: 'Registros de productos' })
  getProducts(@Query() params: FilterProductsDto) {
    return this.productsService.findAll(params);
  }

  @Get('filter') // Solucionamos cambiando la posicion
  getProductFilter() {
    return {
      message: `filtro bloqueado`,
    };
  }

  @Get(':productId')
  getOne(@Param('productId', MongoIdPipe) productId: string) {
    return this.productsService.findOne(productId);
  }

  @Post()
  create(@Body() payload: CreateProductDTO) {
    return this.productsService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateProductDTO,
  ) {
    return this.productsService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', MongoIdPipe) id: string) {
    return this.productsService.remove(id);
  }
}
