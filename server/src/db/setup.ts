import fs from 'fs';
import path from 'path';
import { Client } from 'pg';
import { env } from '../config/env';

// Ստեղծում է տվյալների բազան (եթե չկա) և կիրառում schema.sql-ը։
// `npm run db:reset` -> ջնջում է բոլոր աղյուսակները և նորից ստեղծում (միայն տեղական միջավայրի համար)։
async function main() {
  const dbName = new URL(env.DATABASE_URL).pathname.slice(1);
  if (!/^[a-zA-Z0-9_]+$/.test(dbName)) throw new Error('Բազայի անունը պետք է պարունակի միայն լատինատառ, թվեր և _');

  const adminUrl = new URL(env.DATABASE_URL);
  adminUrl.pathname = '/postgres';
  const admin = new Client({ connectionString: adminUrl.toString() });
  await admin.connect();
  const exists = await admin.query('SELECT 1 FROM pg_database WHERE datname = $1', [dbName]);
  if (!exists.rowCount) {
    await admin.query(`CREATE DATABASE "${dbName}"`);
    console.log(`✅ Ստեղծվեց բազան՝ ${dbName}`);
  }
  await admin.end();

  const db = new Client({ connectionString: env.DATABASE_URL });
  await db.connect();
  if (process.argv.includes('--reset')) {
    await db.query('DROP SCHEMA public CASCADE; CREATE SCHEMA public;');
    console.log('♻️  Աղյուսակները ջնջվեցին');
  }
  await db.query(fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8'));
  console.log('✅ Աղյուսակները պատրաստ են');
  await db.end();
}
main().catch((e) => { console.error('❌', e.message); process.exit(1); });
