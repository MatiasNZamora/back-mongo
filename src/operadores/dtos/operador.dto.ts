import { IsString, IsNotEmpty, IsEmail, Length } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateOperadorDto {
  @ApiProperty({description: 'Email asociado al operador / usuario'})
  @IsString()
  @IsEmail()
  readonly email: string;

  @ApiProperty({description: 'Password asociado al operador / usuario'})
  @IsString()
  @IsNotEmpty()
  @Length(4)
  readonly password: string;

  @ApiProperty({description: 'Rol asociado al operador / usuario'})
  @IsNotEmpty()
  readonly role: string;
}

export class UpdateOperadorDto extends PartialType(CreateOperadorDto) {}
