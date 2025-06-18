import express from 'express';
import {
  getContextos,
  getContextoById,
  setContexto,
  deleteContexto
} from '../controllers/contextosController.js';

const router = express.Router();

router.get('/', getContextos);
router.get('/:id', getContextoById);
router.post('/', setContexto);
router.delete('/:id', deleteContexto);

export default router;
