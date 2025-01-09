

FROM node:18-bookworm

RUN mkdir /app
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

CMD npm run build


