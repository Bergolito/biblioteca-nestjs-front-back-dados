import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne } from 'typeorm';
import { Livro } from '../livro/livro.entity';

@Entity('imagens_livro')
export class ImagemLivro {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  descricao?: string;

  @Column({ type: 'text', nullable: true  })
  arquivo?: string;

  @ManyToOne(() => Livro, (livro) => livro.imagem)
  livro: Livro;
}
