import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsUrl,
  IsPositive,
  IsOptional,
  Min,
  ValidateIf,
  ValidateNested,
  IsMongoId,
} from 'class-validator';
import { PartialType, OmitType, ApiProperty } from '@nestjs/swagger';
import { CreateCategoriaDto } from './categoria.dto';


export class CreateProductDTO {
  @ApiProperty({description: 'Nombre del producto' })
  @IsString()
  @IsNotEmpty()
  readonly nombre: string; //solo lectura

  @ApiProperty({description: 'Detalles del producto - Positiva' })
  @IsString()
  @IsNotEmpty()
  readonly descripcion: string;

  @ApiProperty({description: 'Precio producto'})
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly precio: number;

  @ApiProperty({description: 'Cantidades disponibles producto'})
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly stock: number;

  @ApiProperty({description: 'Origen del producto'})
  @IsString()
  @IsNotEmpty()
  readonly origen: string;

  @ApiProperty({description: 'Imagen detallada del producto'})
  @IsNotEmpty()
  @IsUrl()
  @IsString()
  readonly image?: string;

  @ApiProperty({description: 'Imagen detallada del producto'})
  @IsNotEmpty()
  @ValidateNested() // valida el dto envevido.
  readonly categoria: CreateCategoriaDto;

  @ApiProperty({description: 'ID - fabricante del producto'})
  @IsNotEmpty()
  @IsMongoId()
  readonly fabricante: string;
  
}

export class UpdateProductDTO extends PartialType( OmitType( CreateProductDTO, ['nombre'] ) ){}

export class FilterProductsDto {
  @ApiProperty({description: 'Filtro numerico que delimita el limite de items'})
  @IsOptional()
  @IsPositive()
  limit: number;

  @ApiProperty({description: 'Filtro numerico que delimita el inicio de los items'})
  @IsOptional()
  @Min(0)
  offset: number;

  @ApiProperty({description: 'Filtro numerico que delimita el precio minimo'})
  @IsOptional()
  @Min(0)
  precioMinimo: number;

  @ApiProperty({description: 'Filtro numerico que delimita el precio maximo'})
  @ValidateIf((params) => params.precioMinimo)
  @IsPositive()
  precioMaximo: number;
}
