import { IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEditoraDto {
  @ApiProperty({ example: 'Companhia das Letras', description: 'Nome da editora', maxLength: 200 })
  @IsString()
  @MaxLength(200)
  nome: string;
}
