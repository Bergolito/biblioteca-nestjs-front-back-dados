import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CategoriaLivroService } from './categoria-livro.service';
import { CreateCategoriaLivroDto } from './dto/create-categoria-livro.dto';
import { UpdateCategoriaLivroDto } from './dto/update-categoria-livro.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@ApiTags('Categorias de Livros')
@Controller('categorias-livro')
export class CategoriaLivroController {
  constructor(private readonly categoriaLivroService: CategoriaLivroService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Criar nova relação categoria-livro' })
  @ApiResponse({ status: 201, description: 'Relação criada com sucesso' })
  create(@Body() createCategoriaLivroDto: CreateCategoriaLivroDto) {
    return this.categoriaLivroService.create(createCategoriaLivroDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as relações categoria-livro' })
  @ApiResponse({ status: 200, description: 'Lista retornada com sucesso' })
  findAll() {
    return this.categoriaLivroService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar relação por ID' })
  @ApiResponse({ status: 200, description: 'Relação encontrada' })
  findOne(@Param('id') id: string) {
    return this.categoriaLivroService.findOne(+id);
  }

  @Get('livro/:livro_id')
  @ApiOperation({ summary: 'Buscar categorias por livro' })
  @ApiResponse({ status: 200, description: 'Categorias do livro retornadas' })
  findByLivro(@Param('livro_id') livro_id: string) {
    return this.categoriaLivroService.findByLivro(+livro_id);
  }

  @Get('categoria/:categoria_id')
  @ApiOperation({ summary: 'Buscar livros por categoria' })
  @ApiResponse({ status: 200, description: 'Livros da categoria retornados' })
  findByCategoria(@Param('categoria_id') categoria_id: string) {
    return this.categoriaLivroService.findByCategoria(+categoria_id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Atualizar relação' })
  @ApiResponse({ status: 200, description: 'Relação atualizada com sucesso' })
  update(@Param('id') id: string, @Body() updateCategoriaLivroDto: UpdateCategoriaLivroDto) {
    return this.categoriaLivroService.update(+id, updateCategoriaLivroDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Deletar relação' })
  @ApiResponse({ status: 200, description: 'Relação deletada com sucesso' })
  remove(@Param('id') id: string) {
    return this.categoriaLivroService.remove(+id);
  }
}
