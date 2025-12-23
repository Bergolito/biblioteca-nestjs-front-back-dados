import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CategoriaLivro } from '../categoria-livro/categoria-livro.entity';

@Entity('categorias')
export class Categoria {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nome: string;

  @Column({ type: 'text', nullable: true })
  descricao: string;

  @OneToMany(() => CategoriaLivro, (categoriaLivro) => categoriaLivro.categoria)
  categoriaLivros: CategoriaLivro[];
}
