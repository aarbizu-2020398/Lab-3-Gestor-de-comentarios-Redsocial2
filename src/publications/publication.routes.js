import { Router } from 'express';
import {
  createPublication,
  getPublications,
  getPublicationById,
  updatePublication,
  deletePublication
} from './publication.controller.js';

const router = Router();

router.post('/', createPublication);
router.get('/', getPublications);
router.get('/:id', getPublicationById);
router.put('/:id', updatePublication);
router.delete('/:id', deletePublication);

export default router;
