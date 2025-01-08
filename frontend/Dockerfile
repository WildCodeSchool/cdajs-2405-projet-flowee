FROM node:18-bookworm

RUN mkdir /app
WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

CMD npm run dev  