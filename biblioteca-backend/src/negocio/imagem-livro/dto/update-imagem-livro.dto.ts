import { PartialType } from '@nestjs/mapped-types';
import { CreateImagemLivroDto } from './create-imagem-livro.dto';

export class UpdateImagemLivroDto extends PartialType(CreateImagemLivroDto) {}
