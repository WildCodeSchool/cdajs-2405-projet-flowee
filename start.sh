docker compose  -f docker-compose.dev.yml up --build -d --force-recreate


docker compose  -f docker-compose.prod.yml up --build -d --force-recreate

docker compose  -f docker-compose.staging.yml up --build -d --force-recreate

docker compose -f docker-compose.prod.yml down -v && \ docker compose -f docker-compose.prod.yml pull && \

docker compose -f docker-compose.staging.yml down && \ docker compose -f docker-compose.staging.yml pull && \


