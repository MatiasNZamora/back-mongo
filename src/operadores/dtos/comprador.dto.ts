import { IsString, IsNotEmpty, IsArray } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateCompradorDto {
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly nombre: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly apellido: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly telefono: string;

  @IsArray()
  @IsNotEmpty()
  readonly direcciones: any;

}

export class UpdateCompradorDto extends PartialType(CreateCompradorDto) {}
