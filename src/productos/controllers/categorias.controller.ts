import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';

import { CategoriasService } from '../services/categorias.service';
import {
  CreateCategoriaDto,
  UpdateCategoriaDto,
} from './../dtos/categoria.dto';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';

@ApiTags('Categorias')
@Controller('categorias')
export class CategoriasController {
  constructor(private categoriesService: CategoriasService) {}

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  get(@Param('id', MongoIdPipe) id: string) {
    return this.categoriesService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateCategoriaDto) {
    return this.categoriesService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateCategoriaDto,
  ) {
    return this.categoriesService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', MongoIdPipe) id: string) {
    return this.categoriesService.remove(id);
  }
}
