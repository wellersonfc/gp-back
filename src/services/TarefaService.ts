import { AppDataSource } from "../config/data-source";
import { Tarefa } from "../entities/Tarefa";
import { Projeto } from "../entities/Projeto";

const tarefaRepository = AppDataSource.getRepository(Tarefa);
const projetoRepository = AppDataSource.getRepository(Projeto);

// Criar tarefa
export const createTarefaService = async (data: Partial<Tarefa>): Promise<Tarefa> => {
  const tarefa = tarefaRepository.create(data);
  return await tarefaRepository.save(tarefa);
};

// Listar tarefas de um projeto
export const listarTarefasService = async (projetoId: number, page: number = 1, limit: number = 10): Promise<Tarefa[]> => {
  const skip = (page - 1) * limit;
  return await tarefaRepository.find({
    where: { projeto: { id: projetoId } },
    skip,
    take: limit,
    order: { data_criacao: "DESC" } 
  });
};

// Buscar tarefa por ID
export const getTarefaByIdService = async (id: number): Promise<Tarefa | null> => {
  const tarefa = await tarefaRepository.findOne({
    where: { id },
    order: { data_criacao: "DESC" } 
  });
  return tarefa;
};

// Buscar tarefas com filtro (status)
export const searchTarefasService = async (
  filtro: string,
  page: number = 1,
  limit: number = 10
): Promise<Tarefa[]> => {
  const skip = (page - 1) * limit;
  return await tarefaRepository
    .createQueryBuilder("tarefa")
    .where("tarefa.status LIKE :filtro", { filtro: `%${filtro}%` })
    .skip(skip)
    .take(limit)
    .getMany();
};

// Marcar tarefa como concluída
export const concluirTarefaService = async (id: number): Promise<Tarefa | null> => {
  const tarefa = await tarefaRepository.findOne({ where: { id } });

  if (!tarefa) {
    throw new Error("Tarefa não encontrada");
  }

  tarefa.status = 'concluída';
  const dataBrasil = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
  tarefa.data_conclusao = new Date(dataBrasil);
  return await tarefaRepository.save(tarefa);
};

// Excluir tarefa
export const excluirTarefaService = async (id: number): Promise<void> => {
  const tarefa = await tarefaRepository.findOne({ where: { id } });

  if (!tarefa) {
    throw new Error("Tarefa não encontrada");
  }

  await tarefaRepository.remove(tarefa);
};
