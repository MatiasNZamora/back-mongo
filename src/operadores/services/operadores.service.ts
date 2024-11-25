import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Operador } from '../entities/operador.entity';
import { Pedido } from '../entities/pedido.entity';
import { CreateOperadorDto, UpdateOperadorDto } from '../dtos/operador.dto';

import { ProductosService } from './../../productos/services/productos.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class OperadoresService {
  constructor(
    @InjectModel( Operador.name ) private OperadorModel: Model<Operador>,
    private productsService: ProductosService,
    private configService: ConfigService, // Ya no utilizamos la variable global
  ) {}

  findAll() {
    return this.OperadorModel.find().exec();
  }

  async findOne(id: string) {
    const operador = await this.OperadorModel.findById(id).exec();
    if (!operador) {
      throw new NotFoundException(`Operador #${id} not found`);
    }
    return operador;
  } 

  create(data: CreateOperadorDto) {
    const newOperador = new this.OperadorModel(data);
    return newOperador.save();
  }

  update(id: string, changes: UpdateOperadorDto) {
    const operador = this.OperadorModel
      .findByIdAndUpdate( id, {$set: changes}, {new: true} )
      .exec()
    if (!operador) {
      throw new NotFoundException(`Comprador #${id} not found`);
    }
    return operador;
  }

  remove(id: string) {
    return this.OperadorModel.findByIdAndDelete(id);
  }

  async getOrderByUser(id: string) {
    const user = this.findOne(id);
    return {
      date: new Date(),
      user,
      products: await this.productsService.findAll(),
    };
  }
}
