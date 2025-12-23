import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { LivroUsuario } from '../livro-usuario/livro-usuario.entity';
import { IsOptional } from 'class-validator';

@Entity('usuarios')
export class Usuario {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200, unique: true })
  email: string;

  @Column({ length: 200 })
  nome: string;

  @Column({ length: 60 })
  senha: string;

  @IsOptional()
  @Column({ type: 'text', nullable: true })
  endereco: string;

  @IsOptional()
  @Column({ type: 'date', nullable: true })
  data_nasc: Date;

  @IsOptional()
  @Column({ length: 1, nullable: true })
  sexo: string;

  @IsOptional()
  @Column({ length: 20, nullable: true })
  telefone: string;

  @OneToMany(() => LivroUsuario, (livroUsuario) => livroUsuario.usuario)
  livroUsuarios: LivroUsuario[];
}
