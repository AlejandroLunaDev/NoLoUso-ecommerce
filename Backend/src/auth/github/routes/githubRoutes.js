import { Router } from 'express';
import { githubAuth, githubCallback, githubRedirect } from '../controllers/githubController.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: GitHub
 *   description: API endpoints for GitHub authentication
 */

/**
 * @swagger
 * /api/github/auth/github:
 *   get:
 *     summary: Initiate GitHub authentication
 *     tags: [GitHub]
 *     responses:
 *       '200':
 *         description: Redirects to GitHub authentication
 */

router.get('/auth/github', githubAuth);

/**
 * @swagger
 * /api/github/api/github/callback:
 *   get:
 *     summary: Callback endpoint for GitHub authentication
 *     tags: [GitHub]
 *     responses:
 *       '200':
 *         description: Callback success
 */

router.get('/api/github/callback', githubCallback, githubRedirect);

export default router;
