import { Module } from '@nestjs/common';
import { OperadoresController } from './controllers/operadores.controller';
import { OperadoresService } from './services/operadores.service';
import { CompradoresService } from './services/compradores.service';
import { ProductosModule } from 'src/productos/productos.module';
import { CompradoresController } from './controllers/compradores.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Comprador, CompradorSchema } from './entities/comprador.entity';
import { Operador, OperadorSchema } from './entities/operador.entity';

@Module({
  imports: [
    ProductosModule,
    MongooseModule.forFeature([
      {
        name: Comprador.name,
        schema: CompradorSchema,
      },
      {
        name: Operador.name,
        schema: OperadorSchema,
      },
    ]),
  ],
  controllers: [OperadoresController, CompradoresController],
  providers: [OperadoresService, CompradoresService],
})
export class OperadoresModule {}
