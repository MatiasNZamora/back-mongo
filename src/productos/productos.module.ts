import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { Producto, ProductoSchema } from './entities/producto.entity';

import { FabricantesController } from './controllers/fabricantes.controller';
import { ProductosController } from './controllers/productos.controller';
import { ProductosService } from './services/productos.service';
import { CategoriasService } from './services/categorias.service';
import { FabricantesService } from './services/fabricantes.service';
import { CategoriasController } from './controllers/categorias.controller';

import { Categoria, CategoriaSchama } from './entities/categoria.entity';
import { Fabricante, FabricanteSchema } from './entities/fabricante.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Producto.name, 
        schema: ProductoSchema,
      },
      {
        name: Categoria.name,
        schema: CategoriaSchama,
      },
      {
        name: Fabricante.name,
        schema: FabricanteSchema,
      }
    ]),
  ],
  controllers: [
    FabricantesController,
    ProductosController,
    CategoriasController,
  ],
  providers: [ProductosService, CategoriasService, FabricantesService],
  exports: [ProductosService],
})
export class ProductosModule {}
