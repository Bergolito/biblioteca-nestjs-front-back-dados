import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { LivroService } from './livro.service';
import { CreateLivroDto } from './dto/create-livro.dto';
import { UpdateLivroDto } from './dto/update-livro.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@ApiTags('Livros')
@Controller('livros')
export class LivroController {
  constructor(private readonly livroService: LivroService) {}

  //@UseGuards(JwtAuthGuard)
  @Post()
  //@ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Criar novo livro' })
  @ApiResponse({ status: 201, description: 'Livro criado com sucesso' })
  create(@Body() createLivroDto: CreateLivroDto) {
    return this.livroService.create(createLivroDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os livros' })
  @ApiResponse({ status: 200, description: 'Lista de livros retornada com sucesso' })
  findAll() {
    return this.livroService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar livro por ID' })
  @ApiResponse({ status: 200, description: 'Livro encontrado' })
  findOne(@Param('id') id: string) {
    return this.livroService.findOne(+id);
  }

  //@UseGuards(JwtAuthGuard)
  @Patch(':id')
  //@ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Atualizar livro' })
  @ApiResponse({ status: 200, description: 'Livro atualizado com sucesso' })
  update(@Param('id') id: string, @Body() updateLivroDto: UpdateLivroDto) {
    return this.livroService.update(+id, updateLivroDto);
  }

  //@UseGuards(JwtAuthGuard)
  @Delete(':id')
  //@ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Deletar livro' })
  @ApiResponse({ status: 200, description: 'Livro deletado com sucesso' })
  remove(@Param('id') id: string) {
    return this.livroService.remove(+id);
  }
}
