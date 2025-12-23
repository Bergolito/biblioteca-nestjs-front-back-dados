import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Livro } from '../livro/livro.entity';

@Entity('autores')
export class Autor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  nome: string;

  @Column({ length: 100, nullable: true })
  nacionalidade: string;

  @OneToMany(() => Livro, (livro) => livro.autor)
  livros: Livro[];
}
