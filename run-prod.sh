#!/bin/sh

# run-staging.sh

docker compose -f docker-compose.prod.yml down -v && \
docker compose -f docker-compose.prod.yml pull && \
docker compose -f docker-compose.prod.yml up --build -d --force-recreate
