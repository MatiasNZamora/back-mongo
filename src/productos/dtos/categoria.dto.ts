import { IsString, IsNotEmpty, IsUrl, IsOptional } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateCategoriaDto {
  
  @ApiProperty({description: 'Nombre de la - Categoria'})
  @IsString()
  @IsNotEmpty()
  readonly nombre: string;

  @ApiProperty({description: 'Imagen de la - Categoria'})
  @IsNotEmpty()
  @IsUrl()
  @IsOptional()
  readonly imagen?: string;

}

export class UpdateCategoriaDto extends PartialType(CreateCategoriaDto) {}
