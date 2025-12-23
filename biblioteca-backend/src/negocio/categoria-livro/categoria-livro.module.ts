import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaLivroService } from './categoria-livro.service';
import { CategoriaLivroController } from './categoria-livro.controller';
import { CategoriaLivro } from './categoria-livro.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoriaLivro])],
  controllers: [CategoriaLivroController],
  providers: [CategoriaLivroService],
  exports: [CategoriaLivroService],
})
export class CategoriaLivroModule {}
