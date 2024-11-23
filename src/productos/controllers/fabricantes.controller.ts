import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Fabricantes')
@Controller('fabricantes')
export class FabricantesController {
  @Get(':nombre/productos/:productId')
  getCategory(
    @Param('productId') productId: string,
    @Param('nombre') nombre: string,
  ) {
    return {
      message: `El ID del producto es ${productId} del fabricante ${nombre}`,
    };
  }

  @Get()
  getProducts(
    @Query('id') id = 1,
    @Query('nombre') nombre = 'ACME',
    @Query('origen') origen: string,
  ) {
    return {
      message: `El fabricante con ID: ${id}, y nombre => ${nombre}. Su procedencia es ${origen}`,
    };
  }
}
