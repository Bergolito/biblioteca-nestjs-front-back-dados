import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'usuario@email.com', description: 'Email do usuário' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'senha123', description: 'Senha do usuário', minLength: 6 })
  @IsString()
  @MinLength(6)
  senha: string;

  @ApiProperty({ example: 'João Silva', description: 'Nome do usuário', maxLength: 200 })
  @IsString()
  @MaxLength(200)
  nome: string;
}
