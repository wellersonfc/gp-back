import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Projeto } from './Projeto';  // Importando a entidade Projeto

@Entity('tarefas')  // Nome da tabela no banco de dados
export class Tarefa {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  titulo!: string;

  @Column({ type: 'text', nullable: true })
  descricao!: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  data_criacao!: Date;

  @Column({ type: 'date', nullable: true })
  data_conclusao!: Date;

  @Column({ type: 'varchar', length: 50, nullable: false })
  status!: string;

  @ManyToOne(() => Projeto, projeto => projeto.id, { nullable: false })
  @JoinColumn({ name: 'id_projeto' })
  projeto!: Projeto;
}
