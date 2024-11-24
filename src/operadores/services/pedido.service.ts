import { Injectable, NotFoundException } from '@nestjs/common';



@Injectable()
export class PedidosService {

    constructor(
        
    ){}

    findAll(){
        
    };

    async findOne(id: number){
        const pedido = await this.pedidoRepo.findOne(id);
        if(!pedido) throw new NotFoundException(`Pedido con id: ${id} not found.`);
        return pedido;
    };

    async create( data: CreatePedidoDto ){
        const pedido = new Pedido();
        if(data.compradorId){
            const customer = await this.compadorRepo.findOne(data.compradorId);
            pedido.comprador = customer;
        };
        return this.pedidoRepo.save(pedido);
    };

    async update(id: number, payload: UpdatePedidoDto){
        const pedido = await this.pedidoRepo.findOne(id);
        if(payload.compradorId){
            const customer = await this.compadorRepo.findOne(payload.compradorId);
            pedido.comprador = customer;
        }
        return this.pedidoRepo.save(pedido);
    };

    remove(id:number){
        return this.pedidoRepo.delete(id);
    };

};
