import { MigrationInterface, QueryRunner } from "typeorm";

export class CriacaoBanco1766502641616 implements MigrationInterface {
    name = 'CriacaoBanco1766502641616'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "senha" character varying(60) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "senha"`);
    }

}
