import bcrypt from 'bcryptjs';
import { env } from '../config/env';
import { pool } from './pool';

async function main() {
  const { ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME } = env;
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) throw new Error('Լրացրեք ADMIN_EMAIL և ADMIN_PASSWORD .env-ում');
  const hash = await bcrypt.hash(ADMIN_PASSWORD, 12);
  await pool.query(
    `INSERT INTO users (full_name, email, password_hash, role)
     VALUES ($1, $2, $3, 'admin')
     ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash`,
    [ADMIN_NAME ?? 'Admin', ADMIN_EMAIL, hash],
  );
  console.log(`✅ Ադմինը պատրաստ է՝ ${ADMIN_EMAIL}`);
  await pool.end();
}
main().catch((e) => { console.error(e); process.exit(1); });
