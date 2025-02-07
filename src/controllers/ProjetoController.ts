import { Request, Response } from 'express';
import { createProjetoService, listarProjetosService, getProjetoByIdService, searchProjetosService } from '../services/ProjetoService';

export class ProjetoController {

  // Criar um novo projeto
  async criarProjeto(req: Request, res: Response) {
    const { nome, descricao, dateinicio } = req.body;
    console.log(`bati aqui`,nome, descricao, dateinicio  )
    try {
      const projeto = await createProjetoService({ nome, descricao, dateinicio });
      res.status(201).json(projeto);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }

  // Listar projetos
  async listarProjetos(req: Request, res: Response) {
    const { page, limit } = req.query;

    try {
      const projetos = await listarProjetosService(Number(page), Number(limit));
      res.status(200).json(projetos);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }

  // Buscar projeto por ID
  async buscarProjetoPorId(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const projeto = await getProjetoByIdService(Number(id));
      if (!projeto) {
        return res.status(404).json({ message: 'Projeto não encontrado' });
      }
      res.status(200).json(projeto);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }

  // Buscar projetos com filtro
  async buscarProjetosPorFiltro(req: Request, res: Response) {
    const filtro = req.query;  // Filtros podem vir da query string
    const { page, limit } = req.query;

    try {
      const projetos = await searchProjetosService(filtro, Number(page), Number(limit));
      res.status(200).json(projetos);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }
}
