import { Injectable, NotFoundException } from '@nestjs/common';

import { Categoria } from '../entities/categoria.entity';
import { CreateCategoriaDto, UpdateCategoriaDto } from '../dtos/categoria.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CategoriasService {

  constructor(
    @InjectModel( Categoria.name) private categoriaModel:Model<Categoria>
  ){}

  findAll() {
    return this.categoriaModel.find().exec();
  }

  findOne(id: string) {
    const category = this.categoriaModel.find((item) => item.id === id);
    if (!category) {
      throw new NotFoundException(`Categoria #${id} not found`);
    }
    return category;
  }

  create(data: CreateCategoriaDto) {
    const newCategory = new this.categoriaModel(data)
    return newCategory.save();
  }

  update(id: string, changes: UpdateCategoriaDto) {
    
    const category = this.categoriaModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true }) // { $set: changes } actualiza los datos pasados no el objeto entero
      .exec();

      if (!category) {
        throw new NotFoundException(`Product #${id} not found`);
      }

    return category;

  }

  remove(id: string) {
    this.categoriaModel.findByIdAndDelete(id);
  }

}
