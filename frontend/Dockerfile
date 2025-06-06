FROM node:lts-alpine AS builder

WORKDIR /app
COPY package*.json vite.config.ts tsconfig.json tsconfig.app.json tsconfig.node.json index.html ./
RUN npm install

COPY src ./src
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
