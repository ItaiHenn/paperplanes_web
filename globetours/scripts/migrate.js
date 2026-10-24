// Runs the init SQL migration against PostgreSQL on startup
const { default: postgres } = require("postgres");
const { readFileSync } = require("fs");
const { join } = require("path");

async function migrate() {
  const sql = postgres(process.env.DATABASE_URL);
  const initSql = readFileSync(join(__dirname, "../drizzle/0000_init.sql"), "utf8");
  const statements = initSql.split(";").map((s) => s.trim()).filter(Boolean);
  for (const stmt of statements) {
    try {
      await sql.unsafe(stmt);
    } catch (e) {
      // Ignore "already exists" errors from IF NOT EXISTS
      if (!String(e).includes("already exists")) console.error("Migration error:", e);
    }
  }
  await sql.end();
  console.log("Migrations complete.");
}

migrate().catch((e) => { console.error(e); process.exit(1); });
