#!/bin/sh

# run-staging.sh

docker compose -f docker-compose.staging.yml down -v && \
docker compose -f docker-compose.staging.yml pull && \
docker compose -f docker-compose.staging.yml up --build -d --force-recreate
