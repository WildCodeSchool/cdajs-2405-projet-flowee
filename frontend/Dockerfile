FROM node:18-bookworm

RUN mkdir /frontend
WORKDIR /frontend

COPY package*.json ./

RUN npm install

COPY . .

CMD npm run dev  