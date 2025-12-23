import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Usuario } from '../negocio/usuario/usuario.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, senha, nome } = registerDto;

    // Verificar se o usuário já existe
    const usuarioExistente = await this.usuarioRepository.findOne({
      where: { email },
    });

    if (usuarioExistente) {
      throw new UnauthorizedException('Email já cadastrado');
    }

    // Hash da senha
    const saltRounds = 10;
    const senhaHash = await bcrypt.hash(senha, saltRounds);

    // Criar usuário
    const novoUsuario = this.usuarioRepository.create({
      email,
      senha: senhaHash,
      nome,
    });

    const usuarioSalvo = await this.usuarioRepository.save(novoUsuario);

    // Gerar token
    const payload = { 
      email: usuarioSalvo.email, 
      sub: usuarioSalvo.id,
      nome: usuarioSalvo.nome 
    };

    return {
      access_token: this.jwtService.sign(payload),
      usuario: {
        id: usuarioSalvo.id,
        email: usuarioSalvo.email,
        nome: usuarioSalvo.nome,
      },
    };
  }

  async login(loginDto: LoginDto) {
    const { email, senha } = loginDto;

    // Buscar usuário
    const usuario = await this.usuarioRepository.findOne({
      where: { email },
    });

    if (!usuario) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // Verificar senha
    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // Gerar token
    const payload = { 
      email: usuario.email, 
      sub: usuario.id,
      nome: usuario.nome 
    };

    return {
      access_token: this.jwtService.sign(payload),
      usuario: {
        id: usuario.id,
        email: usuario.email,
        nome: usuario.nome,
      },
    };
  }

  async validateUser(userId: number) {
    const usuario = await this.usuarioRepository.findOne({
      where: { id: userId },
      select: ['id', 'email', 'nome'],
    });

    if (!usuario) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    return usuario;
  }
}
