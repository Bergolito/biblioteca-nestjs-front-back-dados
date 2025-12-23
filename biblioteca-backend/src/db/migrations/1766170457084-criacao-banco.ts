import { MigrationInterface, QueryRunner } from "typeorm";

export class CriacaoBanco1766170457084 implements MigrationInterface {
    name = 'CriacaoBanco1766170457084'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "autores" ("id" SERIAL NOT NULL, "nome" character varying(200) NOT NULL, "nacionalidade" character varying(100), CONSTRAINT "PK_8973029e8bb26f72a4738afc834" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categorias" ("id" SERIAL NOT NULL, "nome" character varying(100) NOT NULL, "descricao" text, CONSTRAINT "PK_3886a26251605c571c6b4f861fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categorias_livro" ("id" SERIAL NOT NULL, "livro_id" integer NOT NULL, "categoria_id" integer NOT NULL, CONSTRAINT "PK_2657921af04214bb4e3939fad77" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "editoras" ("id" SERIAL NOT NULL, "nome" character varying(200) NOT NULL, CONSTRAINT "PK_9974cc858c97fb880c59f85e183" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "imagens_livro" ("id" SERIAL NOT NULL, "descricao" text, "arquivo" text, "livroId" integer, CONSTRAINT "PK_8464d35ec9400c46349d8542425" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "idiomas" ("id" SERIAL NOT NULL, "codigo" character varying(20) NOT NULL, "descricao" character varying(100), CONSTRAINT "UQ_cbc4d734c634c8078ec93e5a85a" UNIQUE ("codigo"), CONSTRAINT "PK_a9bfe9f03f167c8a3365b3c8331" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "livros" ("id" SERIAL NOT NULL, "titulo" character varying(300) NOT NULL, "subtitulo" character varying(300), "edicao" integer, "num_paginas" integer, "ano" integer, "autor_id" integer, "editora_id" integer, "imagem_id" integer, "idioma_id" integer, CONSTRAINT "PK_69daba516e6b0dd45f49c4d8d52" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "livro_usuarios" ("id" SERIAL NOT NULL, "livro_id" integer NOT NULL, "usuario_id" integer NOT NULL, CONSTRAINT "PK_f37ad52dc987277761fda9fd75c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "usuarios" ("id" SERIAL NOT NULL, "email" character varying(200) NOT NULL, "nome" character varying(200) NOT NULL, "endereco" text, "data_nasc" date, "sexo" character varying(1), "telefone" character varying(20), CONSTRAINT "UQ_446adfc18b35418aac32ae0b7b5" UNIQUE ("email"), CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "categorias_livro" ADD CONSTRAINT "FK_61f1af87b528b0c9185e8d85657" FOREIGN KEY ("livro_id") REFERENCES "livros"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "categorias_livro" ADD CONSTRAINT "FK_8cfc5afe15cf99b670589bf97f2" FOREIGN KEY ("categoria_id") REFERENCES "categorias"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "imagens_livro" ADD CONSTRAINT "FK_28d57b699808310452d963e7f4b" FOREIGN KEY ("livroId") REFERENCES "livros"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "livros" ADD CONSTRAINT "FK_04cc6a5eb11a1f1105d2f796261" FOREIGN KEY ("autor_id") REFERENCES "autores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "livros" ADD CONSTRAINT "FK_c20aee57e1cd35613512abb9fcc" FOREIGN KEY ("editora_id") REFERENCES "editoras"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "livros" ADD CONSTRAINT "FK_69416e153790381cf44223158f1" FOREIGN KEY ("idioma_id") REFERENCES "idiomas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "livros" ADD CONSTRAINT "FK_6030a34fabe2f4d27fc3b439323" FOREIGN KEY ("imagem_id") REFERENCES "imagens_livro"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "livro_usuarios" ADD CONSTRAINT "FK_9c67112486124c872c43810a6bd" FOREIGN KEY ("livro_id") REFERENCES "livros"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "livro_usuarios" ADD CONSTRAINT "FK_f1af90524540f2df511f26fa053" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "livro_usuarios" DROP CONSTRAINT "FK_f1af90524540f2df511f26fa053"`);
        await queryRunner.query(`ALTER TABLE "livro_usuarios" DROP CONSTRAINT "FK_9c67112486124c872c43810a6bd"`);
        await queryRunner.query(`ALTER TABLE "livros" DROP CONSTRAINT "FK_6030a34fabe2f4d27fc3b439323"`);
        await queryRunner.query(`ALTER TABLE "livros" DROP CONSTRAINT "FK_69416e153790381cf44223158f1"`);
        await queryRunner.query(`ALTER TABLE "livros" DROP CONSTRAINT "FK_c20aee57e1cd35613512abb9fcc"`);
        await queryRunner.query(`ALTER TABLE "livros" DROP CONSTRAINT "FK_04cc6a5eb11a1f1105d2f796261"`);
        await queryRunner.query(`ALTER TABLE "imagens_livro" DROP CONSTRAINT "FK_28d57b699808310452d963e7f4b"`);
        await queryRunner.query(`ALTER TABLE "categorias_livro" DROP CONSTRAINT "FK_8cfc5afe15cf99b670589bf97f2"`);
        await queryRunner.query(`ALTER TABLE "categorias_livro" DROP CONSTRAINT "FK_61f1af87b528b0c9185e8d85657"`);
        await queryRunner.query(`DROP TABLE "usuarios"`);
        await queryRunner.query(`DROP TABLE "livro_usuarios"`);
        await queryRunner.query(`DROP TABLE "livros"`);
        await queryRunner.query(`DROP TABLE "idiomas"`);
        await queryRunner.query(`DROP TABLE "imagens_livro"`);
        await queryRunner.query(`DROP TABLE "editoras"`);
        await queryRunner.query(`DROP TABLE "categorias_livro"`);
        await queryRunner.query(`DROP TABLE "categorias"`);
        await queryRunner.query(`DROP TABLE "autores"`);
    }

}
