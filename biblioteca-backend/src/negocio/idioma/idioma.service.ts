import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Idioma } from './idioma.entity';
import { CreateIdiomaDto } from './dto/create-idioma.dto';
import { UpdateIdiomaDto } from './dto/update-idioma.dto';

@Injectable()
export class IdiomaService {
  constructor(
    @InjectRepository(Idioma)
    private idiomaRepository: Repository<Idioma>,
  ) {}

  async create(createIdiomaDto: CreateIdiomaDto): Promise<Idioma> {
    const idioma = this.idiomaRepository.create(createIdiomaDto);
    return await this.idiomaRepository.save(idioma);
  }

  async findAll(): Promise<Idioma[]> {
    return await this.idiomaRepository.find();
  }

  async findOne(id: number): Promise<Idioma> {
    const idioma = await this.idiomaRepository.findOne({
      where: { id },
    });
    if (!idioma) {
      throw new NotFoundException(`Idioma com ID ${id} não encontrado`);
    }
    return idioma;
  }

  async update(id: number, updateIdiomaDto: UpdateIdiomaDto): Promise<Idioma> {
    const idioma = await this.findOne(id);
    Object.assign(idioma, updateIdiomaDto);
    return await this.idiomaRepository.save(idioma);
  }

  async remove(id: number): Promise<void> {
    const idioma = await this.findOne(id);
    await this.idiomaRepository.remove(idioma);
  }
}
