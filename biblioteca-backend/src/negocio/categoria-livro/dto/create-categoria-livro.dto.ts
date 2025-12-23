import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoriaLivroDto {
    
  @ApiProperty({ example: 1, description: 'ID do livro' })
  @IsNumber()
  livro_id: number;

  @ApiProperty({ example: 1, description: 'ID da categoria' })
  @IsNumber()
  categoria_id: number;
}
