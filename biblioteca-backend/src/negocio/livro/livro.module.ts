import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LivroService } from './livro.service';
import { LivroController } from './livro.controller';
import { Livro } from './livro.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Livro])],
  controllers: [LivroController],
  providers: [LivroService],
  exports: [LivroService],
})
export class LivroModule {}
