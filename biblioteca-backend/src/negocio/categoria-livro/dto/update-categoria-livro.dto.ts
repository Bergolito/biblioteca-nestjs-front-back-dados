import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoriaLivroDto } from './create-categoria-livro.dto';

export class UpdateCategoriaLivroDto extends PartialType(CreateCategoriaLivroDto) {}
