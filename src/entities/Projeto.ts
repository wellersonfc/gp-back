import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('projetos')  // Nome da tabela no banco de dados
export class Projeto {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  nome!: string;

  @Column({ type: 'text', nullable: true })
  descricao!: string;

  @Column({ type: 'date', nullable: false })
  dateinicio!: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  data_criacao!: Date;
}