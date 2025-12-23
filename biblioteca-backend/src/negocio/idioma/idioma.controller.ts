import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { IdiomaService } from './idioma.service';
import { CreateIdiomaDto } from './dto/create-idioma.dto';
import { UpdateIdiomaDto } from './dto/update-idioma.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@ApiTags('Idiomas')
@Controller('idiomas')
export class IdiomaController {
  constructor(private readonly idiomaService: IdiomaService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Criar novo idioma' })
  @ApiResponse({ status: 201, description: 'Idioma criado com sucesso' })
  create(@Body() createIdiomaDto: CreateIdiomaDto) {
    return this.idiomaService.create(createIdiomaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os idiomas' })
  @ApiResponse({ status: 200, description: 'Lista de idiomas retornada com sucesso' })
  findAll() {
    return this.idiomaService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar idioma por ID' })
  @ApiResponse({ status: 200, description: 'Idioma encontrado' })
  findOne(@Param('id') id: string) {
    return this.idiomaService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Atualizar idioma' })
  @ApiResponse({ status: 200, description: 'Idioma atualizado com sucesso' })
  update(@Param('id') id: string, @Body() updateIdiomaDto: UpdateIdiomaDto) {
    return this.idiomaService.update(+id, updateIdiomaDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Deletar idioma' })
  @ApiResponse({ status: 200, description: 'Idioma deletado com sucesso' })
  remove(@Param('id') id: string) {
    return this.idiomaService.remove(+id);
  }
}
