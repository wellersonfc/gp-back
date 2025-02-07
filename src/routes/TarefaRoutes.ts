import express, { Request, Response, NextFunction } from 'express';
import { TarefaController } from '../controllers/TarefaController';

const tarefaRoutes = express.Router();
const tarefaController = new TarefaController();

// Middleware para envolver funções assíncronas
const asyncRoute = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(fn(req, res, next)).catch(next);
  };
};

tarefaRoutes.post('/tarefas', asyncRoute(tarefaController.criarTarefa));  // Rota para criar uma tarefa
tarefaRoutes.get('/tarefas', asyncRoute(tarefaController.listarTarefas));  // Rota para listar tarefas
tarefaRoutes.get('/tarefas/:id', asyncRoute(tarefaController.buscarTarefaPorId));  // Rota para buscar tarefa por ID
tarefaRoutes.get('/tarefas/filtro', asyncRoute(tarefaController.buscarTarefasPorFiltro));  // Rota para buscar tarefas com filtro
tarefaRoutes.put('/tarefas/concluir/:id', asyncRoute(tarefaController.concluirTarefa));  // Rota para marcar tarefa como concluída
tarefaRoutes.delete('/tarefas/:id', asyncRoute(tarefaController.excluirTarefa));  // Rota para excluir tarefa

export default tarefaRoutes;
