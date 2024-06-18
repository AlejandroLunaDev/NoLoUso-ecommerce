// src/github/routes/githubRoutes.js
import { Router } from 'express';
import { githubAuth, githubCallback, githubRedirect } from '../controllers/githubController.js';

const router = Router();

router.get('/auth/github', githubAuth);
router.get('/api/github/callback', githubCallback, githubRedirect);

export default router;
