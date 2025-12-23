import { IsString, IsOptional, IsEmail, MaxLength, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUsuarioDto {
  @ApiProperty({ example: 'usuario@email.com', description: 'Email do usuário', maxLength: 200 })
  @IsEmail()
  @MaxLength(200)
  email: string;

  @ApiProperty({ example: 'João Silva', description: 'Nome do usuário', maxLength: 200 })
  @IsString()
  @MaxLength(200)
  nome: string;

  @ApiPropertyOptional({ example: 'Rua das Flores, 123', description: 'Endereço do usuário' })
  @IsString()
  @IsOptional()
  endereco?: string;

  @ApiPropertyOptional({ example: '1990-01-01', description: 'Data de nascimento (ISO 8601)' })
  @IsDateString()
  @IsOptional()
  data_nasc?: string;

  @ApiPropertyOptional({ example: 'M', description: 'Sexo (M/F)', maxLength: 1 })
  @IsString()
  @IsOptional()
  @MaxLength(1)
  sexo?: string;

  @ApiPropertyOptional({ example: '11999999999', description: 'Telefone do usuário', maxLength: 20 })
  @IsString()
  @IsOptional()
  @MaxLength(20)
  telefone?: string;
}
