docker compose --env-file .env -f docker-compose.dev.yml up --build -d --force-recreate


docker compose --env-file .env -f docker-compose.prod.yml up --build -d --force-recreate