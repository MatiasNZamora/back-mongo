import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    //return 'Hola gente, bienvenidos a Nest.JS!!';
    return this.appService.getHello();
  }

  @Get('usefactory')
  getUseFactory(): string {
    return this.appService.getUseFactory();
  }

  @Get('operativo')
  getEstoyFuncionando(): string {
    return 'Me siento OK!!';
  }

  @Get('/estoyok/') // En Express daría problemas...
  getEstoyOK(): string {
    return 'Sigo OK con /';
  }

  @Get('/tasks/')
  getTasks() {
    return this.appService.getTasks();
  }
}
