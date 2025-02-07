import { Router } from 'express';
import TarefasRoutes from './TarefaRoutes';
import ProjetoRoutes from './ProjetoRoutes'

const router = Router();

// Adiciona paginas de rota
router.use(TarefasRoutes);
router.use(ProjetoRoutes);


export default router;
