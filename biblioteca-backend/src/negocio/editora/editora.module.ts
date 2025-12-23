import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EditoraService } from './editora.service';
import { EditoraController } from './editora.controller';
import { Editora } from './editora.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Editora])],
  controllers: [EditoraController],
  providers: [EditoraService],
  exports: [EditoraService],
})
export class EditoraModule {}
