import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Livro } from '../livro/livro.entity';
import { Categoria } from '../categoria/categoria.entity';

@Entity('categorias_livro')
export class CategoriaLivro {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  livro_id: number;

  @Column()
  categoria_id: number;

  @ManyToOne(() => Livro, (livro) => livro.categoriaLivros)
  @JoinColumn({ name: 'livro_id' })
  livro: Livro;

  @ManyToOne(() => Categoria, (categoria) => categoria.categoriaLivros)
  @JoinColumn({ name: 'categoria_id' })
  categoria: Categoria;
}
