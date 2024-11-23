import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Fabricante } from '../entities/fabricante.entity';
import { CreateFabricanteDto, UpdateFabricanteDto } from '../dtos/fabricante.dto';

@Injectable()
export class FabricantesService {

  constructor(
    @InjectModel(Fabricante.name) private fabricanteModel:Model<Fabricante>
  ){}

  findAll() {
    return this.fabricanteModel.find().exec();
  }

  async findOne(id: string) {
    const fabricante = this.fabricanteModel.findById(id).exec();
    if (!fabricante) {
      throw new NotFoundException(`Fabricante #${id} not found`);
    }
    return fabricante;
  }

  create(data: CreateFabricanteDto) {
    const newFabricante = new this.fabricanteModel(data);
    return newFabricante.save();
  }

  update(id: string, changes: UpdateFabricanteDto) {
    const fabricante = this.fabricanteModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true }) // { $set: changes } actualiza los datos pasados no el objeto entero
      .exec();
    if (!fabricante) {
      throw new NotFoundException(`fabricante #${id} not found`);
    }
    return fabricante;
  }

  remove(id: string) {
    return this.fabricanteModel.findByIdAndDelete(id);
  }
}
