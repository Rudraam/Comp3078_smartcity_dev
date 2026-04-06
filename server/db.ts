import pg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "@shared/schema";

const databaseUrl = process.env.NODE_ENV === "production"
  ? (process.env.NEON_DATABASE_URL || process.env.DATABASE_URL)
  : process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

export const pool = new pg.Pool({
  connectionString: databaseUrl,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
  ssl: databaseUrl.includes("sslmode=require") ? { rejectUnauthorized: false } : undefined,
});

pool.on('error', (err) => {
  console.error('Database pool error:', err.message);
});

export const db = drizzle(pool, { schema });
