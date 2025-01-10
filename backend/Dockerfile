
FROM node:18-bookworm

RUN mkdir /app
WORKDIR /app

COPY package*.json ./
RUN npm i

COPY . .

RUN npm run build

CMD npm run start