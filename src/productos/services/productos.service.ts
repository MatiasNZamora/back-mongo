import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

import { Producto } from '../entities/producto.entity';
import {
  CreateProductDTO,
  FilterProductsDto,
  UpdateProductDTO,
} from '../dtos/productos.dto';

@Injectable()
export class ProductosService {
  constructor(
    @InjectModel(Producto.name) private productModel: Model<Producto>,
  ) {}

  findAll(params?: FilterProductsDto) {
    if (params) {
      const filters: FilterQuery<Producto> = {}; // Se crean los filtros
      const { limit, offset } = params;
      const { precioMinimo, precioMaximo } = params; // se reciben los parametros para el filtro
      if (precioMinimo && precioMaximo) {
        filters.precio = { $gte: precioMinimo, $lte: precioMaximo };
      }
      return this.productModel
        .find(filters)
        .populate('fabricante')
        .skip(offset)
        .limit(limit)
        .exec();
    }
    return this.productModel.find().populate('fabricante').exec();
  }

  async findOne(id: string) {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  create(data: CreateProductDTO) {
    const newProduct = new this.productModel(data);
    return newProduct.save();
  }

  update(id: string, changes: UpdateProductDTO) {
    const product = this.productModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true }) // { $set: changes } actualiza los datos pasados no el objeto entero
      .exec();
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  remove(id: string) {
    return this.productModel.findByIdAndDelete(id);
  }
}
