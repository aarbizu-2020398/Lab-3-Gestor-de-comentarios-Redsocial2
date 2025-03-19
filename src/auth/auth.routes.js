
import { Router } from 'express';
import { loginUsuario, registrarUsuario } from './auth.controller.js';
import { loginValidator, registerValidator } from '../middlewares/validator.js';

const router = Router();

router.post('/login', loginValidator, loginUsuario);
router.post('/register', registerValidator, registrarUsuario);

export default router;
