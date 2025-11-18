import { Router } from 'express';
import { addMessage, clearMessages, getSizeMessages } from '../controllers/messageBoardController';

const router = Router();

// ---- Routes ---- //
router.get('/', getSizeMessages);

router.post('/', addMessage);

router.delete('/', clearMessages);

// ---- Swagger metadata ---- //
export const swaggerRoutes = [
  {
    path: '/messages',
    method: 'get',
    summary: 'Get messages',
    description: 'מחזיר את כל ההודעות במערכת',
    security: [{ bearerAuth: [] }],
    responses: { 200: { description: 'Success' }, 401: { description: 'Unauthorized' } },
  },
  {
    path: '/messages',
    method: 'post',
    summary: 'Add message',
    description: 'מוסיף הודעה חדשה',
    security: [{ bearerAuth: [] }],
    requestBody: { content: { 'application/json': { example: { text: 'הודעה חדשה' } } } },
    responses: { 201: { description: 'Success' }, 401: { description: 'Unauthorized' } },
  },
  {
    path: '/messages',
    method: 'delete',
    summary: 'Clear messages',
    description: 'מנקה את כל ההודעות',
    security: [{ bearerAuth: [] }],
    responses: { 200: { description: 'Success' }, 401: { description: 'Unauthorized' } },
  },
];

export default router;
