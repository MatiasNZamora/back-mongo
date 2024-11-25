import { Module } from '@nestjs/common';
import { OperadoresController } from './controllers/operadores.controller';
import { OperadoresService } from './services/operadores.service';
import { CompradoresService } from './services/compradores.service';
import { ProductosModule } from 'src/productos/productos.module';
import { CompradoresController } from './controllers/compradores.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Comprador, CompradorSchema } from './entities/comprador.entity';
import { Operador, OperadorSchema } from './entities/operador.entity';
import { Pedido, PedidoSchema } from './entities/pedido.entity';
import { PedidosService } from './services/pedido.service';
import { PedidosController } from './controllers/pedido.controller';

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
      {
        name: Pedido.name,
        schema: PedidoSchema,
      },
    ]),
  ],
  controllers: [OperadoresController, CompradoresController, PedidosController],
  providers: [OperadoresService, CompradoresService, PedidosService],
  exports: [OperadoresService],
})
export class OperadoresModule {}
