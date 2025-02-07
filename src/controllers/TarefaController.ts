import { Request, Response } from 'express';
import { createTarefaService, listarTarefasService,
  getTarefaByIdService,
  searchTarefasService,
  concluirTarefaService,
  excluirTarefaService
} from '../services/TarefaService';
import { AppDataSource } from "../config/data-source";
import { Projeto } from "../entities/Projeto";

const projetoRepository = AppDataSource.getRepository(Projeto);

export class TarefaController {

  // Criar nova tarefa

    async criarTarefa(req: Request, res: Response) {
    const { titulo, descricao, status, projetoId } = req.body;

    try {
      const projeto = await projetoRepository.findOne({ where: { id: projetoId } });
      if (!projeto) {
        return res.status(404).json({ message: 'Projeto não encontrado' });
      }

      const tarefa = await createTarefaService({ titulo, descricao, status, projeto });
      return res.status(201).json(tarefa);
    } catch (error) {
      return res.status(400).json({ message: error instanceof Error ? error.message : 'Erro desconhecido' });
    }
  };

  // Listar tarefas de um projeto
  listarTarefas = async (req: Request, res: Response): Promise<Response> => {
    const { page, limit, projetoId } = req.query;

    try {
      const tarefas = await listarTarefasService(Number(projetoId), Number(page), Number(limit));
      return res.status(200).json(tarefas);
    } catch (error) {
      return res.status(400).json({ message: error instanceof Error ? error.message : 'Erro desconhecido' });
    }
  };

  // Buscar tarefa por ID
  buscarTarefaPorId = async (req: Request<{ id: string }>, res: Response): Promise<Response> => {
    const { id } = req.params;

    try {
      const tarefa = await getTarefaByIdService(Number(id));
      if (!tarefa) {
        return res.status(404).json({ message: 'Tarefa não encontrada' });
      }
      return res.status(200).json(tarefa);
    } catch (error) {
      return res.status(400).json({ message: error instanceof Error ? error.message : 'Erro desconhecido' });
    }
  };

  // Buscar tarefas com filtro
  buscarTarefasPorFiltro = async (req: Request, res: Response): Promise<Response> => {
    const filtro = req.query.filtro as string;
    const { page, limit } = req.query;

    try {
      const tarefas = await searchTarefasService(filtro, Number(page), Number(limit));
      return res.status(200).json(tarefas);
    } catch (error) {
      return res.status(400).json({ message: error instanceof Error ? error.message : 'Erro desconhecido' });
    }
  };

  // Marcar tarefa como concluída
  concluirTarefa = async (req: Request<{ id: string }>, res: Response): Promise<Response> => {
    const { id } = req.params;

    try {
      const tarefa = await concluirTarefaService(Number(id));
      return res.status(200).json(tarefa);
    } catch (error) {
      return res.status(400).json({ message: error instanceof Error ? error.message : 'Erro desconhecido' });
    }
  };

  // Excluir tarefa
  excluirTarefa = async (req: Request<{ id: string }>, res: Response): Promise<Response> => {
    const { id } = req.params;

    try {
      await excluirTarefaService(Number(id));
      return res.status(200).json({ message: 'Tarefa excluída com sucesso' });
    } catch (error) {
      return res.status(400).json({ message: error instanceof Error ? error.message : 'Erro desconhecido' });
    }
  };
}
