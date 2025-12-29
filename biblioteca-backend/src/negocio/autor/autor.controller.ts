import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AutorService } from './autor.service';
import { CreateAutorDto } from './dto/create-autor.dto';
import { UpdateAutorDto } from './dto/update-autor.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@ApiTags('Autores')
@Controller('autores')
export class AutorController {
  constructor(private readonly autorService: AutorService) {}

  //@UseGuards(JwtAuthGuard)
  @Post()
  //@ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Criar novo autor' })
  @ApiResponse({ status: 201, description: 'Autor criado com sucesso' })
  create(@Body() createAutorDto: CreateAutorDto) {
    return this.autorService.create(createAutorDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os autores' })
  @ApiResponse({ status: 200, description: 'Lista de autores retornada com sucesso' })
  findAll(@Query() query: any) {
    if (Object.keys(query).length > 0) {
      return this.autorService.findAllByFilter(query);
    }
    return this.autorService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar autor por ID' })
  @ApiResponse({ status: 200, description: 'Autor encontrado' })
  @ApiResponse({ status: 404, description: 'Autor não encontrado' })
  findOne(@Param('id') id: string) {
    return this.autorService.findOne(+id);
  }

  //@UseGuards(JwtAuthGuard)
  @Patch(':id')
  //@ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Atualizar autor' })
  @ApiResponse({ status: 200, description: 'Autor atualizado com sucesso' })
  update(@Param('id') id: string, @Body() updateAutorDto: UpdateAutorDto) {
    return this.autorService.update(+id, updateAutorDto);
  }

  //@UseGuards(JwtAuthGuard)
  @Delete(':id')
  //@ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Deletar autor' })
  @ApiResponse({ status: 200, description: 'Autor deletado com sucesso' })
  remove(@Param('id') id: string) {
    return this.autorService.remove(+id);
  }
}
