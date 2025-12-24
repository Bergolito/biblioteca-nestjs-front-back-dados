import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Editora } from './editora.entity';
import { CreateEditoraDto } from './dto/create-editora.dto';
import { UpdateEditoraDto } from './dto/update-editora.dto';

@Injectable()
export class EditoraService {
  constructor(
    @InjectRepository(Editora)
    private editoraRepository: Repository<Editora>,
  ) {}

  async create(createEditoraDto: CreateEditoraDto): Promise<Editora> {
    const editora = this.editoraRepository.create(createEditoraDto);
    return await this.editoraRepository.save(editora);
  }

  async findAll(): Promise<Editora[]> {
    return await this.editoraRepository.find({ 
      relations: ['livros'] ,
      order: {
        nome: 'ASC',
      },
    });
  }

  async findOne(id: number): Promise<Editora> {
    const editora = await this.editoraRepository.findOne({
      where: { id },
      relations: ['livros'],
    });
    if (!editora) {
      throw new NotFoundException(`Editora com ID ${id} não encontrada`);
    }
    return editora;
  }

  async update(id: number, updateEditoraDto: UpdateEditoraDto): Promise<Editora> {
    const editora = await this.findOne(id);
    Object.assign(editora, updateEditoraDto);
    return await this.editoraRepository.save(editora);
  }

  async remove(id: number): Promise<void> {
    const editora = await this.findOne(id);
    await this.editoraRepository.remove(editora);
  }
}
