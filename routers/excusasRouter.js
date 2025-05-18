import express from 'express';
import {getExcusas, setExcusas, updateExcusa, getExcusaById, deleteExcusa} from '../controllers/excusasController.js';

const router = express.Router();
// Definición de las rutas para la API de excusas
router.get('/', getExcusas); // Obtener todas las excusas
router.post('/', setExcusas); // Agregar una nueva excusa
router.put('/:id', updateExcusa); // Actualizar una excusa por ID 
router.get('/:id', getExcusaById); // Obtener una excusa por ID
router.delete('/:id', deleteExcusa); // Eliminar una excusa por ID
// Exportar el router para usarlo en el archivo principal
export default router;