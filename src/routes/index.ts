import { Router } from 'express';

import counterRoutes from './counter';
import helloRoute from './hello';

const router = Router();

router.use('/counter', counterRoutes);
router.use('/hello', helloRoute);

export default router;
