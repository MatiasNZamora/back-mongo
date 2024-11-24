import { Injectable } from "@nestjs/common";
import { Pedido } from "../entities/pedido.entity";
import { DetallePedido } from "../entities/detalle-pedido.entity";
import { Producto } from "src/productos/entities/producto.entity";
import { CreateDetallePedidoDto } from "../dtos/detalle-pedido.dto";

@Injectable()
export class DetallePedidoService {
    constructor(
        // @InjectRepository(Pedido) private pedidoRepo: Repository<Pedido>,
        // @InjectRepository(DetallePedido) private detalleRepo: Repository<DetallePedido>,
        // @InjectRepository(Producto) private productoRepo: Repository<Producto>,
    ){};

    async create(data: CreateDetallePedidoDto){
        
        // const pedido = await this.pedidoRepo.findOne(data.pedidoId);
        // const producto = await this.productoRepo.findOne(data.productoId);
        // const detalle = new DetallePedido();

        // detalle.pedido = pedido;
        // detalle.producto = producto;
        // detalle.cantidad = data.cantidad;
        // return this.detalleRepo.save(detalle);

    };

};