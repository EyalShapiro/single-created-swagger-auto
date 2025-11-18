import { Router } from 'express';
import { getHello, postHello } from '../controllers/helloController';
import { authMiddleware } from '../middlewares/auth';

const router = Router();

// ---- Routes ---- //
router.get('/', authMiddleware, getHello);
router.post('/', authMiddleware, postHello);
router.post('/test', (req, res) => {
  /*  #swagger.parameters['body'] = {
            in: 'body', 
            description: 'Add a test',
            schema: { $ref: '#/definitions/someDefinition' }
    } */
  res.json({ message: 'This is /hello/path endpoint' });
});

// ---- Swagger metadata ---- //

export default router;
