import { AppDataSource } from "../config/data-source";
import { Projeto } from '../entities/Projeto';

const projetoRepository = AppDataSource.getRepository(Projeto);

// Criar um novo projeto
export const createProjetoService = async (data: Partial<Projeto>): Promise<Projeto> => {
  const projeto = projetoRepository.create(data);
  return await projetoRepository.save(projeto);
};

// Listar projetos com paginação
export const listarProjetosService = async (page: number = 1, limit: number = 10): Promise<Projeto[]> => {
  const skip = (page - 1) * limit;
  return await projetoRepository.find({
    skip,
    take: limit,
    order: { data_criacao: "DESC" } 
  });
};

// Buscar projeto por ID
export const getProjetoByIdService = async (id: number): Promise<Projeto | null> => {
  const projeto = await projetoRepository.findOne({
    where: { id }, // Condição de busca pelo ID
  });
  return projeto;
};

// Buscar projetos com filtro (ex: por nome ou data de início)
export const searchProjetosService = async (
  filtro: { nome?: string; dateinicio?: string },
  page: number = 1,
  limit: number = 10
): Promise<Projeto[]> => {
  const skip = (page - 1) * limit;

  const query = projetoRepository.createQueryBuilder("projeto");

  if (filtro.nome) {
    query.andWhere("projeto.nome LIKE :nome", { nome: `%${filtro.nome}%` });
  }

  if (filtro.dateinicio) {
    query.andWhere("projeto.dateinicio = :dateinicio", { dateinicio: filtro.dateinicio });
  }

  return await query
    .skip(skip)
    .take(limit)
    .getMany();
};
