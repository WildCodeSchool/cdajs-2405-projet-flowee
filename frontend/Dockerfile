FROM node:18-bookworm


RUN mkdir /app
WORKDIR /app
COPY . . 
RUN rm -rf node_modules package-lock.json
RUN npm install

CMD npm run dev