import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Livro } from './livro.entity';
import { CreateLivroDto } from './dto/create-livro.dto';
import { UpdateLivroDto } from './dto/update-livro.dto';
import { LivroFilters } from './interfaces/livro-filters.interface';

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
    console.log('Fetching all books with relations...');
    
    const livros = await this.livroRepository.find({
      relations: ['autor', 'editora', 'imagem',  'idioma', 'categoriaLivros'],
      order: {
        titulo: 'ASC',
      },
    });
    
    return livros.map(livro => ({
      ...livro,
      subtitulo: livro.subtitulo !== 'NULL' ? livro.subtitulo : '' ,
    }));
  }

  async findAllFilter(filters: LivroFilters): Promise<Livro[]> {
    const query = this.livroRepository.createQueryBuilder('livro')
      .leftJoinAndSelect('livro.autor', 'autor')
      .leftJoinAndSelect('livro.editora', 'editora')
      .leftJoinAndSelect('livro.imagem', 'imagem')
      .leftJoinAndSelect('livro.idioma', 'idioma')
      .leftJoinAndSelect('livro.categoriaLivros', 'categoriaLivros')
      .leftJoinAndSelect('categoriaLivros.categoria', 'categoria');

    if (filters.titulo) {
      query.andWhere('LOWER(livro.titulo) LIKE LOWER(:titulo)', { 
        titulo: `%${filters.titulo}%` 
      });
    }

    if (filters.autor_id) {
      query.andWhere('livro.autor_id = :autor_id', { autor_id: filters.autor_id });
    }

    if (filters.editora_id) {
      query.andWhere('livro.editora_id = :editora_id', { editora_id: filters.editora_id });
    }

    if (filters.idioma_id) {
      query.andWhere('livro.idioma_id = :idioma_id', { idioma_id: filters.idioma_id });
    }

    if (filters.ano) {
      query.andWhere('livro.ano = :ano', { ano: filters.ano });
    }

    if (filters.categoria_id) {
      query.andWhere('categoria.id = :categoria_id', { categoria_id: filters.categoria_id });
    }

    query.orderBy('livro.titulo', 'ASC');

    const livros = await query.getMany();

    return livros.map(livro => ({
      ...livro,
      subtitulo: livro.subtitulo !== 'NULL' ? livro.subtitulo : '',
    }));
  }  async findOne(id: number): Promise<Livro> {
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
