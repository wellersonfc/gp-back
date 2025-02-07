import express, { Request, Response, NextFunction } from 'express';
import { ProjetoController } from '../controllers/ProjetoController';

const produtoRoutes = express.Router();
const projetoController = new ProjetoController();

// Função assíncrona para lidar com erros
const asyncRoute = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(fn(req, res, next)).catch(next);
  };
};


produtoRoutes.post('/projetos', projetoController.criarProjeto);  // Rota para criar um projeto
produtoRoutes.get('/projetos', projetoController.listarProjetos);  // Rota para listar projetos com paginação
produtoRoutes.get('/projetos/:id', asyncRoute(projetoController.buscarProjetoPorId));  // Rota para buscar projeto por ID
produtoRoutes.get('/projetos/filtro', projetoController.buscarProjetosPorFiltro);  // Rota para buscar projetos com filtro

export default produtoRoutes;
