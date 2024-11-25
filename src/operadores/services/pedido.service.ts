import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Pedido } from '../entities/pedido.entity';
import { Comprador } from '../entities/comprador.entity';

import { CreatePedidoDto, UpdatePedidoDto } from '../dtos/pedido.dto';



@Injectable()
export class PedidosService {

    constructor(
        @InjectModel(Pedido.name) private pedidoModel:Model<Pedido>,
    ){}

    findAll(){
        return this.pedidoModel
            .find()
            .populate('comprador')
            .populate({
                path: 'productos',
                model: 'Producto',
            })
            .exec()
    };

    async findOne(id: string){
        const pedido = await this.pedidoModel.findById(id).exec();
        if(!pedido) throw new NotFoundException(`Pedido con id: ${id} not found.`);
        return pedido;
    };

    async create( data: CreatePedidoDto ){
        // const pedido = new Pedido();
        // if(data.comprador){
        //     const customer = await this.pedidoModel.findById(data.comprador);
        //     pedido.comprador = customer;
        // };
        // return this.pedidoModel.save(pedido).exec();

        const newPedido = new this.pedidoModel(data);
        return newPedido.save();

    };

    async update( id: string, changes: UpdatePedidoDto ){
    //     const pedido = await this.pedidoRepo.findOne(id);
    //     if(payload.compradorId){
    //         const customer = await this.compadorRepo.findOne(payload.compradorId);
    //         pedido.comprador = customer;
    //     }
    //     return this.pedidoRepo.save(pedido);

        const pedido = this.pedidoModel
            .findByIdAndUpdate( id, {$set: changes}, {new: true} )
            .exec()
        if (!pedido) { throw new NotFoundException(`Comprador #${id} not found`); }
        return pedido;

    };

    remove( id:string ){
        return this.pedidoModel.findByIdAndDelete(id);
    };

    async removeProducto( id: string, productId: string ){
        const pedido = await this.pedidoModel.findById(id);
        pedido.productos.pull(productId);
        return pedido.save();
    };

    async addProduct( id:string, productsIds:string[] ){
        const pedido = await this.pedidoModel.findById(id);
        productsIds.forEach( (pId) => pedido.productos.push(pId) );
        return pedido.save();
    };

};