import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateCompradorDto, UpdateCompradorDto } from '../dtos/comprador.dto';
import { Comprador } from '../entities/comprador.entity';

@Injectable()
export class CompradoresService {

  constructor(
    @InjectModel(Comprador.name) private compradorModel: Model<Comprador>,
  ){}

  findAll() {
    return this.compradorModel.find().exec();
  }

  async findOne( id: string ) {
    const customer = await this.compradorModel.findById(id).exec();
    if (!customer) {
      throw new NotFoundException(`Comprador #${id} not found`);
    }
    return customer;
  }

  create(data: CreateCompradorDto) {
    const newModel = new this.compradorModel(data);
    return newModel.save();
  }

  update(id: string, changes: UpdateCompradorDto) {
    const customer = this.compradorModel
      .findByIdAndUpdate( id, {$set: changes}, {new: true} )
      .exec()
    if (!customer) {
      throw new NotFoundException(`Comprador #${id} not found`);
    }
    return customer;
  }

  remove(id: string) {
    return this.compradorModel.findByIdAndDelete(id);
  } 

}
