/**
 * ՕՐԻՆԱԿ-ՆՄՈՒՇ: մնացած ռեսուրսները (news, opportunities, reports, ...) գրել նույն կառուցվածքով։
 * Public router՝ միայն հրապարակվածները։ Admin router՝ CRUD, պաշտպանված JWT-ով։
 */
import { Router } from 'express';
import { z } from 'zod';
import { pool } from '../db/pool';
import { requireAuth, requireRole } from '../middleware/auth';

export const publicPrograms = Router();
export const adminPrograms = Router();

publicPrograms.get('/', async (req, res, next) => {
  try {
    const status = req.query.status;
    const params: unknown[] = [];
    let where = 'WHERE is_published = TRUE';
    if (status === 'ongoing' || status === 'completed') {
      params.push(status);
      where += ` AND status = $${params.length}`;
    }
    const { rows } = await pool.query(
      `SELECT id, title, slug, short_description, status, cover_image_url, start_date, end_date
       FROM programs ${where} ORDER BY start_date DESC NULLS LAST`, params);
    res.json(rows);
  } catch (e) { next(e); }
});

publicPrograms.get('/:slug', async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      'SELECT * FROM programs WHERE slug = $1 AND is_published = TRUE', [req.params.slug]);
    if (!rows[0]) return res.status(404).json({ error: 'Ծրագիրը չի գտնվել' });
    res.json(rows[0]);
  } catch (e) { next(e); }
});

const programSchema = z.object({
  title: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9-]+$/, 'Միայն լատինատառ, թվեր և գծիկ'),
  short_description: z.string().optional(),
  full_content: z.string().optional(),
  status: z.enum(['ongoing', 'completed']).default('ongoing'),
  cover_image_url: z.string().optional(),
  gallery_urls: z.array(z.string()).default([]),
  start_date: z.string().nullable().optional(),
  end_date: z.string().nullable().optional(),
  is_published: z.boolean().default(false),
});

adminPrograms.use(requireAuth, requireRole('admin', 'editor'));

adminPrograms.get('/', async (_req, res, next) => {
  try {
    const { rows } = await pool.query('SELECT * FROM programs ORDER BY id DESC');
    res.json(rows);
  } catch (e) { next(e); }
});

adminPrograms.post('/', async (req, res, next) => {
  try {
    const d = programSchema.parse(req.body);
    const { rows } = await pool.query(
      `INSERT INTO programs (title, slug, short_description, full_content, status, cover_image_url,
        gallery_urls, start_date, end_date, is_published)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`,
      [d.title, d.slug, d.short_description, d.full_content, d.status, d.cover_image_url,
       JSON.stringify(d.gallery_urls), d.start_date, d.end_date, d.is_published]);
    res.status(201).json(rows[0]);
  } catch (e) { next(e); }
});

adminPrograms.put('/:id', async (req, res, next) => {
  try {
    const d = programSchema.parse(req.body);
    const { rows } = await pool.query(
      `UPDATE programs SET title=$1, slug=$2, short_description=$3, full_content=$4, status=$5,
        cover_image_url=$6, gallery_urls=$7, start_date=$8, end_date=$9, is_published=$10
       WHERE id=$11 RETURNING *`,
      [d.title, d.slug, d.short_description, d.full_content, d.status, d.cover_image_url,
       JSON.stringify(d.gallery_urls), d.start_date, d.end_date, d.is_published, req.params.id]);
    if (!rows[0]) return res.status(404).json({ error: 'Չգտնվեց' });
    res.json(rows[0]);
  } catch (e) { next(e); }
});

adminPrograms.delete('/:id', async (req, res, next) => {
  try {
    const r = await pool.query('DELETE FROM programs WHERE id = $1', [req.params.id]);
    if (!r.rowCount) return res.status(404).json({ error: 'Չգտնվեց' });
    res.status(204).end();
  } catch (e) { next(e); }
});
