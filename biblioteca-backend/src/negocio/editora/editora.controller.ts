import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { EditoraService } from './editora.service';
import { CreateEditoraDto } from './dto/create-editora.dto';
import { UpdateEditoraDto } from './dto/update-editora.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@ApiTags('Editoras')
@Controller('editoras')
export class EditoraController {
  constructor(private readonly editoraService: EditoraService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Criar nova editora' })
  @ApiResponse({ status: 201, description: 'Editora criada com sucesso' })
  create(@Body() createEditoraDto: CreateEditoraDto) {
    return this.editoraService.create(createEditoraDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as editoras' })
  @ApiResponse({ status: 200, description: 'Lista de editoras retornada com sucesso' })
  findAll() {
    return this.editoraService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar editora por ID' })
  @ApiResponse({ status: 200, description: 'Editora encontrada' })
  findOne(@Param('id') id: string) {
    return this.editoraService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Atualizar editora' })
  @ApiResponse({ status: 200, description: 'Editora atualizada com sucesso' })
  update(@Param('id') id: string, @Body() updateEditoraDto: UpdateEditoraDto) {
    return this.editoraService.update(+id, updateEditoraDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Deletar editora' })
  @ApiResponse({ status: 200, description: 'Editora deletada com sucesso' })
  remove(@Param('id') id: string) {
    return this.editoraService.remove(+id);
  }
}
