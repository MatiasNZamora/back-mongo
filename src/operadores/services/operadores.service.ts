import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Operador } from '../entities/operador.entity';
import { Pedido } from '../entities/pedido.entity';
import { CreateOperadorDto, UpdateOperadorDto } from '../dtos/operador.dto';

import { ProductosService } from './../../productos/services/productos.service';

@Injectable()
export class OperadoresService {
  constructor(
    private productsService: ProductosService,
    //@Inject('APIKEY') private apiKey: string, // GLobalModule DATABASE - podemos utilizar el servicio sin necesidad de importarlo
    private configService: ConfigService, // Ya no utilizamos la variable global
  ) {}

  private counterId = 1;
  private operadores: Operador[] = [
    {
      id: 1,
      email: 'operador@correo.com',
      password: '123456',
      role: 'admin',
    },
  ];

  findAll() {
    const apiKey = this.configService.get('APIKEY');
    const dbname = this.configService.get('DB_NAME');
    console.log(apiKey, dbname);
    return this.operadores;
  }

  findOne(id: number) {
    const user = this.operadores.find((item) => item.id === id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  create(data: CreateOperadorDto) {
    this.counterId = this.counterId + 1;
    const newUser = {
      id: this.counterId,
      ...data,
    };
    this.operadores.push(newUser);
    return newUser;
  }

  update(id: number, changes: UpdateOperadorDto) {
    const user = this.findOne(id);
    const index = this.operadores.findIndex((item) => item.id === id);
    this.operadores[index] = {
      ...user,
      ...changes,
    };
    return this.operadores[index];
  }

  remove(id: number) {
    const index = this.operadores.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`User #${id} not found`);
    }
    this.operadores.splice(index, 1);
    return true;
  }

  async getOrderByUser(id: number) {
    const user = this.findOne(id);
    return {
      date: new Date(),
      user,
      products: await this.productsService.findAll(),
    };
  }
}
