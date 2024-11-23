import { IsString, IsNotEmpty, IsUrl, IsOptional } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateCategoriaDto {
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly nombre: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUrl()
  @IsOptional()
  readonly imagen?: string;

}

export class UpdateCategoriaDto extends PartialType(CreateCategoriaDto) {}
