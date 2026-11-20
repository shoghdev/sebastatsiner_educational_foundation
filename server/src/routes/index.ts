import { Router } from 'express';
import authRouter from './auth';
import { adminPrograms, publicPrograms } from './programs';

const api = Router();

api.get('/health', (_req, res) => res.json({ status: 'ok', time: new Date().toISOString() }));

api.use('/auth', authRouter);

// Public
api.use('/programs', publicPrograms);
// TODO (junior tasks): /news, /opportunities, /reports, /partners, /team, /stats, POST /contact

// Admin (Admin/Editor)
api.use('/admin/programs', adminPrograms);
// TODO: /admin/news, /admin/opportunities, ... , /admin/upload, /admin/users (միայն admin)

export default api;
