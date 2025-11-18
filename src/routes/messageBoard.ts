import { Router } from 'express';
import { addMessage, clearMessages, getSizeMessages } from '../controllers/messageBoardController';

const router = Router();

router.get('/', getSizeMessages);

router.post('/', addMessage);

router.delete('/', clearMessages);

export default router;
