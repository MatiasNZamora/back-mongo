import { Controller, Get, UseGuards } from '@nestjs/common';

import { AppService } from './app.service';

import { ApikeyGuard } from './auth/guards/apikey.guard';
import { Public } from './auth/decorators/public.decorator';

@UseGuards(ApikeyGuard)
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

  @Public()
  @Get('operativo')
  getEstoyFuncionando(): string {
    return 'Metodo para probar guardian';
  }

  @Get('/estoyok/') // En Express daría problemas...
  getEstoyOK(): string {
    return 'Sigo OK con /';
  }

  @Get('/tasks/')
  getTasks() {
    return this.appService.getTasks();
  }

  @Get('nuevo')
  newEndPoint(){
    return 'Auth';
  }
}
