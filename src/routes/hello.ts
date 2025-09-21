import { Router } from 'express';
import { getHello, postHello } from '../controllers/helloController';

const helloRoute = Router();

helloRoute.get('/', getHello);

helloRoute.post('/', postHello);

export default helloRoute;
