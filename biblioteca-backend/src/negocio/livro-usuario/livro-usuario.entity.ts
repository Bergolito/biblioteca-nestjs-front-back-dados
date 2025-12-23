import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Livro } from '../livro/livro.entity';
import { Usuario } from '../usuario/usuario.entity';

@Entity('livro_usuarios')
export class LivroUsuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  livro_id: number;

  @Column()
  usuario_id: number;

  @ManyToOne(() => Livro, (livro) => livro.livroUsuarios)
  @JoinColumn({ name: 'livro_id' })
  livro: Livro;

  @ManyToOne(() => Usuario, (usuario) => usuario.livroUsuarios)
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;
}
