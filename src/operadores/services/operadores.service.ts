import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import * as bcrypt from 'bcrypt';

import { Operador } from '../entities/operador.entity';
import { CreateOperadorDto, UpdateOperadorDto } from '../dtos/operador.dto';

import { ProductosService } from './../../productos/services/productos.service';


@Injectable()
export class OperadoresService {
  constructor(
    @InjectModel( Operador.name ) private OperadorModel: Model<Operador>,
    private productsService: ProductosService,
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

  findByEmail( email: string ){
    return this.OperadorModel.findOne({email}).exec();
  }

  async create(data: CreateOperadorDto) {
    const newOperador = new this.OperadorModel(data);
    const hashPassword = await bcrypt.hash(newOperador.password, 10);
    newOperador.password = hashPassword;
    const operador = await newOperador.save();
    const { password, ...rta } = operador.toJSON();
    
    return rta; 
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
    const comprador = this.findOne(id);
    return {
      date: new Date(),
      comprador,
      products: await this.productsService.findAll(),
    };
  }
}
