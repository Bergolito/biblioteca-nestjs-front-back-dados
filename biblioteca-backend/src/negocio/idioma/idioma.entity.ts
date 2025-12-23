import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Livro } from '../../negocio/livro/livro.entity';
import { IsOptional } from 'class-validator';

@Entity('idiomas')
export class Idioma {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 , unique: true, nullable: false })
  codigo: string;

  @IsOptional()
  @Column({ length: 100, nullable: true })
  descricao: string;

  @OneToMany(() => Livro, (livro) => livro.idioma)
  livros: Livro[];

}
