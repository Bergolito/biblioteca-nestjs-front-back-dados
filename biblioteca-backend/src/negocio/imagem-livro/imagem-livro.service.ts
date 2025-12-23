import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImagemLivro } from './imagem-livro.entity';
import { CreateImagemLivroDto } from './dto/create-imagem-livro.dto';
import { UpdateImagemLivroDto } from './dto/update-imagem-livro.dto';

@Injectable()
export class ImagemLivroService {
  constructor(
    @InjectRepository(ImagemLivro)
    private imagemLivroRepository: Repository<ImagemLivro>,
  ) {}

  async create(createImagemLivroDto: CreateImagemLivroDto): Promise<ImagemLivro> {
    const imagemLivro = this.imagemLivroRepository.create(createImagemLivroDto);
    return await this.imagemLivroRepository.save(imagemLivro);
  }

  async findAll(): Promise<ImagemLivro[]> {
    return await this.imagemLivroRepository.find();
  }

  async findOne(id: number): Promise<ImagemLivro> {
    const imagemLivro = await this.imagemLivroRepository.findOne({
      where: { id },
    });
    if (!imagemLivro) {
      throw new NotFoundException(`Imagem com ID ${id} não encontrada`);
    }
    return imagemLivro;
  }

  async update(id: number, updateImagemLivroDto: UpdateImagemLivroDto): Promise<ImagemLivro> {
    const imagemLivro = await this.findOne(id);
    Object.assign(imagemLivro, updateImagemLivroDto);
    return await this.imagemLivroRepository.save(imagemLivro);
  }

  async remove(id: number): Promise<void> {
    const imagemLivro = await this.findOne(id);
    await this.imagemLivroRepository.remove(imagemLivro);
  }
}
