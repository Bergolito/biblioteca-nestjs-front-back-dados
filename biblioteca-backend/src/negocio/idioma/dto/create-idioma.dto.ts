import { IsString, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateIdiomaDto {

  @ApiProperty({ example: 'pt-BR', description: 'Código do idioma', maxLength: 20 })
  @IsString()
  @MaxLength(20)
  codigo: string;

  @ApiPropertyOptional({ example: 'Português Brasileiro', description: 'Descrição do idioma', maxLength: 100 })
  @IsString()
  @MaxLength(100)
  descricao?: string;

}
