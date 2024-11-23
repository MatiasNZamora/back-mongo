import { IsString, IsUrl, IsNotEmpty, IsEmail, IsOptional } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateFabricanteDto {
  
  @ApiProperty({description: 'Direccion del - Fabricante'})
  @IsString()
  @IsNotEmpty()
  readonly nombre: string;

  @ApiProperty({description: 'Direcciones correspondiente a - Fabricante'})
  @IsString()
  @IsNotEmpty()
  readonly direccion: string;

  @ApiProperty({description: 'Email correspondiente a - Fabricante'})
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty( {description: 'Imagen correspondiente a - Fabricante'} )
  @IsUrl()
  @IsNotEmpty()
  @IsOptional()
  readonly imagen?: string;
  
}

export class UpdateFabricanteDto extends PartialType(CreateFabricanteDto) {}
