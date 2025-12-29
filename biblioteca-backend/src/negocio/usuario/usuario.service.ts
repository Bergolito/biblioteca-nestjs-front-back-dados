import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const usuario = this.usuarioRepository.create(createUsuarioDto);
    return await this.usuarioRepository.save(usuario);
  }

  async findAll(): Promise<Usuario[]> {
    return await this.usuarioRepository.find();
  }

  async findAllByFilter(filters: any): Promise<Usuario[]> {
    const query = this.usuarioRepository.createQueryBuilder('usuario');

    if (filters.nome) {
      query.andWhere('usuario.nome ILIKE :nome', { nome: `%${filters.nome}%` });
    }

    if (filters.email) {
      query.andWhere('usuario.email ILIKE :email', { email: `%${filters.email}%` });
    }

    if (filters.telefone) {
      query.andWhere('usuario.telefone ILIKE :telefone', { telefone: `%${filters.telefone}%` });
    }

    if (filters.sexo) {
      query.andWhere('usuario.sexo = :sexo', { sexo: filters.sexo });
    }

    query.orderBy('usuario.nome', 'ASC');

    return await query.getMany();
  }

  async findOne(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({
      where: { id },
      relations: ['livroUsuarios'],
    });
    if (!usuario) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    return usuario;
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
    const usuario = await this.findOne(id);
    Object.assign(usuario, updateUsuarioDto);
    return await this.usuarioRepository.save(usuario);
  }

  async remove(id: number): Promise<void> {
    const usuario = await this.findOne(id);
    await this.usuarioRepository.remove(usuario);
  }
}
