import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Autor } from '../autor/autor.entity';
import { CategoriaLivro } from '../categoria-livro/categoria-livro.entity';
import { Editora } from '../editora/editora.entity';
import { ImagemLivro } from '../imagem-livro/imagem-livro.entity';
import { LivroUsuario } from '../livro-usuario/livro-usuario.entity';
import { Idioma } from '../idioma/idioma.entity';

@Entity('livros')
export class Livro {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 300 })
  titulo: string;

  @Column({ length: 300, nullable: true })
  subtitulo: string;

  @Column({ nullable: true })
  edicao: number;

  @Column({ nullable: true })
  num_paginas: number;

  @Column({ nullable: true })
  ano: number;

  @Column({ nullable: true })
  autor_id: number;

  @Column({ nullable: true })
  editora_id: number;

  @Column({ nullable: true })
  imagem_id: number;

  @ManyToOne(() => Autor, (autor) => autor.livros)
  @JoinColumn({ name: 'autor_id' })
  autor: Autor;

  @ManyToOne(() => Editora, (editora) => editora.livros)
  @JoinColumn({ name: 'editora_id' })
  editora: Editora;

  @ManyToOne(() => Idioma, (idioma) => idioma.livros)
  @JoinColumn({ name: 'idioma_id' })
  idioma: Idioma;

  @ManyToOne(() => ImagemLivro, (imagem) => imagem.livro)
  @JoinColumn({ name: 'imagem_id' })
  imagem: ImagemLivro;

  @OneToMany(() => CategoriaLivro, (categoriaLivro) => categoriaLivro.livro)
  categoriaLivros: CategoriaLivro[];

  @OneToMany(() => LivroUsuario, (livroUsuario) => livroUsuario.livro)
  livroUsuarios: LivroUsuario[];

}
