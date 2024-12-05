FROM node:18-bookworm


RUN mkdir /app
WORKDIR /app

CMD rm -rf node_modules package-lock.json && npm install && npm run dev  