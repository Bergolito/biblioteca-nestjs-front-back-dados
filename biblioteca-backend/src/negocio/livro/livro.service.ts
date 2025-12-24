import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Livro } from './livro.entity';
import { CreateLivroDto } from './dto/create-livro.dto';
import { UpdateLivroDto } from './dto/update-livro.dto';

@Injectable()
export class LivroService {
  constructor(
    @InjectRepository(Livro)
    private livroRepository: Repository<Livro>,
  ) {}

  async create(createLivroDto: CreateLivroDto): Promise<Livro> {
    const livro = this.livroRepository.create(createLivroDto);
    return await this.livroRepository.save(livro);
  }

  async findAll(): Promise<Livro[]> {
    return await this.livroRepository.find({
      relations: ['autor', 'editora', 'imagem', 'categoriaLivros'],
      order: {
        titulo: 'ASC',
      },
    });
  }

  async findOne(id: number): Promise<Livro> {
    const livro = await this.livroRepository.findOne({
      where: { id },
      relations: ['autor', 'editora', 'imagem', 'categoriaLivros'],
    });
    if (!livro) {
      throw new NotFoundException(`Livro com ID ${id} não encontrado`);
    }
    return livro;
  }

  async update(id: number, updateLivroDto: UpdateLivroDto): Promise<Livro> {
    const livro = await this.findOne(id);
    Object.assign(livro, updateLivroDto);
    return await this.livroRepository.save(livro);
  }

  async remove(id: number): Promise<void> {
    const livro = await this.findOne(id);
    await this.livroRepository.remove(livro);
  }
}
