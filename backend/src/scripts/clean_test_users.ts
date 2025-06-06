// backend/src/scripts/clean_test_users.ts
import { exec } from "node:child_process";
import dotenv from "dotenv";
dotenv.config();

const DB_CONTAINER = "flowee-db";

// Exemple à adapter
const TEST_USERS = ["flowee"];
const TEST_DBS = ["flowee2", "flowee"];

function execCommand(command: string): Promise<void> {
  return new Promise((resolve, reject) => {
    exec(command, (error, _stdout, stderr) => {
      if (error) {
        console.error(`failed :${command}\n${stderr}`);
        reject(error);
      } else {
        console.log(`ok: ${command}`);
        resolve();
      }
    });
  });
}

async function clean() {
  try {
    for (const db of TEST_DBS) {
      await execCommand(
        `docker exec -i ${DB_CONTAINER} psql -U postgres -c "DROP DATABASE IF EXISTS \\"${db}\\";"`,
      );
    }

    for (const user of TEST_USERS) {
      await execCommand(
        `docker exec -i ${DB_CONTAINER} psql -U postgres -d postgres -c "REASSIGN OWNED BY \\"${user}\\" TO postgres;"`,
      ).catch(() => {});

      await execCommand(
        `docker exec -i ${DB_CONTAINER} psql -U postgres -d postgres -c "DROP OWNED BY \\"${user}\\";"`,
      ).catch(() => {});

      await execCommand(
        `docker exec -i ${DB_CONTAINER} psql -U postgres -c "DROP ROLE IF EXISTS \\"${user}\\";"`,
      );
    }

    console.log("cleanup completed successfully");
  } catch (err) {
    console.error("Failed to cleanup :", err);
  }
}

clean();
