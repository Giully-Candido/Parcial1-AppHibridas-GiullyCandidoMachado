import express from 'express';
import { register, login } from '../controllers/usuariosController.js';

const router = express.Router();

router.post('/registro', register); // Registro de usuario
router.post('/login', login);       // Login de usuario

export default router;