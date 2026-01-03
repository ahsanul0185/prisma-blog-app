import express from 'express';
import { PostController } from './post.controller';

const router = express.Router();

router.post('/create', PostController.createPost)
router.get('/', PostController.getAllPosts)

export const postRouter = router; 