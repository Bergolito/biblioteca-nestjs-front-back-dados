import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoriaLivro } from './categoria-livro.entity';
import { CreateCategoriaLivroDto } from './dto/create-categoria-livro.dto';
import { UpdateCategoriaLivroDto } from './dto/update-categoria-livro.dto';

@Injectable()
export class CategoriaLivroService {
  constructor(
    @InjectRepository(CategoriaLivro)
    private categoriaLivroRepository: Repository<CategoriaLivro>,
  ) {}

  async create(createCategoriaLivroDto: CreateCategoriaLivroDto): Promise<CategoriaLivro> {
    const categoriaLivro = this.categoriaLivroRepository.create(createCategoriaLivroDto);
    return await this.categoriaLivroRepository.save(categoriaLivro);
  }

  async findAll(): Promise<CategoriaLivro[]> {
    return await this.categoriaLivroRepository.find({
      relations: ['livro', 'categoria'],
    });
  }

  async findOne(id: number): Promise<CategoriaLivro> {
    const categoriaLivro = await this.categoriaLivroRepository.findOne({
      where: { id },
      relations: ['livro', 'categoria'],
    });
    if (!categoriaLivro) {
      throw new NotFoundException(`CategoriaLivro com ID ${id} não encontrada`);
    }
    return categoriaLivro;
  }

  async findByLivro(livro_id: number): Promise<CategoriaLivro[]> {
    return await this.categoriaLivroRepository.find({
      where: { livro_id },
      relations: ['livro', 'categoria'],
    });
  }

  async findByCategoria(categoria_id: number): Promise<CategoriaLivro[]> {
    return await this.categoriaLivroRepository.find({
      where: { categoria_id },
      relations: ['livro', 'categoria'],
    });
  }

  async update(id: number, updateCategoriaLivroDto: UpdateCategoriaLivroDto): Promise<CategoriaLivro> {
    const categoriaLivro = await this.findOne(id);
    Object.assign(categoriaLivro, updateCategoriaLivroDto);
    return await this.categoriaLivroRepository.save(categoriaLivro);
  }

  async remove(id: number): Promise<void> {
    const categoriaLivro = await this.findOne(id);
    await this.categoriaLivroRepository.remove(categoriaLivro);
  }
}
