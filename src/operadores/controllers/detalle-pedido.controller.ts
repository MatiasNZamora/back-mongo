import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { DetallePedidoService } from "../services/detalle-pedido.service";
import { CreateDetallePedidoDto } from "../dtos/detalle-pedido.dto";

@ApiTags('detalle-pedido')
@Controller('detalle-pedido')
export class DetallePedidoController { 
    constructor( private detalleService: DetallePedidoService ){}

    @Post()
    create( @Body() payload: CreateDetallePedidoDto){
        return this.detalleService.create(payload); 
    };

};