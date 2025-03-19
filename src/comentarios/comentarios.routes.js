import { Router } from 'express';
import { check } from 'express-validator';
import { crearComentario, obtenerComentarios, obtenerComentariosPorPublicacion, editarComentario, eliminarComentario } from './comentarios.controller.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import { validarCampos } from '../middlewares/validar-campos.js';

const router = Router();


router.post(
    '/',
    [
        validarJWT,
        check('contenido', 'El contenido del comentario es obligatorio').not().isEmpty(),
        check('publicacion', 'El ID de la publicación es obligatorio').not().isEmpty().isMongoId(),
        validarCampos
    ],
    crearComentario
);

router.get(
    '/',
    [
        validarJWT, 
        validarCampos 
    ],
    obtenerComentarios 
);



router.get(
    '/publicacion/:id',
    [
        validarJWT, 
        check('id', 'El ID de la publicación es obligatorio').not().isEmpty().isMongoId(), 
        validarCampos 
    ],
    obtenerComentariosPorPublicacion 
);

router.put(
    '/:id',
    [
        validarJWT, 
        check('id', 'El ID del comentario es obligatorio').isMongoId(), 
        check('contenido', 'El contenido es obligatorio').not().isEmpty(), 
        validarCampos 
    ],
    editarComentario 
);


router.delete(
    '/:id',
    [
        validarJWT, 
        check('id', 'El ID del comentario es obligatorio').isMongoId(), 
        validarCampos 
    ],
    eliminarComentario 
);

export default router;
