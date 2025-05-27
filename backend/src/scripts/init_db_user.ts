import { exec } from "node:child_process";
import dotenv from "dotenv";
dotenv.config();

const DB_CONTAINER = "flowee-db";

const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

if (!DB_NAME || !DB_USER || !DB_PASSWORD) {
  console.error(
    "❌ Erreur : variables DB_NAME, DB_USER et DB_PASSWORD sont obligatoires.",
  );
  process.exit(1);
}

const startDbCommand = "docker compose -f docker-compose.dev.yml up -d db";
const stopDbCommand = "docker compose -f docker-compose.dev.yml stop db";

const createUserCommand = `docker exec -i ${DB_CONTAINER} psql -U postgres -c "DO \$\$ BEGIN IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = '${DB_USER}') THEN CREATE ROLE ${DB_USER} LOGIN PASSWORD '${DB_PASSWORD}'; END IF; END \$\$;"`;

const createDatabaseCommand = `docker exec -i ${DB_CONTAINER} psql -U postgres -c "DO \$\$ BEGIN IF NOT EXISTS (SELECT FROM pg_database WHERE datname = '${DB_NAME}') THEN CREATE DATABASE ${DB_NAME} OWNER ${DB_USER}; END IF; END \$\$;"`;

const grantPrivilegesCommand = `docker exec -i ${DB_CONTAINER} psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE ${DB_NAME} TO ${DB_USER};"`;
function executeCommand(command: string): Promise<void> {
  return new Promise((resolve, reject) => {
    exec(command, (error, stderr) => {
      if (error) {
        console.error(`❌ Échec : ${command}`);
        console.error(stderr);
        reject(error);
      } else {
        console.log(`✅ ${command}`);
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
          console.log("⏳ PostgreSQL non prêt, nouvelle tentative...");
          setTimeout(check, 2000);
        } else if (retries === 0) {
          reject(
            new Error("PostgreSQL toujours indisponible après 10 essais."),
          );
        } else {
          resolve();
        }
      });
    }
    check();
  });
}
async function init() {
  try {
    await executeCommand(startDbCommand);
    await waitForPostgres();
    await executeCommand(createUserCommand);
    await executeCommand(createDatabaseCommand);
    await executeCommand(grantPrivilegesCommand);
    await executeCommand(stopDbCommand);
    console.log("✅ Base de données initialisée avec succès.");
  } catch (err) {
    console.error("❌ Échec de l'initialisation :", err);
  }
}

init();
