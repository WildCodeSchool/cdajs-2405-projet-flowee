#!/bin/sh

# fetch-and-deploy.sh

docker compose -f docker-compose.staging.yml down -v  && \

    docker compose -f docker-compose.staging.yml pull && \

    GATEWAY_PORT=8004 docker compose -f docker-compose.staging.yml up -d;