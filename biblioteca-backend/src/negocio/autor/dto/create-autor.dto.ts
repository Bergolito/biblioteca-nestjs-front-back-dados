import { IsString, IsOptional, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAutorDto {
  @ApiProperty({ example: 'Machado de Assis', description: 'Nome do autor', maxLength: 200 })
  @IsString()
  @MaxLength(200)
  nome: string;

  @ApiPropertyOptional({ example: 'Brasileiro', description: 'Nacionalidade do autor', maxLength: 100 })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  nacionalidade?: string;
}
