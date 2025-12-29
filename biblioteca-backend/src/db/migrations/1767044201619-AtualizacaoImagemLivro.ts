import { MigrationInterface, QueryRunner } from "typeorm";

export class AtualizacaoImagemLivro1767044201619 implements MigrationInterface {
    name = 'AtualizacaoImagemLivro1767044201619'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "imagens_livro" ADD "mime_type" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "imagens_livro" ADD "tamanho" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "imagens_livro" DROP COLUMN "tamanho"`);
        await queryRunner.query(`ALTER TABLE "imagens_livro" DROP COLUMN "mime_type"`);
    }

}
