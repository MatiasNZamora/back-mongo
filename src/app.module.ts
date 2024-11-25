import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // Importamos la dep para manejar las variables de entorno

import { HttpModule, HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

import { MongoClient } from 'mongodb'; // Cliente de mongodb

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { OperadoresModule } from './operadores/operadores.module';
import { ProductosModule } from './productos/productos.module';
import { DatabaseModule } from './database/database.module';

//const APIKEY = 'DEV-456';
//const APIKEYPROD = 'PROD-12345';

import { enviroments } from './enviroments';
import { AuthModule } from './auth/auth.module';
import config from './config';

import * as Joi from 'joi';



@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config], // leemos como archivo de tipado
      isGlobal: true,
      validationSchema: Joi.object({
        APIKEY: Joi.number().required(),
        DB_NAME: Joi.string().required(),
        DB_PORT: Joi.number().required(),
      }),
    }),
    HttpModule,
    OperadoresModule,
    ProductosModule,
    DatabaseModule,
    AuthModule,
  ],
  controllers: [AppController],
  //providers: [AppService], // agregamos una variable y desglosamos para tener dos atributos en providers
  providers: [
    AppService,
    /*     {
      provide: 'APIKEY',
      useValue: process.env.NODE_ENV === 'prod' ? APIKEYPROD : APIKEY,
    }, */
    {
      provide: 'TAREA_ASINC',
      useFactory: async (http: HttpService) => {
        const req = http.get('https://jsonplaceholder.typicode.com/posts');
        const tarea = await lastValueFrom(req);
        return tarea.data;
      },
      inject: [HttpService],
    },
  ],
})
export class AppModule {}
