import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne } from 'typeorm';
import { Livro } from '../livro/livro.entity';

@Entity('imagens_livro')
export class ImagemLivro {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  descricao?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  mime_type?: string;

  @Column({ type: 'integer', nullable: true })
  tamanho?: number;

  @Column({ type: 'bytea', nullable: true })
  arquivo?: Buffer;

  @ManyToOne(() => Livro, (livro) => livro.imagem)
  livro: Livro;
}
