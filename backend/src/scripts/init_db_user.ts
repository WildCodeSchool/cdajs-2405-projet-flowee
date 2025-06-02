import { exec } from "node:child_process";
import dotenv from "dotenv";
dotenv.config();

const DB_CONTAINER = "flowee-db";

const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_SUPERUSER = process.env.DB_SUPERUSER;

if (!DB_NAME || !DB_USER || !DB_PASSWORD || !DB_SUPERUSER) {
  console.error(
    "❌ Erreur : variables DB_NAME, DB_USER, DB_PASSWORD et DB_SUPERUSER sont obligatoires.",
  );
  process.exit(1);
}

// Pas besoin de lancer les containers ici ils sont deja lancés avec le script run.sh ou le makefile
// const startDbCommand = "docker compose -f docker-compose.dev.yml up -d db";
// const stopDbCommand = "docker compose -f docker-compose.dev.yml stop db";

const createUserCommand = `docker exec -i ${DB_CONTAINER} psql -U ${DB_SUPERUSER} -c "CREATE USER \\"${DB_USER}\\" WITH PASSWORD '${DB_PASSWORD}';"`;
const createDatabaseCommand = `docker exec -i ${DB_CONTAINER} psql -U ${DB_SUPERUSER} -c "CREATE DATABASE \\"${DB_NAME}\\" OWNER \\"${DB_USER}\\";"`;
const grantPrivilegesCommand = `docker exec -i ${DB_CONTAINER} psql -U ${DB_SUPERUSER} -c "GRANT ALL PRIVILEGES ON DATABASE \\"${DB_NAME}\\" TO \\"${DB_USER}\\";"`;
const changeSchemaOwnerCommand = `docker exec -i ${DB_CONTAINER} psql -U ${DB_SUPERUSER} -d ${DB_NAME} -c "ALTER SCHEMA public OWNER TO \\"${DB_USER}\\";"`;

const grantAllOnExistingObjects = `docker exec -i ${DB_CONTAINER} psql -U ${DB_SUPERUSER} -d ${DB_NAME} -c "GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO \\"${DB_USER}\\";"`;
const grantSchemaUsage = `docker exec -i ${DB_CONTAINER} psql -U ${DB_SUPERUSER} -d ${DB_NAME} -c "GRANT USAGE ON SCHEMA public TO \\"${DB_USER}\\";"`;
const grantAllTables = `docker exec -i ${DB_CONTAINER} psql -U ${DB_SUPERUSER} -d ${DB_NAME} -c "GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO \\"${DB_USER}\\";"`;
const grantAllSequences = `docker exec -i ${DB_CONTAINER} psql -U ${DB_SUPERUSER} -d ${DB_NAME} -c "GRANT USAGE, SELECT, UPDATE ON ALL SEQUENCES IN SCHEMA public TO \\"${DB_USER}\\";"`;
const setDefaultPrivilegesTables = `docker exec -i ${DB_CONTAINER} psql -U ${DB_SUPERUSER} -d ${DB_NAME} -c "ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO \\"${DB_USER}\\";"`;
const setDefaultPrivilegesSequences = `docker exec -i ${DB_CONTAINER} psql -U ${DB_SUPERUSER} -d ${DB_NAME} -c "ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT USAGE, SELECT, UPDATE ON SEQUENCES TO \\"${DB_USER}\\";"`;
// Donne tous les droits sur les objets déjà existants du schéma public

function executeCommand(command: string): Promise<void> {
  return new Promise((resolve, reject) => {
    exec(command, (error, _stdout, stderr) => {
      if (error) {
        if (stderr.includes("already exists")) {
          console.warn(`ignored : ${stderr.trim()}`);
          resolve();
        } else {
          console.error(`Failed : ${command}`);
          console.error(stderr);
          reject(error);
        }
      } else {
        console.log(`OK: ${command}`);
        resolve();
      }
    });
  });
}

function waitForPostgres(): Promise<void> {
  const checkCommand = `docker exec ${DB_CONTAINER} pg_isready`;
  let retries = 10;

  return new Promise((resolve, reject) => {
    function check() {
      exec(checkCommand, (error) => {
        if (error && retries > 0) {
          retries--;
          console.log("PostgreSQL not ready , new try...");
          setTimeout(check, 2000);
        } else if (retries === 0) {
          reject(
            new Error("PostgreSQL failed to start after multiple attempts."),
          );
        } else {
          resolve();
        }
      });
    }
    check();
  });
}

// function isDbRunning(): Promise<boolean> {
//   return new Promise((resolve) => {
//     exec(
//       `docker ps --filter "name=${DB_CONTAINER}" --filter "status=running" -q`,
//       (error, stdout) => {
//         resolve(!!stdout.trim());
//         console.error(error);
//       },
//     );
//   });
// }

async function init() {
  try {
    // const dbAlreadyRunning = await isDbRunning();

    // await executeCommand(startDbCommand);
    await waitForPostgres();

    await executeCommand(createUserCommand);
    await executeCommand(createDatabaseCommand);
    await executeCommand(grantPrivilegesCommand);
    await executeCommand(changeSchemaOwnerCommand);

    await executeCommand(grantSchemaUsage);
    await executeCommand(grantAllOnExistingObjects);
    await executeCommand(grantAllTables);
    await executeCommand(grantAllSequences);
    await executeCommand(setDefaultPrivilegesTables);
    await executeCommand(setDefaultPrivilegesSequences);
    // if (!dbAlreadyRunning) {
    //   await executeCommand(stopDbCommand);
    // }

    console.log("Database successfully initialized!");
  } catch (err) {
    console.error("Failed to initialize teh database", err);
  }
}

init();
