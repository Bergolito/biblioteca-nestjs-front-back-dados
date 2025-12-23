import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Livro } from '../livro/livro.entity';

@Entity('editoras')
export class Editora {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  nome: string;

  @OneToMany(() => Livro, (livro) => livro.editora)
  livros: Livro[];
}
