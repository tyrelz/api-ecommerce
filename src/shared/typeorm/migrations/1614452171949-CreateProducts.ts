import { MigrationInterface, QueryRunner, Table } from 'typeorm';

// metodos assincronos gerados pelo typeorm cli, são assincronos porq são operações
// com o banco de dados q levam tempo
export class CreateProducts1614452171949 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'products',
        columns: [
          {
            name: 'id',
            type: 'uuid', // id unico universal gerenciado automaticamente pelo typeorm
            isPrimary: true,
            generationStrategy: 'uuid', // Estrategia de geração
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'price',
            type: 'decimal',
            precision: 10, //parte inteira
            scale: 2, // parte decimal ou seja duas casas decimais
          },
          {
            name: 'quantity',
            type: 'int',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('products');
  }
}
