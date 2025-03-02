import { Router } from 'express';
const router = Router();

import {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} from '../controllers/postController.js';
import { validatePostInput } from '../middleware/validationMiddleware.js';

router.route('/').get(getAllPosts).post(validatePostInput, createPost);
router.route('/:id').get(getPost).patch(validatePostInput, updatePost).delete(deletePost);

export default router;