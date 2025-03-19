import { check, body } from 'express-validator';
import { validarCampos } from './validar-campos.js';
import { existeCategoriaById, existePublicacionById } from '../helpers/db-validator.js';

export const loginValidator = [
  check('email', 'El email es obligatorio').isEmail(),
  check('password', 'La contraseña es obligatoria').not().isEmpty(),
  validarCampos
];

export const registerValidator = [
  check('email', 'El email es obligatorio').isEmail(),
  check('password', 'La contraseña es obligatoria').not().isEmpty(),
  validarCampos
];

export const crearPublicacionValidator = [
  body("titulo", "El título es obligatorio").not().isEmpty(),
  body("contenido", "El contenido es obligatorio").not().isEmpty(),
  body("categoria", "Debe ingresar una categoría válida")
    .isMongoId()
    .custom(existeCategoriaById),
  validarCampos
];

export const crearComentarioValidator = [
  body("contenido", "El contenido del comentario es obligatorio").not().isEmpty(),
  body("publicacion", "El ID de la publicación no es válido")
    .isMongoId()
    .custom(existePublicacionById),
  validarCampos
];

export const crearCategoriaValidator = [
  body("nombre", "El nombre de la categoría es obligatorio").not().isEmpty(),
  body("descripcion", "La descripción es obligatoria").not().isEmpty(),
  validarCampos
];
