import { Router } from 'express';

import { authMiddleware } from '../middlewares/auth';

import counterRoutes from './counter';
import helloRoute from './hello';
import messageBoard from './messageBoard';
import filesRoute from './files';

const router = Router();

router.use(authMiddleware);

router.use('/counter', counterRoutes);
router.use('/hello', helloRoute);
router.use('/files', filesRoute);

router.use('/messages', messageBoard);

export default router;
