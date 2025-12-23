import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ImagemLivroService } from './imagem-livro.service';
import { CreateImagemLivroDto } from './dto/create-imagem-livro.dto';
import { UpdateImagemLivroDto } from './dto/update-imagem-livro.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@ApiTags('Imagens de Livros')
@Controller('imagens-livro')
export class ImagemLivroController {
  constructor(private readonly imagemLivroService: ImagemLivroService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Criar nova imagem de livro' })
  @ApiResponse({ status: 201, description: 'Imagem criada com sucesso' })
  create(@Body() createImagemLivroDto: CreateImagemLivroDto) {
    return this.imagemLivroService.create(createImagemLivroDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as imagens de livros' })
  @ApiResponse({ status: 200, description: 'Lista de imagens retornada com sucesso' })
  findAll() {
    return this.imagemLivroService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar imagem por ID' })
  @ApiResponse({ status: 200, description: 'Imagem encontrada' })
  findOne(@Param('id') id: string) {
    return this.imagemLivroService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Atualizar imagem' })
  @ApiResponse({ status: 200, description: 'Imagem atualizada com sucesso' })
  update(@Param('id') id: string, @Body() updateImagemLivroDto: UpdateImagemLivroDto) {
    return this.imagemLivroService.update(+id, updateImagemLivroDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Deletar imagem' })
  @ApiResponse({ status: 200, description: 'Imagem deletada com sucesso' })
  remove(@Param('id') id: string) {
    return this.imagemLivroService.remove(+id);
  }
}
