import { Router } from 'express';
import { obtenerCategorias, crearCategoria, editarCategoria, eliminarCategoria } from './categorias.controller.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import { isAdmin } from '../middlewares/validar-roles.js'; 
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar-campos.js';

const router = Router();

router.get('/', validarJWT, obtenerCategorias);

router.post(
  '/',
  validarJWT, isAdmin,
  [
    check('nombre', 'El nombre de la categoría es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripción de la categoría es obligatoria').not().isEmpty(),
    validarCampos
  ],
  crearCategoria
);

router.put(
  '/:id',
  validarJWT, isAdmin,
  [
    check('nombre', 'El nombre de la categoría es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripción de la categoría es obligatoria').not().isEmpty(),
    validarCampos
  ],
  editarCategoria
);

router.delete('/:id', validarJWT, isAdmin, eliminarCategoria);

export default router;
