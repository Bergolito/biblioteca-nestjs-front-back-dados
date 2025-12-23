import { IsString, IsOptional, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCategoriaDto {
  
  @ApiProperty({ example: 'Ficção', description: 'Nome da categoria', maxLength: 100 })
  @IsString()
  @MaxLength(100)
  nome: string;

  @ApiPropertyOptional({ example: 'Livros de ficção literrária', description: 'Descrição da categoria' })
  @IsString()
  @IsOptional()
  descricao?: string;
}
