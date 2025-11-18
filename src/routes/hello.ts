import { Router } from 'express';
import { getHello, postHello, postUser } from '../controllers/helloController';

const router = Router();

router.get('/', getHello);
router.post('/', postHello);
router.post('/user', postUser);
export default router;
