import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { MongoIdPipe } from "src/common/mongo-id.pipe";
import { PedidosService } from "../services/pedido.service";
import { AddProductsToOrderDto, CreatePedidoDto, UpdatePedidoDto } from "../dtos/pedido.dto";

@ApiTags('Pedidos')
@Controller('pedidos')
export class PedidosController {
    constructor( private pedidoService: PedidosService){};

    @Get()
    findAll(){
        return this.pedidoService.findAll();
    };

    @Get(':id')
    get(@Param('id', MongoIdPipe) id:string ){
        return this.pedidoService.findOne(id);
    };

    @Post()
    create( @Body() payload: CreatePedidoDto ){
        return this.pedidoService.create( payload );
    };

    @Put(':id')
    update(
        @Param('id', MongoIdPipe) id: string,
        @Body() payload: UpdatePedidoDto,
    ){
        return this.pedidoService.update(id, payload);
    };

    @Delete(':id')
    remove( @Param('id', MongoIdPipe) id: string ){
        return this.pedidoService.remove(id);
    }

    @Put() // agregamos un producto al arreglo.
    addProducts( @Param('id') id:string, @Body() payload: AddProductsToOrderDto ){
        return this.pedidoService.addProduct( id, payload.productsIds );
    };

    @Delete(':id/producto/:productId') // Borra el producto del arreglo.
    removeProduct( @Param('id') id: string, @Param('productId') productId: string, ){
        return this.pedidoService.removeProducto(id, productId);
    };


};
