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

  // private fabricantes: Fabricante[] = [
  //   {
  //     id: 1,
  //     nombre: 'Fabricante 1',
  //     direccion: '',
  //     email: '',
  //     imagen: 'https://i.imgur.com/U4iGx1j.jpeg',
  //   },
  // ];

  findAll() {
    return this.fabricanteModel.find().exec();
  }

  findOne(id: string) {
    const product = this.fabricanteModel.find((item) => item.id === id);
    if (!product) {
      throw new NotFoundException(`Fabricante #${id} not found`);
    }
    return product;
  }

  create(data: CreateFabricanteDto) {

  }

  update(id: string, changes: UpdateFabricanteDto) {

  }

  remove(id: string) {
  
  }
}
