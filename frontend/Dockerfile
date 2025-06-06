# 1) Build
FROM node:lts-alpine AS builder

WORKDIR /app
COPY package*.json vite.config.ts tsconfig.json ./
RUN npm install

COPY src ./src
RUN npm run build

# 2) Serveur statique
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
