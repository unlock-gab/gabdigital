import app from "./app";
import { logger } from "./lib/logger";
import { pool } from "@workspace/db";

async function runMigrations(): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS site_data (
      key TEXT PRIMARY KEY,
      value JSONB NOT NULL,
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS contact_messages (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL DEFAULT '',
      email TEXT NOT NULL DEFAULT '',
      phone TEXT NOT NULL DEFAULT '',
      subject TEXT NOT NULL DEFAULT '',
      message TEXT NOT NULL DEFAULT '',
      date TEXT NOT NULL DEFAULT '',
      status TEXT NOT NULL DEFAULT 'Unread',
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS project_requests (
      id SERIAL PRIMARY KEY,
      full_name TEXT NOT NULL DEFAULT '',
      email TEXT NOT NULL DEFAULT '',
      phone TEXT NOT NULL DEFAULT '',
      business_type TEXT NOT NULL DEFAULT '',
      requested_service TEXT NOT NULL DEFAULT '',
      budget TEXT NOT NULL DEFAULT '',
      description TEXT NOT NULL DEFAULT '',
      website_link TEXT NOT NULL DEFAULT '',
      preferred_start_date TEXT NOT NULL DEFAULT '',
      date TEXT NOT NULL DEFAULT '',
      status TEXT NOT NULL DEFAULT 'New',
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);
  logger.info("Database migrations applied successfully");
}

const rawPort = process.env["PORT"];

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

function startServer() {
  app.listen(port, (err) => {
    if (err) {
      logger.error({ err }, "Error listening on port");
      process.exit(1);
    }
    logger.info({ port }, "Server listening");
  });
}

if (process.env.DATABASE_URL) {
  runMigrations()
    .then(startServer)
    .catch((err) => {
      logger.error({ err }, "Failed to run migrations");
      process.exit(1);
    });
} else {
  logger.warn("DATABASE_URL not set — skipping migrations, DB features disabled");
  startServer();
}
