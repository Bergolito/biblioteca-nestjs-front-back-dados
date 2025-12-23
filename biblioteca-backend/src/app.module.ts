import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutorModule } from './negocio/autor/autor.module';
import { EditoraModule } from './negocio/editora/editora.module';
import { LivroModule } from './negocio/livro/livro.module';
import { CategoriaModule } from './negocio/categoria/categoria.module';
import { UsuarioModule } from './negocio/usuario/usuario.module';
import { ImagemLivroModule } from './negocio/imagem-livro/imagem-livro.module';
import { IdiomaModule } from './negocio/idioma/idioma.module';
import { CategoriaLivroModule } from './negocio/categoria-livro/categoria-livro.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/negocio/**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/migrations/*{.ts,.js}'],
      synchronize: process.env.NODE_ENV === 'development', // Apenas em desenvolvimento
      migrationsRun: process.env.NODE_ENV === 'production', // Auto-run em produção
      logging: true,
    }),
    AutorModule,
    EditoraModule,
    LivroModule,
    UsuarioModule,
    ImagemLivroModule,
    IdiomaModule,
    CategoriaModule,
    CategoriaLivroModule,
    AuthModule,
  ],
})
export class AppModule {}
