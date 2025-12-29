import { MigrationInterface, QueryRunner } from "typeorm";

export class AtualizacaoImagemLivro1767038971510 implements MigrationInterface {
    name = 'AtualizacaoImagemLivro1767038971510'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "imagens_livro" DROP COLUMN "arquivo"`);
        await queryRunner.query(`ALTER TABLE "imagens_livro" ADD "arquivo" bytea`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "imagens_livro" DROP COLUMN "arquivo"`);
        await queryRunner.query(`ALTER TABLE "imagens_livro" ADD "arquivo" text`);
    }

}
