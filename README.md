# «Սեբաստացիներ» հիմնադրամի վեբկայք և CMS

Tech stack՝ React + TypeScript (Vite), Node.js + Express + TypeScript, PostgreSQL։

## Պահանջվող գործիքներ
- Node.js 20+ — [nodejs.org](https://nodejs.org)
- Git
- **PostgreSQL 16** (տեղական տեղադրում) — [postgresql.org/download](https://www.postgresql.org/download/)
  - Windows/macOS՝ ներբեռնել installer-ը։ Տեղադրելիս նշեք `postgres` օգտատիրոջ գաղտնաբառ և **հիշեք այն**։ Port՝ `5432` (լռելյայն)։
  - Ubuntu/Debian՝ `sudo apt install postgresql` , ապա `sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'ձեր_գաղտնաբառը';"`
  - macOS (Homebrew)՝ `brew install postgresql@16 && brew services start postgresql@16`
- VS Code (խորհուրդ ենք տալիս) + ESLint, Prettier plugin-ներ

## Արագ մեկնարկ

```bash
# 1. Կլոնավորել
git clone <REPO_URL> && cd sebastatsiner

# 2. Տեղադրել կախվածությունները
npm run install:all

# 3. Պատճենել env ֆայլերը
cp server/.env.example server/.env
cp client/.env.example client/.env
```

4. Բացեք `server/.env`-ը և `DATABASE_URL`-ում `YOUR_PASSWORD`-ի տեղը գրեք ձեր PostgreSQL գաղտնաբառը։
   Լրացրեք նաև `JWT_SECRET` (առնվազն 32 պատահական նիշ) և `ADMIN_EMAIL` / `ADMIN_PASSWORD`։

```bash
# 5. Ստեղծել բազան և աղյուսակները
npm run db:setup

# 6. Ստեղծել առաջին ադմինին
npm run seed:admin

# 7. Գործարկել (2 առանձին տերմինալում)
npm run dev:server     # http://localhost:4000/api/health
npm run dev:client     # http://localhost:5173
```

Եթե `schema.sql`-ը փոխվել է (օր.՝ git pull-ից հետո)՝ `npm run db:reset` (ջնջում է տեղական տվյալները) և ապա նորից `npm run seed:admin`։

## Հաճախ հանդիպող խնդիրներ
| Սխալ | Լուծում |
|---|---|
| `password authentication failed` | `.env`-ի `DATABASE_URL`-ում գաղտնաբառը սխալ է |
| `ECONNREFUSED 127.0.0.1:5432` | PostgreSQL ծառայությունը չի աշխատում (սկսել Services / `brew services start`) |
| `JWT_SECRET-ը պետք է լինի առնվազն 32 նիշ` | Երկարացրեք `JWT_SECRET`-ը |

## Նախագծի կառուցվածք
```
client/   React ֆրոնտենդ (հանրային կայք + ադմին վահանակ)
server/   Express API
  src/config       env փոփոխականներ (zod վավերացում)
  src/db           pool, schema.sql, setup.ts, seedAdmin.ts
  src/middleware   auth, error handler, rate limit
  src/routes       API երթուղիներ (programs.ts՝ օրինակ-նմուշ)
docs/     Git հոսք, առաջադրանքներ
```

## Կանոններ
- Git հոսք՝ [docs/GIT_WORKFLOW.md](docs/GIT_WORKFLOW.md), առաջադրանքներ՝ [docs/TASKS.md](docs/TASKS.md)
- `.env`-ը երբեք չի push արվում։
- Տեքստերը գրվում են `client/src/i18n/locales/hy.json`-ում (i18n պատրաստվածություն)։
- Նոր API endpoint ավելացնելիս նայեք `server/src/routes/programs.ts`-ը։
- SQL-ում միայն parameterized հարցումներ (`$1, $2`)։
- Սխեմայի փոփոխությունը՝ միայն `schema.sql`-ի միջոցով, PR-ով, և թիմին տեղեկացնել `db:reset`-ի մասին։
