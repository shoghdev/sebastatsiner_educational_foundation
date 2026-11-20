import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

export function notFound(_req: Request, res: Response) {
  res.status(404).json({ error: 'Չգտնվեց' });
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof ZodError) {
    return res.status(400).json({ error: 'Վավերացման սխալ', details: err.flatten().fieldErrors });
  }
  console.error(err);
  res.status(500).json({ error: 'Սերվերի ներքին սխալ' });
}
