import { Router } from 'express';
import { getHello, postHello, postUser } from '../controllers/helloController';
import { createSwaggerRoute } from '../swagger/createSwaggerRouteData';

const router = Router();

createSwaggerRoute({
  method: 'get',
  path: '/hello',
  description: { text: 'Returns a hello message' },
});

createSwaggerRoute({
  method: 'post',
  path: '/hello',
  description: { text: 'Handles a hello post request' },
});

createSwaggerRoute({
  method: 'post',
  path: '/hello/user',
  description: { text: 'Creates a new user' },
  body: { default: { ame: 'Default User', age: 30 } },
});

router.get('/', getHello);
router.post('/', postHello);
router.post('/user', postUser);
export default router;
