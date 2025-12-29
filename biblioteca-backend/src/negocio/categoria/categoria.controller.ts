import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CategoriaService } from './categoria.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@ApiTags('Categorias')
@Controller('categorias')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  //@UseGuards(JwtAuthGuard)
  @Post()
  //@ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Criar nova categoria' })
  @ApiResponse({ status: 201, description: 'Categoria criada com sucesso' })
  create(@Body() createCategoriaDto: CreateCategoriaDto) {
    return this.categoriaService.create(createCategoriaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as categorias' })
  @ApiResponse({ status: 200, description: 'Lista de categorias retornada com sucesso' })
  findAll(@Query() query: any) {
    if (Object.keys(query).length > 0) {
      return this.categoriaService.findAllByFilter(query);
    }
    return this.categoriaService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar categoria por ID' })
  @ApiResponse({ status: 200, description: 'Categoria encontrada' })
  findOne(@Param('id') id: string) {
    return this.categoriaService.findOne(+id);
  }

  //@UseGuards(JwtAuthGuard)
  @Patch(':id')
  //@ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Atualizar categoria' })
  @ApiResponse({ status: 200, description: 'Categoria atualizada com sucesso' })
  update(@Param('id') id: string, @Body() updateCategoriaDto: UpdateCategoriaDto) {
    return this.categoriaService.update(+id, updateCategoriaDto);
  }

  //@UseGuards(JwtAuthGuard)
  @Delete(':id')
  //@ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Deletar categoria' })
  @ApiResponse({ status: 200, description: 'Categoria deletada com sucesso' })
  remove(@Param('id') id: string) {
    return this.categoriaService.remove(+id);
  }
}
