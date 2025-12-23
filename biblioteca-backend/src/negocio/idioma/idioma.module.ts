import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IdiomaService } from './idioma.service';
import { IdiomaController } from './idioma.controller';
import { Idioma } from './idioma.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Idioma])],
  controllers: [IdiomaController],
  providers: [IdiomaService],
  exports: [IdiomaService],
})
export class IdiomaModule {}
