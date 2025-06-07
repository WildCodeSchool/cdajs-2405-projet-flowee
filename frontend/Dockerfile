# Étape 1 : build du front avec Node
FROM node:lts-alpine AS builder

WORKDIR /app

# Optimisation du cache : on copie package.json & lock d'abord pour npm ci/install
COPY package.json ./
COPY package-lock.json ./
COPY vite.config.ts ./
COPY tsconfig.json ./
COPY tsconfig.app.json ./
COPY tsconfig.node.json ./
COPY codegen.ts ./
COPY index.html ./

RUN npm install

# On copie tout le reste (src, public, etc.)
COPY . .

# Variable d'environnement (staging/prod passée par le docker-compose ou docker build)
ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV

RUN npm run build

# Étape 2 : image nginx minimale pour servir le build
FROM nginx:1.21.0-alpine


# Copie le build dans nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Ajoute ta conf nginx custom si besoin (sinon retire cette ligne)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Démarre nginx
CMD ["nginx", "-g", "daemon off;"]
