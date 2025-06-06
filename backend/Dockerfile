# 1) Build
FROM node:lts-alpine AS builder

WORKDIR /app
COPY tsconfig.json package.json ./
RUN npm install && npm install -g typescript

COPY src ./src
RUN tsc

# 2) Runtime
FROM node:lts-alpine
RUN apk --no-cache add curl
WORKDIR /app

COPY --from=builder /app/build ./build
COPY package.json ./
RUN npm install --production

CMD ["npm", "run", "prod"]