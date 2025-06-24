import dotenv from "dotenv";
import { Client } from "pg";
dotenv.config();

const {
  DB_HOST,
  DB_PORT,
  DB_SUPERUSER,
  DB_PASSWORD,
  DB_USER,
  DB_NAME,
  DB_SUPERUSER_PASSWORD,
} = process.env;

if (
  !DB_SUPERUSER ||
  !DB_PASSWORD ||
  !DB_USER ||
  !DB_NAME ||
  !DB_SUPERUSER_PASSWORD
) {
  console.error("Missing DB env variables.");
  process.exit(1);
}

const client = new Client({
  host: DB_HOST,
  port: Number.parseInt(DB_PORT ?? "5432", 10),
  user: DB_SUPERUSER,
  password: DB_SUPERUSER_PASSWORD,
});

async function init_db_user() {
  try {
    await client.connect();

    // User creation if not existing
    await client.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT FROM pg_catalog.pg_roles WHERE rolname = '${DB_USER}'
        ) THEN
          CREATE ROLE "${DB_USER}" LOGIN PASSWORD '${DB_PASSWORD}';
        END IF;
      END
      $$;
    `);
    console.log(`User "${DB_USER}" checked/created.`);

    // Creat databse if not existing
    await client.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT FROM pg_database WHERE datname = '${DB_NAME}'
        ) THEN
          CREATE DATABASE "${DB_NAME}" OWNER "${DB_USER}";
        END IF;
      END
      $$;
    `);
    console.log(`Database "${DB_NAME}" checked/created.`);

    // 3. Droits sur la BDD
    await client.query(
      `GRANT ALL PRIVILEGES ON DATABASE "${DB_NAME}" TO "${DB_USER}";`,
    );
    console.log("✅ Privileges granted on database.");
    // Access to schema public

    const dbClient = new Client({
      host: DB_HOST,
      port: Number.parseInt(DB_PORT ?? "5432", 10),
      user: DB_SUPERUSER,
      password: DB_SUPERUSER_PASSWORD,
      database: DB_NAME,
    });

    await dbClient.connect();

    await dbClient.query(`GRANT ALL ON SCHEMA public TO "${DB_USER}";`);
    await dbClient.query(`ALTER SCHEMA public OWNER TO "${DB_USER}";`);
    console.log("✅ Privileges granted on schema public.");

    await dbClient.end();
  } catch (err) {
    console.error("❌ Error during DB init:", err);
    process.exit(1);
  } finally {
    await client.end();
    console.log("Database init finished!");
  }
}

init_db_user();
