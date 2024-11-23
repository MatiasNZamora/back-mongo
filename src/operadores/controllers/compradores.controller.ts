import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';

import { CompradoresService } from '../services/compradores.service';
import { CreateCompradorDto, UpdateCompradorDto } from '../dtos/comprador.dto';
import { ApiTags } from '@nestjs/swagger';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';

@ApiTags('Compradores')
@Controller('compradores')
export class CompradoresController {
  constructor(private customersService: CompradoresService) {}

  @Get()
  findAll() {
    return this.customersService.findAll();
  }

  @Get(':id')
  get(@Param('id', MongoIdPipe) id: string) {
    return this.customersService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateCompradorDto) {
    return this.customersService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', MongoIdPipe ) id: string,
    @Body() payload: UpdateCompradorDto,
  ) {
    return this.customersService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', MongoIdPipe) id: string) {
    return this.customersService.remove(id);
  }
}
