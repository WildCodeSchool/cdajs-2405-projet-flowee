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

# On récupère la variable pour GraphQL au build
ARG VITE_GRAPHQL_URI=/graphql
ENV VITE_GRAPHQL_URI=$VITE_GRAPHQL_URI

# On crée le .env à la volée pour Vite
RUN echo "VITE_GRAPHQL_URI=$VITE_GRAPHQL_URI" > .env


RUN npm run build

# Étape 2 : image nginx minimale pour servir le build
FROM nginx:1.21.0-alpine


# Copie le build dans nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Ajoute ta conf nginx custom si besoin (sinon retire cette ligne)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# (Optionnel) Passe NODE_ENV au runtime pour logs ou debug
ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV

# Démarre nginx
CMD ["nginx", "-g", "daemon off;"]
