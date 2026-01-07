import { IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateImagemLivroDto {
  
  @ApiPropertyOptional({ example: 'Capa do livro', description: 'Descrição da imagem' })
  @IsString()
  @IsOptional()
  descricao?: string;

  @ApiProperty({ example: 'https://exemplo.com/imagem.jpg', description: 'URL ou caminho do arquivo' })
  @IsString()
  arquivo: string;
}
