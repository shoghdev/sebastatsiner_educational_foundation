import { Pool } from 'pg';
import { env } from '../config/env';

export const pool = new Pool({ connectionString: env.DATABASE_URL });
// Միշտ օգտագործել parameterized հարցումներ՝ pool.query('... WHERE id = $1', [id])
// Երբեք string concatenation (SQL Injection-ից պաշտպանվելու համար)։
