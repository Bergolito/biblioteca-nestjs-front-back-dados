import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagemLivroService } from './imagem-livro.service';
import { ImagemLivroController } from './imagem-livro.controller';
import { ImagemLivro } from './imagem-livro.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ImagemLivro])],
  controllers: [ImagemLivroController],
  providers: [ImagemLivroService],
  exports: [ImagemLivroService],
})
export class ImagemLivroModule {}
