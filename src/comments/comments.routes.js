import { Router } from 'express';
import { createComment, getCommentsByPublication } from './comments.controller.js';

const router = Router({ mergeParams: true });

router.post('/', createComment);
router.get('/', getCommentsByPublication);

export default router;
