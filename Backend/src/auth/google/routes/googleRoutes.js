// src/routes/googleRoutes.js
import { Router } from 'express';
import { googleAuth, googleCallback, googleRedirect } from '../controllers/googleController.js';

const router = Router();

router.get('/auth/google', googleAuth);
router.get('/auth/google/callback', googleCallback, googleRedirect);

export default router;
