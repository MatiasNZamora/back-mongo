import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FabricantesService } from '../services/fabricantes.service';
import { CreateFabricanteDto, UpdateFabricanteDto } from '../dtos/fabricante.dto';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';

@ApiTags('Fabricantes')
@Controller('fabricantes')
export class FabricantesController {
  constructor( private fabricanteService:FabricantesService){}
  
  @Get()
  @ApiOperation({ summary: 'Obtener lista de Fabricantes.' })
  findAll(){
      return this.fabricanteService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un Fabricante por su ID.' })
  findOne( 
    @Param('id', MongoIdPipe) 
    id:string 
  ){
    return this.fabricanteService.findOne(id);
  };

  @Post()
  @ApiOperation({ summary: 'Recibe la data y crea el nuevo Fabricante.' })
  create( @Body() payload :CreateFabricanteDto 
  ){
    return this.fabricanteService.create( payload );
  };

  @Patch(':id')
  @ApiOperation({ summary: 'Actualiza la informacion de un Fabricante.' })
  updateOperador(
    @Param('id', MongoIdPipe ) 
    id:string, 
    @Body() updateFields:UpdateFabricanteDto 
  ){
    return this.fabricanteService.update(id, updateFields);
  };

  @Delete(':id')
  @ApiOperation({ summary: 'Elmina un Fabricante.' })
  deleteOperador(
    @Param('id', MongoIdPipe) 
    id:string
  ){
    this.fabricanteService.remove(id);
  }

  // @ApiOperation({ summary: 'Obtener un pedidos por id de orden.' })
  // @Get(':id/pedidos')
  // getOreder( @Param('id', MongoIdPipe ) id:string ){
  //     return this.fabricanteService.getOrders(id);
  // };
  
  
  // @Get(':nombre/productos/:productId')
  // getCategory(
  //   @Param('productId') productId: string,
  //   @Param('nombre') nombre: string,
  // ) {
  //   return {
  //     message: `El ID del producto es ${productId} del fabricante ${nombre}`,
  //   };
  // }

  // @Get()
  // getProducts(
  //   @Query('id') id = 1,
  //   @Query('nombre') nombre = 'ACME',
  //   @Query('origen') origen: string,
  // ) {
  //   return {
  //     message: `El fabricante con ID: ${id}, y nombre => ${nombre}. Su procedencia es ${origen}`,
  //   };
  // }
}
