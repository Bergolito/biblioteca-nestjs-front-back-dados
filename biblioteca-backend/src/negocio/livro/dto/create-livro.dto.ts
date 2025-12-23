import { IsString, IsNumber, IsOptional, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateLivroDto {
  
  @ApiProperty({ example: 'Dom Casmurro', description: 'Título do livro', maxLength: 300 })
  @IsString()
  @MaxLength(300)
  titulo: string;

  @ApiPropertyOptional({ example: 'Memórias Póstumas', description: 'Subtítulo do livro', maxLength: 300 })
  @IsString()
  @IsOptional()
  @MaxLength(300)
  subtitulo?: string;

  @ApiPropertyOptional({ example: 1, description: 'Edição do livro' })
  @IsNumber()
  @IsOptional()
  edicao?: number;

  @ApiPropertyOptional({ example: 256, description: 'Número de páginas' })
  @IsNumber()
  @IsOptional()
  num_paginas?: number;

  @ApiPropertyOptional({ example: 1899, description: 'Ano de publicação' })
  @IsNumber()
  @IsOptional()
  ano?: number;

  @ApiPropertyOptional({ example: 1, description: 'ID do autor' })
  @IsNumber()
  @IsOptional()
  autor_id?: number;

  @ApiPropertyOptional({ example: 1, description: 'ID da editora' })
  @IsNumber()
  @IsOptional()
  editora_id?: number;

  @ApiPropertyOptional({ example: 1, description: 'ID do idioma' })
  @IsNumber()
  @IsOptional()
  idioma_id?: number;

  @ApiPropertyOptional({ example: 1, description: 'ID da imagem' })
  @IsNumber()
  @IsOptional()
  imagem_id?: number;
}
