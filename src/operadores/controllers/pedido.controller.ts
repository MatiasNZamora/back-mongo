import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { MongoIdPipe } from "src/common/mongo-id.pipe";
import { CreateDetallePedidoDto, UpdateDetallePedidoDto } from "../dtos/detalle-pedido.dto";
import { PedidosService } from "../services/pedido.service";

@ApiTags('Pedidos')
@Controller('pedidos')
export class PedidosController {
    constructor( private etallePedidoService: PedidosService){};

    @Get()
    findAll(){
        return this.PedidosService.findAll();
    };

    @Get(':id')
    get(@Param('id', MongoIdPipe) id:string ){
        return this.PedidosService.findOne(id);
    };

    @Post()
    create( @Body() payload: CreateDetallePedidoDto ){
        return this.PedidosService.create(payload);
    };

    @Put(':id')
    update(
        @Param('id', MongoIdPipe) id: string,
        @Body() payload: UpdateDetallePedidoDto,
    ){
        return this.PedidosService.update(id, payload);
    };

    @Delete(':id')
    remove( @Param('id', MongoIdPipe) id: string ){
        return this.PedidosService.remove(id);
    }
};
