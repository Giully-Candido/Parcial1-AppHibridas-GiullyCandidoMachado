import express from 'express';
import {getExcusas, setExcusas, updateExcusa, getExcusaById, deleteExcusa, getMisExcusas} from '../controllers/excusasController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();
// Definición de las rutas para la API de excusas
router.get('/', getExcusas); // Obtener todas las excusas
router.get('/mis-excusas', authMiddleware, getMisExcusas);  // Obtener las excusas del usuario
router.post('/', authMiddleware, setExcusas); // Agregar una nueva excusa (protegida)
router.put('/:id', updateExcusa); // Actualizar una excusa por ID 
router.get('/:id', getExcusaById); // Obtener una excusa por ID
router.delete('/:id', deleteExcusa); // Eliminar una excusa por ID
// Exportar el router para usarlo en el archivo principal
export default router;