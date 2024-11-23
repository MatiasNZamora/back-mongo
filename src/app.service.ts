import { Injectable, Inject } from '@nestjs/common';
//import { ConfigService } from '@nestjs/config';
import { ConfigType } from '@nestjs/config';

import { Db } from 'mongodb';

import config from './config';

@Injectable()
export class AppService {
  constructor(
    //@Inject('APIKEY') private apiKey: string, // Inyectamos el valor global
    @Inject('TAREA_ASINC') private tarea: any[], // inyectamos la tarea asincrona
    //private config: ConfigService,
    @Inject('MONGO') private database: Db,
    @Inject(config.KEY) private configServ: ConfigType<typeof config>, // inyectamos el tipado
  ) {}
  getHello(): string {
    //return 'Hello World!';
    //const apiKey = this.config.get<string>('APIKEY'); // sin tipado
    //const dbname = this.config.get('DB_NAME');
    const apiKey = this.configServ.apiKey;
    const dbname = this.configServ.database.name; // tipado nombre de variables
    const dbport = this.configServ.database.port;
    return `La llave de la aplicacion es: ${apiKey} y el nombre y puerto de la DB: ${dbname}, ${dbport}`;
  }

  getUseFactory(): string {
    console.log(this.tarea); // utilizamos el useFactory
    return `Realizando una tarea asincrona de ejemplo`;
  }

  getTasks() {
    const tasksCollection = this.database.collection('tasks');
    return tasksCollection.find().toArray();
  }
}
