import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Autor } from './autor.entity';
import { CreateAutorDto } from './dto/create-autor.dto';
import { UpdateAutorDto } from './dto/update-autor.dto';

@Injectable()
export class AutorService {
  constructor(
    @InjectRepository(Autor)
    private autorRepository: Repository<Autor>,
  ) {}

  async create(createAutorDto: CreateAutorDto): Promise<Autor> {
    const autor = this.autorRepository.create(createAutorDto);
    return await this.autorRepository.save(autor);
  }

  async findAll(): Promise<Autor[]> {
    return await this.autorRepository.find({ 
      relations: ['livros'] ,
      order: {
        nome: 'ASC',
      },
    })
  }

  async findOne(id: number): Promise<Autor> {
    const autor = await this.autorRepository.findOne({
      where: { id },
      relations: ['livros'],
    });
    if (!autor) {
      throw new NotFoundException(`Autor com ID ${id} não encontrado`);
    }
    return autor;
  }

  async update(id: number, updateAutorDto: UpdateAutorDto): Promise<Autor> {
    const autor = await this.findOne(id);
    Object.assign(autor, updateAutorDto);
    return await this.autorRepository.save(autor);
  }

  async remove(id: number): Promise<void> {
    const autor = await this.findOne(id);
    await this.autorRepository.remove(autor);
  }
}
