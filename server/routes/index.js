import express from 'express';
import PublicRouter from './public';
import PrivateRouter from './private';

const router = express.Router();
router.use('/public', PublicRouter);    // '/api/public'
router.use('/private', PrivateRouter);  // '/api/private'

export default router;