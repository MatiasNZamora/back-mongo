import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsPositive, IsString } from "class-validator";

export class CreatePedidoDto {

    @ApiProperty({description: 'Id asociado del Comprador'})
    @IsString()
    @IsNotEmpty()
    readonly comprador: string;

    @ApiProperty({description: 'Array de productos asociados'})
    @IsArray()
    @IsNotEmpty()
    readonly productos: string[];

};

export class UpdatePedidoDto extends PartialType( OmitType ( CreatePedidoDto, ['productos'] )) {};

export class AddProductsToOrderDto {
    
    @IsArray()
    @IsNotEmpty()
    readonly productsIds: string[];

};