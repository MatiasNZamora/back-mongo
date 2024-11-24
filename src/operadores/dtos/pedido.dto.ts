import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsPositive } from "class-validator";

export class CreatePedidoDto {

    @ApiProperty({description: 'Id asociado del Comprador'})
    @IsPositive()
    @IsNotEmpty()
    readonly compradorId: number;

};

export class UpdatePedidoDto extends PartialType(CreatePedidoDto) {}